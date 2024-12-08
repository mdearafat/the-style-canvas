import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useColorPalettes(userId) {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPalettes() {
      try {
        const { data, error } = await supabase
          .from("color_palettes")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPalettes(data || []);
      } catch (error) {
        console.error("Error fetching palettes:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchPalettes();
    }
  }, [userId]);

  return { palettes, loading };
}

export function useTypographySettings(userId) {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from("typography_settings")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setSettings(data || []);
      } catch (error) {
        console.error("Error fetching typography settings:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchSettings();
    }
  }, [userId]);

  return { settings, loading };
}

export function useUserProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return { profile, loading };
}
