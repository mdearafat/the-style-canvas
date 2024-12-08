"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import ColorPicker from "@/src/components/workspace/ColorPicker";
import LiveExamples from "@/src/components/workspace/LiveExamples";
import TabSection from "@/src/components/workspace/TabSection";
import Typography from "@/src/components/workspace/Typography";
import { generateColorShades, getRandomColor } from "@/src/utils/colorUtils";

export default function WorkspacePage() {
  const searchParams = useSearchParams();
  const { user, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("colors");
  const [notification, setNotification] = useState(null);
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  // Primary color state
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [primaryShades, setPrimaryShades] = useState(() =>
    generateColorShades("#000000")
  );

  // Secondary color state
  const [showSecondary, setShowSecondary] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState(null);
  const [secondaryShades, setSecondaryShades] = useState([]);

  // Typography state
  const [typographySettings, setTypographySettings] = useState({
    baseSize: 16,
    scale: "1.200",
    fontFamily: "Inter",
    textStyles: {},
  });

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Verify Stripe session if present
  useEffect(() => {
    const verifySession = async () => {
      const success = searchParams.get("success");
      const sessionId = searchParams.get("session_id");

      if (success === "true" && sessionId && user && !verificationInProgress) {
        try {
          setVerificationInProgress(true);
          setNotification({
            type: "info",
            message: "Verifying your subscription...",
          });

          const response = await fetch("/api/stripe/verify-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionId,
              userId: user.id,
            }),
          });

          const data = await response.json();

          if (data.success) {
            // Refresh the user context to get updated subscription status
            await refreshUser();

            setNotification({
              type: "success",
              message: "Successfully upgraded to Pro! Enjoy your new features.",
            });

            // Remove the query parameters from URL without page refresh
            window.history.replaceState({}, "", "/workspace");
          } else {
            console.error("Verification failed:", data);
            setNotification({
              type: "error",
              message: `Subscription verification failed: ${data.error}`,
            });
          }
        } catch (error) {
          console.error("Error verifying session:", error);
          setNotification({
            type: "error",
            message:
              "There was an issue verifying your subscription. Please contact support.",
          });
        } finally {
          setVerificationInProgress(false);
        }
      }
    };

    verifySession();
  }, [searchParams, user, refreshUser, verificationInProgress]);

  // Generate initial random color and load saved preferences
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        setIsLoading(true);
        const initialColor = getRandomColor();
        setPrimaryColor(initialColor);
        setPrimaryShades(generateColorShades(initialColor));

        if (user) {
          // Load saved preferences from Supabase (future implementation)
        }
      } catch (err) {
        setError("Failed to initialize workspace");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialState();
  }, [user]);

  const handlePrimaryChange = useCallback((color, shades) => {
    try {
      setPrimaryColor(color);
      if (shades) {
        setPrimaryShades(shades);
      } else {
        setPrimaryShades(generateColorShades(color));
      }
    } catch (err) {
      console.error("Error updating primary color:", err);
      setError("Failed to update primary color");
    }
  }, []);

  const handleSecondaryChange = useCallback((color, shades) => {
    try {
      setSecondaryColor(color);
      if (shades) {
        setSecondaryShades(shades);
      } else if (color) {
        setSecondaryShades(generateColorShades(color));
      } else {
        setSecondaryShades([]);
      }
    } catch (err) {
      console.error("Error updating secondary color:", err);
      setError("Failed to update secondary color");
    }
  }, []);

  const handleAddSecondary = useCallback((show) => {
    try {
      setShowSecondary(show);
      if (show) {
        const initialColor = getRandomColor();
        setSecondaryColor(initialColor);
        setSecondaryShades(generateColorShades(initialColor));
      }
    } catch (err) {
      console.error("Error adding secondary color:", err);
      setError("Failed to add secondary color");
    }
  }, []);

  const handleRemoveSecondary = useCallback(() => {
    setShowSecondary(false);
    setSecondaryColor(null);
    setSecondaryShades([]);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === "success"
              ? "bg-green-50 text-green-800"
              : notification.type === "error"
              ? "bg-red-50 text-red-800"
              : "bg-blue-50 text-blue-800"
          } animate-slide-in`}
        >
          {notification.message}
        </div>
      )}

      <TabSection activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "colors" ? (
        <>
          <ColorPicker
            primaryColor={primaryColor}
            primaryShades={primaryShades}
            onPrimaryChange={handlePrimaryChange}
            showSecondary={showSecondary}
            secondaryColor={secondaryColor}
            secondaryShades={secondaryShades}
            onSecondaryChange={handleSecondaryChange}
            onAddSecondary={handleAddSecondary}
            onRemoveSecondary={handleRemoveSecondary}
          />
          <LiveExamples
            colorShades={primaryShades}
            secondaryShades={showSecondary ? secondaryShades : null}
          />
        </>
      ) : (
        <Typography
          settings={typographySettings}
          setSettings={setTypographySettings}
        />
      )}
    </main>
  );
}
