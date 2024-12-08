import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { sessionId, userId } = await req.json();
    console.log("Verifying session:", { sessionId, userId });

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"], // Expand subscription data
    });
    console.log("Retrieved session:", {
      id: session.id,
      customer: session.customer,
      paymentStatus: session.payment_status,
      subscriptionStatus: session.subscription?.status,
    });

    // Verify that this session is for this user
    if (session.metadata.supabase_user_id !== userId) {
      console.error("Session user ID mismatch:", {
        sessionUserId: session.metadata.supabase_user_id,
        requestUserId: userId,
      });
      return new Response(
        JSON.stringify({ success: false, error: "Invalid session" }),
        { status: 400 }
      );
    }

    // If payment was successful, update the user's profile
    if (
      session.payment_status === "paid" &&
      session.subscription?.status === "active"
    ) {
      console.log("Payment successful, updating profile...");

      try {
        // Update profile with new data
        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update({
            is_pro: true,
            stripe_customer_id: session.customer,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (updateError) {
          console.error("Error updating profile:", updateError);
          throw updateError;
        }

        // Fetch the updated profile
        const { data: updatedProfile, error: fetchError } = await supabaseAdmin
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (fetchError) {
          console.error("Error fetching updated profile:", fetchError);
          throw fetchError;
        }

        console.log("Profile updated successfully:", updatedProfile);

        return new Response(
          JSON.stringify({
            success: true,
            message: "Subscription status updated successfully",
            profile: updatedProfile,
            subscription: session.subscription,
          }),
          { status: 200 }
        );
      } catch (error) {
        console.error("Failed to update profile:", error);
        return new Response(
          JSON.stringify({
            success: false,
            error: "Failed to update subscription status",
            details: error.message,
          }),
          { status: 500 }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: "Payment or subscription not active",
        status: session.payment_status,
        subscription_status: session.subscription?.status,
      }),
      { status: 400 }
    );
  } catch (error) {
    console.error("Error verifying session:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
