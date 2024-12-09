"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UserMenu() {
  const { user, isProUser } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Clear local storage
      localStorage.clear();

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear session cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Force refresh and redirect
      router.refresh();
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (!user) return null;

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
          <span className="text-white text-sm">
            {user?.email?.[0].toUpperCase()}
          </span>
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => router.push("/profile")}
                className={`${
                  active ? "bg-gray-100" : ""
                } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
              >
                Profile Settings
              </button>
            )}
          </Menu.Item>

          {isProUser && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push("/profile/saved")}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                >
                  Your Savings
                </button>
              )}
            </Menu.Item>
          )}

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSignOut}
                className={`${
                  active ? "bg-gray-100" : ""
                } block px-4 py-2 text-sm text-red-600 w-full text-left hover:text-red-700`}
              >
                Sign Out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
