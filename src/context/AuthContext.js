"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = async (userId, userEmail) => {
    if (!userId || !userEmail) {
      console.log("Missing user info for status check", { userId, userEmail });
      setIsProUser(false);
      return;
    }

    try {
      console.log("Checking pro status for user:", userId);

      // First check if profile exists
      const { data: profiles, error: checkError } = await supabase
        .from("profiles")
        .select("id, is_pro, email")
        .eq("id", userId);

      if (checkError) {
        console.error("Error checking profile:", checkError.message);
        throw checkError;
      }

      // If no profile exists, create one
      if (!profiles || profiles.length === 0) {
        console.log("Creating new profile for user:", userId);
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: userId,
            email: userEmail,
            is_pro: false,
          },
        ]);

        if (insertError) {
          console.error("Error creating profile:", insertError.message);
          throw insertError;
        }

        setIsProUser(false);
        return;
      }

      // If multiple profiles exist (shouldn't happen), use the first one
      const profile = profiles[0];
      console.log("Profile found:", profile);
      setIsProUser(profile.is_pro || false);
    } catch (error) {
      console.error("Error in checkUserStatus:", {
        message: error.message,
        code: error.code,
        details: error.details,
      });
      setIsProUser(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          console.log("Session found for user:", session.user.email);
          setUser(session.user);
          await checkUserStatus(session.user.id, session.user.email);
        } else {
          console.log("No session found");
          setUser(null);
          setIsProUser(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error.message);
        setUser(null);
        setIsProUser(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);

      if (event === "SIGNED_OUT") {
        console.log("User signed out, clearing state");
        setUser(null);
        setIsProUser(false);
        localStorage.clear();
      } else if (session?.user) {
        console.log("User session updated:", session.user.email);
        setUser(session.user);
        await checkUserStatus(session.user.id, session.user.email);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshUser = async () => {
    try {
      setLoading(true);
      console.log("Refreshing user session...");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session refresh error:", sessionError.message);
        throw sessionError;
      }

      if (session?.user) {
        console.log("Session refreshed for user:", session.user.email);
        setUser(session.user);
        await checkUserStatus(session.user.id, session.user.email);
      } else {
        console.log("No session found during refresh");
        setUser(null);
        setIsProUser(false);
      }
    } catch (error) {
      console.error("Error in refreshUser:", error.message);
      setUser(null);
      setIsProUser(false);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsProUser(false);
      localStorage.removeItem("supabase.auth.token");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isProUser,
        loading,
        refreshUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
