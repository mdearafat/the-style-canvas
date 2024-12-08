"use client";

import PricingCards from "@/src/components/pricing/PricingCards";

export default function PricingPage() {
  return (
    <div className="min-h-[80vh] py-20">
      <div className="container max-w-screen-xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your design needs. Upgrade anytime to
            unlock premium features and take your designs to the next level.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-3/4 bg-gradient-to-b from-primary-50 to-transparent rounded-3xl"></div>
          </div>

          {/* Cards */}
          <div className="relative">
            <PricingCards />
          </div>
        </div>

        {/* FAQ or Additional Info Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us at support@stylecanvas.com for any questions about our
            pricing plans.
          </p>
        </div>
      </div>
    </div>
  );
}
