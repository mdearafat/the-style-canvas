"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProFeatureModal from "../common/ProFeatureModal";

export default function PricingCards() {
  const { user, isProUser } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const features = {
    free: [
      "Create unlimited color palettes",
      "Basic typography settings",
      "Live preview system",
      "Export in basic formats",
    ],
    pro: [
      "Everything in Free, plus:",
      "Save unlimited palettes",
      "Advanced typography controls",
      "Figma plugin integration",
      "Custom color variations",
      "Priority support",
      "Early access to new features",
    ],
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Free Plan */}
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Free</h3>
          <div className="flex items-baseline mb-8">
            <span className="text-5xl font-bold">$0</span>
            <span className="text-gray-500 ml-2">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            {features.free.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 text-primary-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push("/auth/signup")}
            className="w-full py-3 px-6 text-center text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Pro Plan */}
      <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-white mb-4">Pro</h3>
          <div className="flex items-baseline mb-8">
            <span className="text-5xl font-bold text-white">$5</span>
            <span className="text-primary-100 ml-2">/month</span>
          </div>
          <ul className="space-y-4 mb-8">
            {features.pro.map((feature, index) => (
              <li key={index} className="flex items-center text-primary-50">
                <svg
                  className="w-5 h-5 text-primary-300 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpgrade}
            disabled={isProUser}
            className={`w-full py-3 px-6 text-center font-medium rounded-lg transition-colors duration-200 
              ${
                isProUser
                  ? "bg-primary-200 text-primary-700 cursor-not-allowed"
                  : "bg-white text-primary-600 hover:bg-primary-50"
              }`}
          >
            {isProUser ? "Current Plan" : "Upgrade to Pro"}
          </button>
        </div>
      </div>

      <ProFeatureModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        featureName="Pro Plan"
      />
    </div>
  );
}
