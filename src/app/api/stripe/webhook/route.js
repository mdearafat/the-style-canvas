import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("Stripe-Signature");

    if (!signature) {
      console.error("No Stripe signature found in headers");
      return new Response("No Stripe signature found", { status: 400 });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const eventType = event.type;
    console.log(`\n🔔 Processing webhook event: ${eventType}`);
    console.log("Event data:", JSON.stringify(event.data.object, null, 2));

    // Helper function to update profile with better error handling
    const updateProfile = async (userId, data) => {
      try {
        console.log(
          `Attempting to update profile for user ${userId} with data:`,
          data
        );

        // Update the profile
        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update({
            ...data,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (updateError) {
          console.error("❌ Error updating profile:", updateError);
          throw updateError;
        }

        // Verify the update
        const { data: updatedProfile, error: fetchError } = await supabaseAdmin
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (fetchError) {
          console.error("❌ Error fetching updated profile:", fetchError);
          throw fetchError;
        }

        console.log(
          "✅ Profile updated successfully. New state:",
          updatedProfile
        );
        return updatedProfile;
      } catch (error) {
        console.error("Failed to update profile:", error);
        throw error;
      }
    };

    switch (eventType) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Processing checkout session:", {
          id: session.id,
          customer: session.customer,
          userId: session.metadata.supabase_user_id,
        });

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription
        );
        console.log("Subscription status:", subscription.status);

        if (subscription.status === "active") {
          try {
            // Update both fields at once
            await updateProfile(session.metadata.supabase_user_id, {
              is_pro: true,
              stripe_customer_id: session.customer,
            });
          } catch (error) {
            console.error("Failed to update profile:", error);
            throw error;
          }
        } else {
          console.log(
            "⚠️ Subscription not active after checkout:",
            subscription.status
          );
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log(`Processing subscription ${eventType}:`, {
          id: subscription.id,
          customer: subscription.customer,
          status: subscription.status,
        });

        if (subscription.status === "active") {
          // Find user by stripe_customer_id
          const { data: profile, error: fetchError } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .eq("stripe_customer_id", subscription.customer)
            .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            console.error("❌ Error fetching profile:", fetchError);
            throw fetchError;
          }

          if (profile) {
            console.log("Found profile for subscription update:", profile);
            await updateProfile(profile.id, {
              is_pro: true,
            });
          } else {
            console.log(
              "⚠️ No profile found for customer:",
              subscription.customer
            );
          }
        }
        break;
      }

      // Log other events but don't process them
      case "customer.created":
        console.log("👤 New customer created:", event.data.object.id);
        break;

      case "customer.updated":
        console.log("👤 Customer updated:", event.data.object.id);
        break;

      case "payment_intent.succeeded":
        console.log("💰 Payment succeeded:", event.data.object.id);
        break;

      case "payment_intent.created":
        console.log("💰 Payment created:", event.data.object.id);
        break;

      case "charge.succeeded":
        console.log("💳 Charge succeeded:", event.data.object.id);
        break;

      case "invoice.created":
      case "invoice.finalized":
      case "invoice.updated":
      case "invoice.paid":
      case "invoice.payment_succeeded":
        console.log("📄 Invoice event:", event.data.object.id);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${eventType}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
    });
  } catch (err) {
    console.error("❌ Error processing webhook:", err);
    return new Response(
      JSON.stringify({
        error: "Error processing webhook",
        details: err.message,
      }),
      { status: 500 }
    );
  }
}
