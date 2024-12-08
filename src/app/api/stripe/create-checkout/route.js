import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const headersList = headers();
    const { user } = await req.json();
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Create or retrieve Stripe customer
    let customer;
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (profile?.stripe_customer_id) {
      customer = await stripe.customers.retrieve(profile.stripe_customer_id);
    } else {
      customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });

      // Save Stripe customer ID to profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          stripe_customer_id: customer.id,
        })
        .eq("id", user.id);

      if (updateError) {
        console.error(
          "Error updating profile with stripe_customer_id:",
          updateError
        );
      }
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/workspace?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        supabase_user_id: user.id,
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
