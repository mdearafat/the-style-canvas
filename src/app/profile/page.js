"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [passwords, setPasswords] = useState({
    new: "",
    confirm: "",
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // Validate new password match
    if (passwords.new !== passwords.confirm) {
      setError("New passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwords.new,
      });

      if (updateError) throw updateError;

      // Clear form and show success message
      setPasswords({ new: "", confirm: "" });
      setMessage("Password updated successfully. Please wait...");

      // Wait a bit before refreshing the session
      setTimeout(async () => {
        const { error: refreshError } = await supabase.auth.refreshSession();
        if (refreshError) {
          console.error("Session refresh error:", refreshError);
          setError("Please log in again to continue");
          router.push("/auth/login?redirect=/profile");
        } else {
          setMessage("Password updated successfully");
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error updating password:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <p className="text-gray-600 mt-1">Manage your account settings</p>
          </div>

          {/* User Info */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Account Information</h3>
            <div className="space-y-2">
              <p>
                <span className="text-gray-600">Email:</span>{" "}
                <span className="font-medium">{user?.email}</span>
              </p>
              <p>
                <span className="text-gray-600">Account Type:</span>{" "}
                <span className="font-medium capitalize">
                  {user?.is_pro ? "Pro" : "Free"}
                </span>
              </p>
            </div>
          </div>

          {/* Password Change Form */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>

            {message && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
