"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isProUser, setIsProUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          await checkUserStatus(session.user.id);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      if (session) {
        setUser(session.user);
        await checkUserStatus(session.user.id);
      } else {
        setUser(null);
        setIsProUser(false);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserStatus = async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_pro")
        .eq("id", userId)
        .single();

      if (error) throw error;

      console.log("Profile status:", profile); // Debug log
      setIsProUser(profile?.is_pro || false);
    } catch (error) {
      console.error("Error checking pro status:", error);
      setIsProUser(false);
    }
  };

  const refreshUser = async () => {
    try {
      if (!user) return;

      // First refresh the session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (!session) {
        console.error("No session found during refresh");
        return;
      }

      // Update user state
      setUser(session.user);

      // Check pro status
      await checkUserStatus(session.user.id);

      console.log("User refreshed successfully"); // Debug log
    } catch (error) {
      console.error("Error in refreshUser:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isProUser,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
