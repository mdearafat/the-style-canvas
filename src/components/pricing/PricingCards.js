"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAuth } from "@/src/context/AuthContext";

const SimpleNotification = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md animate-slide-in">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-gray-700">
          Please log in or create an account to upgrade to Pro
        </p>
        <button
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function PricingCards() {
  const { user, isProUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log("Auth event:", event);
          console.log("Session state:", session ? "Active" : "None");
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    checkAuth();
  }, [supabase.auth]);

  const handleUpgrade = async () => {
    if (!user) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const {
        data: { session },
        error: refreshError,
      } = await supabase.auth.refreshSession();
      console.log("Refreshed session:", session);

      if (refreshError) {
        console.error("Session refresh error:", refreshError);
        throw new Error("Failed to refresh session");
      }

      if (!session) {
        console.error("No session after refresh");
        throw new Error("Authentication required");
      }

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error during upgrade:", error);
      setError(error.message);

      if (
        error.message.includes("authentication") ||
        error.message.includes("session")
      ) {
        router.push("/login?redirect=/pricing");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {error && (
          <div className="mb-8 text-center">
            <div className="bg-red-50 text-red-600 p-3 rounded-md inline-block">
              {error}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that best fits your needs. All plans include access
            to our core features.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2">
          {/* Free Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10">
            <div className="flex items-center justify-between gap-x-4">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                Free
              </h3>
              <p className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold leading-5 text-gray-600">
                Basic
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Perfect for getting started with color management
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                $0
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                /month
              </span>
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary-600" />
                Basic color palette creation
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary-600" />
                Single color management
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary-600" />
                Basic examples
              </li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10 bg-gray-50 ring-2 ring-primary-600">
            <div className="flex items-center justify-between gap-x-4">
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                Pro
              </h3>
              <p className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-600">
                Popular
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Advanced features for professional designers
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                $9
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-600">
                /month
              </span>
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary-600" />
                Everything in Free
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary-600" />
                Secondary color management
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary-600" />
                Advanced examples & components
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary-600" />
                Premium support
              </li>
            </ul>
            <button
              onClick={handleUpgrade}
              disabled={loading || isProUser}
              className={`mt-8 w-full rounded-md px-3.5 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600
                ${
                  isProUser
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-primary-600 text-white shadow-sm hover:bg-primary-500"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : isProUser ? (
                "Current Plan"
              ) : (
                "Upgrade to Pro"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notification for anonymous users */}
      <SimpleNotification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}
