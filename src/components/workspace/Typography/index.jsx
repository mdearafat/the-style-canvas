import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import ProFeatureModal from "@/src/components/common/ProFeatureModal";
import SaveTypographyDialog from "./SaveTypographyDialog";

export default function Typography({ settings, setSettings }) {
  const [googleFonts, setGoogleFonts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [proFeature, setProFeature] = useState("");
  const { user, isProUser } = useAuth();

  // Fetch Google Fonts
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;

        if (!API_KEY) {
          throw new Error("Google Fonts API key is not configured");
        }

        const response = await fetch(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=popularity`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const fonts = data.items.map((font) => ({
          name: font.family,
          category: font.category,
          variants: font.variants,
          files: font.files,
        }));

        setGoogleFonts(fonts);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching Google Fonts:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFonts();
  }, []);

  // Load selected Google Font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(
      " ",
      "+"
    )}:wght@400;500;600;700&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [settings.fontFamily]);

  const scales = [
    { value: "1.067", name: "Minor Second" },
    { value: "1.125", name: "Major Second" },
    { value: "1.200", name: "Minor Third" },
    { value: "1.250", name: "Major Third" },
    { value: "1.333", name: "Perfect Fourth" },
    { value: "1.414", name: "Augmented Fourth" },
    { value: "1.500", name: "Perfect Fifth" },
    { value: "1.618", name: "Golden Ratio" },
  ];

  const sizes = useMemo(() => {
    const baseSize = parseFloat(settings.baseSize);
    const scaleRatio = parseFloat(settings.scale);

    return {
      h1: (baseSize * Math.pow(scaleRatio, 6)).toFixed(2),
      h2: (baseSize * Math.pow(scaleRatio, 5)).toFixed(2),
      h3: (baseSize * Math.pow(scaleRatio, 4)).toFixed(2),
      h4: (baseSize * Math.pow(scaleRatio, 3)).toFixed(2),
      h5: (baseSize * Math.pow(scaleRatio, 2)).toFixed(2),
      h6: (baseSize * scaleRatio).toFixed(2),
      p: baseSize.toFixed(2),
      small: (baseSize / scaleRatio).toFixed(2),
    };
  }, [settings.baseSize, settings.scale]);

  const previewText = "The quick brown fox jumps over the lazy dog";

  const handleProFeature = (feature, action) => {
    if (isProUser) {
      action();
    } else {
      setProFeature(feature);
      setShowProModal(true);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setShowSaveDialog(true);
  };

  const convertToRem = (px) => (px / 16).toFixed(2);

  const handleStyleChange = (tag, property, value, unit) => {
    setSettings((prev) => ({
      ...prev,
      textStyles: {
        ...prev.textStyles,
        [tag]: {
          ...prev.textStyles?.[tag],
          [property]: { value, unit },
        },
      },
    }));
  };

  const getStyleValue = (tag, property) => {
    const style = settings.textStyles?.[tag]?.[property];

    if (!style) {
      if (property === "lineHeight") {
        // Calculate default line-height (1.2em) in px based on the tag's font size
        const baseSize =
          tag === "small"
            ? settings.baseSize / parseFloat(settings.scale)
            : tag === "p"
            ? settings.baseSize
            : settings.baseSize *
              Math.pow(
                parseFloat(settings.scale),
                7 - ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(tag)
              );
        return { value: 1.2 * baseSize, unit: "px" };
      }
      return { value: 0, unit: "px" };
    }

    // Convert any existing values to px
    if (style.unit === "em") {
      const baseSize =
        tag === "small"
          ? settings.baseSize / parseFloat(settings.scale)
          : tag === "p"
          ? settings.baseSize
          : settings.baseSize *
            Math.pow(
              parseFloat(settings.scale),
              7 - ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(tag)
            );
      return { value: style.value * baseSize, unit: "px" };
    }
    if (style.unit === "rem") {
      return { value: style.value * 16, unit: "px" };
    }
    return style;
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => {
      // If scale or baseSize changes, reset line heights
      if (key === "scale" || key === "baseSize") {
        const tags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "small"];
        const updatedTextStyles = { ...prev.textStyles };

        tags.forEach((tag) => {
          const baseSize =
            tag === "small"
              ? value / parseFloat(key === "scale" ? value : prev.scale)
              : tag === "p"
              ? key === "baseSize"
                ? value
                : prev.baseSize
              : (key === "baseSize" ? value : prev.baseSize) *
                Math.pow(
                  parseFloat(key === "scale" ? value : prev.scale),
                  7 - ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(tag)
                );

          // Reset line height to 1.2 * new font size
          if (updatedTextStyles[tag]) {
            updatedTextStyles[tag] = {
              ...updatedTextStyles[tag],
              lineHeight: { value: 1.2 * baseSize, unit: "px" },
            };
          }
        });

        return {
          ...prev,
          [key]: value,
          textStyles: updatedTextStyles,
        };
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="flex justify-end mb-4 space-x-4">
        <button
          onClick={() => handleProFeature("Edit Typography", handleEdit)}
          className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
            isEditing
              ? "bg-primary-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          title={
            isProUser
              ? isEditing
                ? "Finish editing typography"
                : "Edit typography settings"
              : "Pro feature: Edit typography settings"
          }
        >
          {isEditing ? "Done" : "Edit"}
          {!isProUser && (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          )}
        </button>
        <button
          onClick={() => handleProFeature("Save Typography", handleSave)}
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm flex items-center gap-2"
          title={
            isProUser
              ? "Save typography settings"
              : "Pro feature: Save typography settings"
          }
        >
          Save
          {!isProUser && (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Pro Feature Modal */}
      <ProFeatureModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        featureName={proFeature}
      />

      {/* Save Typography Dialog */}
      {showSaveDialog && (
        <SaveTypographyDialog
          onClose={() => setShowSaveDialog(false)}
          settings={settings}
        />
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Base Size
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={settings.baseSize}
                onChange={(e) =>
                  handleSettingChange("baseSize", e.target.value)
                }
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
                min="8"
                max="32"
              />
              <span className="ml-2 text-gray-500">px</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Scale
            </label>
            <select
              value={settings.scale}
              onChange={(e) => handleSettingChange("scale", e.target.value)}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
            >
              {scales.map((scale) => (
                <option key={scale.value} value={scale.value}>
                  {scale.value} – {scale.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Font Family
            </label>
            {loading ? (
              <div className="animate-pulse h-10 bg-gray-100 rounded-lg" />
            ) : error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : (
              <select
                value={settings.fontFamily}
                onChange={(e) =>
                  handleSettingChange("fontFamily", e.target.value)
                }
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
              >
                {googleFonts.length === 0 ? (
                  <option>No fonts available</option>
                ) : (
                  <>
                    <optgroup label="Sans Serif">
                      {googleFonts
                        .filter((font) => font.category === "sans-serif")
                        .map((font) => (
                          <option key={font.name} value={font.name}>
                            {font.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Serif">
                      {googleFonts
                        .filter((font) => font.category === "serif")
                        .map((font) => (
                          <option key={font.name} value={font.name}>
                            {font.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Display">
                      {googleFonts
                        .filter((font) => font.category === "display")
                        .map((font) => (
                          <option key={font.name} value={font.name}>
                            {font.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Monospace">
                      {googleFonts
                        .filter((font) => font.category === "monospace")
                        .map((font) => (
                          <option key={font.name} value={font.name}>
                            {font.name}
                          </option>
                        ))}
                    </optgroup>
                  </>
                )}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Typography Preview */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="space-y-12">
          {["h1", "h2", "h3", "h4", "h5", "h6", "p", "small"].map((tag) => (
            <div
              key={tag}
              className="relative rounded-lg transition-colors duration-150 p-4"
            >
              <div className="flex items-center gap-8">
                <div className="w-32">
                  <div className="text-sm font-medium text-gray-900">{tag}</div>
                  <div className="text-sm text-gray-500">
                    {sizes[tag]}px / {convertToRem(sizes[tag])}rem
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className="font-medium transition-colors"
                    style={{
                      fontFamily: `"${settings.fontFamily}", ${
                        googleFonts.find((f) => f.name === settings.fontFamily)
                          ?.category
                      }`,
                      fontSize: `${sizes[tag]}px`,
                      lineHeight: `${getStyleValue(tag, "lineHeight").value}${
                        getStyleValue(tag, "lineHeight").unit
                      }`,
                      letterSpacing: `${
                        getStyleValue(tag, "letterSpacing").value
                      }${getStyleValue(tag, "letterSpacing").unit}`,
                    }}
                  >
                    {previewText}
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-6">
                    {/* Line Height Controls */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                          Line Height
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const baseSize =
                              tag === "small"
                                ? settings.baseSize / parseFloat(settings.scale)
                                : tag === "p"
                                ? settings.baseSize
                                : settings.baseSize *
                                  Math.pow(
                                    parseFloat(settings.scale),
                                    7 -
                                      [
                                        "h1",
                                        "h2",
                                        "h3",
                                        "h4",
                                        "h5",
                                        "h6",
                                      ].indexOf(tag)
                                  );
                            handleStyleChange(
                              tag,
                              "lineHeight",
                              1.2 * baseSize,
                              "px"
                            );
                          }}
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          Reset
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={getStyleValue(tag, "lineHeight").value}
                          onChange={(e) =>
                            handleStyleChange(
                              tag,
                              "lineHeight",
                              e.target.value,
                              "px"
                            )
                          }
                          className="block w-24 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
                          step="0.1"
                        />
                        <span className="text-sm text-gray-500 flex items-center">
                          px
                        </span>
                      </div>
                    </div>

                    {/* Letter Spacing Controls */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700">
                          Letter Spacing
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            handleStyleChange(tag, "letterSpacing", 0, "px");
                          }}
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          Reset
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={getStyleValue(tag, "letterSpacing").value}
                          onChange={(e) =>
                            handleStyleChange(
                              tag,
                              "letterSpacing",
                              e.target.value,
                              "px"
                            )
                          }
                          className="block w-24 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 px-4 py-2.5"
                          step="0.1"
                        />
                        <span className="text-sm text-gray-500 flex items-center">
                          px
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
