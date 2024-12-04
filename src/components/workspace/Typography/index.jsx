import { useEffect, useMemo, useState } from "react";
import { Edit2 } from "lucide-react";

export default function Typography({ settings, setSettings }) {
  const [googleFonts, setGoogleFonts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

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

  const handleEdit = (tag) => {
    setEditing(tag);
  };

  const handleSave = () => {
    setEditing(null);
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
    if (!style)
      return property === "lineHeight"
        ? { value: 1.2, unit: "em" }
        : { value: 0, unit: "px" };
    return style;
  };

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
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
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
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
              className="group relative hover:bg-gray-50 rounded-lg transition-colors duration-150 p-4"
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
                <Edit2
                  className="w-4 h-4 text-gray-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  onClick={() => handleEdit(tag)}
                />
              </div>

              {editing === tag && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg p-4 z-10">
                  <div className="flex gap-6">
                    {/* Line Height Controls */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Line Height
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={getStyleValue(tag, "lineHeight").value}
                          onChange={(e) =>
                            handleStyleChange(
                              tag,
                              "lineHeight",
                              e.target.value,
                              getStyleValue(tag, "lineHeight").unit
                            )
                          }
                          className="block w-20 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          step="1"
                        />
                        <select
                          value={getStyleValue(tag, "lineHeight").unit}
                          onChange={(e) =>
                            handleStyleChange(
                              tag,
                              "lineHeight",
                              getStyleValue(tag, "lineHeight").value,
                              e.target.value
                            )
                          }
                          className="block rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                          <option value="em">em</option>
                          <option value="px">px</option>
                          <option value="rem">rem</option>
                        </select>
                      </div>
                    </div>

                    {/* Letter Spacing Controls */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Letter Spacing
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={getStyleValue(tag, "letterSpacing").value}
                          onChange={(e) =>
                            handleStyleChange(
                              tag,
                              "letterSpacing",
                              e.target.value,
                              getStyleValue(tag, "letterSpacing").unit
                            )
                          }
                          className="block w-20 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          step="0.1"
                        />
                        <select
                          value={getStyleValue(tag, "letterSpacing").unit}
                          onChange={(e) =>
                            handleStyleChange(
                              tag,
                              "letterSpacing",
                              getStyleValue(tag, "letterSpacing").value,
                              e.target.value
                            )
                          }
                          className="block rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                          <option value="px">px</option>
                          <option value="em">em</option>
                          <option value="rem">rem</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleSave}
                      className="self-end px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
