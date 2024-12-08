"use client";

import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function PricingCards() {
  const { user, isProUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleUpgrade = async () => {
    if (!user) {
      // Show notification for anonymous users
      setNotification("Please log in or create an account to upgrade to Pro");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setNotification("Something went wrong. Please try again later.");
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {notification && (
          <div className="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out">
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md animate-slide-in">
              <p className="text-gray-700">{notification}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4">Free</h3>
            <p className="text-gray-600 mb-6">
              Perfect for getting started with basic features
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
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
                Single color palette
              </li>
              <li className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
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
                Basic typography settings
              </li>
            </ul>
            <button
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => router.push("/workspace")}
            >
              Get Started
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-primary-600 p-8 rounded-2xl shadow-sm text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-primary-500 rounded-full opacity-50" />
            <h3 className="text-2xl font-semibold mb-4">Pro</h3>
            <p className="text-primary-100 mb-6">
              For designers who need advanced features
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$9</span>
              <span className="text-primary-100">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-primary-100">
                <svg
                  className="w-5 h-5 mr-2 text-primary-300"
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
                Multiple color palettes
              </li>
              <li className="flex items-center text-primary-100">
                <svg
                  className="w-5 h-5 mr-2 text-primary-300"
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
                Advanced typography control
              </li>
              <li className="flex items-center text-primary-100">
                <svg
                  className="w-5 h-5 mr-2 text-primary-300"
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
                Save unlimited styles
              </li>
              <li className="flex items-center text-primary-100">
                <svg
                  className="w-5 h-5 mr-2 text-primary-300"
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
                Figma plugin integration
              </li>
            </ul>
            <button
              onClick={handleUpgrade}
              disabled={loading || isProUser}
              className={`w-full py-3 px-4 rounded-lg bg-white text-primary-600 hover:bg-primary-50 transition-colors ${
                loading || isProUser ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Processing..."
                : isProUser
                ? "Current Plan"
                : "Upgrade to Pro"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
