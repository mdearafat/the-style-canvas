"use client";

import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function MobileMenu({ isOpen, onClose }) {
  const { user, isProUser } = useAuth();
  const router = useRouter();

  const navigationLinks = [
    { href: "/workspace", label: "Workspace" },
    { href: "#", label: "Figma Plugin" },
    { href: "/pricing", label: "Pricing" },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
      router.refresh();
      onClose();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />

      {/* Menu panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[280px] bg-white">
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-4 pb-6 space-y-4 overflow-y-auto">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-base text-gray-600 hover:text-gray-900"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-200">
              {user ? (
                <>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                        <span className="text-white text-sm">
                          {user.email?.[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="ml-3 text-sm text-gray-700">
                        {user.email}
                      </span>
                    </div>
                    {isProUser && (
                      <span className="inline-block px-2 py-1 text-xs text-primary-600 bg-primary-50 rounded-full">
                        Pro User
                      </span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/profile"
                      className="block py-2 text-base text-gray-600 hover:text-gray-900"
                      onClick={onClose}
                    >
                      Profile Settings
                    </Link>
                    {isProUser && (
                      <Link
                        href="/profile/saved"
                        className="block py-2 text-base text-gray-600 hover:text-gray-900"
                        onClick={onClose}
                      >
                        Your Savings
                      </Link>
                    )}
                    {!isProUser && (
                      <Link
                        href="/pricing"
                        className="block py-2 text-base text-primary-600 hover:text-primary-700 font-medium"
                        onClick={onClose}
                      >
                        Upgrade to Pro
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left py-2 text-base text-red-600 hover:text-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="block w-full text-center py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  onClick={onClose}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
