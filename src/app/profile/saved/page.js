"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Trash2 } from "lucide-react";

// Helper function to get value in px
const getPxValue = (value) => {
  if (typeof value === "object" && value !== null) {
    return value.px || 0;
  }
  return value;
};

export default function SavedItems() {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [typographyStyles, setTypographyStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSavedItems = async () => {
    try {
      // Fetch color palettes
      const { data: colorData, error: colorError } = await supabase
        .from("color_palettes")
        .select("id, name, colors")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (colorError) throw colorError;

      // Fetch typography styles
      const { data: typoData, error: typoError } = await supabase
        .from("typography_settings")
        .select("id, name, settings")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (typoError) throw typoError;

      setColorPalettes(colorData || []);
      setTypographyStyles(typoData || []);
    } catch (error) {
      console.error("Error fetching saved items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedItems();
    }
  }, [user]);

  const handleDelete = async (type, id, name) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );

    if (!isConfirmed) return;

    try {
      const { error } = await supabase
        .from(type === "color" ? "color_palettes" : "typography_settings")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update state to remove deleted item
      if (type === "color") {
        setColorPalettes((prev) => prev.filter((item) => item.id !== id));
      } else {
        setTypographyStyles((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold mb-8">Your Saved Items</h1>

      {/* Color Palettes Section */}
      <div className="mb-12">
        <h2 className="text-xl font-medium mb-4">Color Palettes</h2>
        {colorPalettes.length === 0 ? (
          <p className="text-gray-500">No saved color palettes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colorPalettes.map((palette) => (
              <div
                key={palette.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{palette.name}</h3>
                  <button
                    onClick={() =>
                      handleDelete("color", palette.id, palette.name)
                    }
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete palette"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  {Object.entries(palette.colors).map(([shade, color]) => (
                    <div
                      key={shade}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: color }}
                      title={`${shade}: ${color}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Typography Styles Section */}
      <div>
        <h2 className="text-xl font-medium mb-4">Typography Styles</h2>
        {typographyStyles.length === 0 ? (
          <p className="text-gray-500">No saved typography styles yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {typographyStyles.map((style) => (
              <div
                key={style.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{style.name}</h3>
                  <button
                    onClick={() =>
                      handleDelete("typography", style.id, style.name)
                    }
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete style"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Font: {style.settings.fontFamily}</p>
                  <p>Base Size: {getPxValue(style.settings.baseSize)}px</p>
                  <p>Scale: {style.settings.scale}</p>
                  <div className="mt-2 pt-2 border-t">
                    <p className="font-medium text-gray-700 mb-2">
                      Text Styles
                    </p>
                    <div className="space-y-2">
                      {["h1", "h2", "h3", "h4", "h5", "h6", "p", "small"].map(
                        (tag) => {
                          const textStyle = style.settings.textStyles[tag];
                          if (!textStyle) return null;
                          return (
                            <div key={tag} className="flex items-start gap-4">
                              <span className="font-medium text-gray-700 w-12">
                                {tag}:
                              </span>
                              <div>
                                <p>Size: {getPxValue(textStyle.fontSize)}px</p>
                                <p>
                                  Line Height:{" "}
                                  {getPxValue(textStyle.lineHeight)}px
                                </p>
                                {getPxValue(textStyle.letterSpacing) !== 0 && (
                                  <p>
                                    Letter Spacing:{" "}
                                    {getPxValue(textStyle.letterSpacing)}px
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
