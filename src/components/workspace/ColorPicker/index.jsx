"use client";

import { generateColorShades, getRandomColor } from "@/utils/colorUtils";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import ColorActions from "./ColorActions";
import ColorShade from "./ColorShade";
import SavePaletteDialog from "./SavePaletteDialog";
import ExportDialog from "./ExportDialog";

export default function ColorPicker({
  selectedColor,
  colorShades,
  onColorChange,
}) {
  const [inputColor, setInputColor] = useState(selectedColor);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialShades, setInitialShades] = useState({});
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  useEffect(() => {
    setInputColor(selectedColor);
  }, [selectedColor]);

  useEffect(() => {
    const initialColor = getRandomColor();
    const shades = generateColorShades(initialColor);
    onColorChange(initialColor, shades);
  }, [onColorChange]);

  // Update initial shades only when main color changes
  useEffect(() => {
    if (selectedColor) {
      const initial = {};
      colorShades.forEach((shade) => {
        initial[shade.shade] = shade.hex;
      });
      setInitialShades(initial);
      setIsEditMode(false);
    }
  }, [selectedColor]); // Only depend on selectedColor, not colorShades

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputColor(value);

    // Only update if it's a valid hex color
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      handleColorChange(value);
    }
  };

  const handleColorChange = (color) => {
    const shades = generateColorShades(color);
    onColorChange(color, shades);
  };

  const handleShadeColorChange = (shade, newColor) => {
    const updatedShades = colorShades.map((s) =>
      s.shade === shade ? { ...s, hex: newColor } : s
    );
    onColorChange(selectedColor, updatedShades);
  };

  const handleSavePalette = async (name) => {
    const palette = {
      name,
      colors: colorShades.reduce((acc, shade) => {
        acc[shade.shade] = shade.hex;
        return acc;
      }, {}),
    };

    console.log("Palette to be saved:", palette);
    // Commented out Supabase code for now
    /*
    const { data, error } = await supabase.from("palettes").insert([palette]);

    if (error) {
      console.error("Error saving palette:", error);
      alert("Failed to save palette. Please try again.");
    } else {
      alert("Palette Saved");
      console.log("Palette saved:", data);
    }
    */

    alert("Palette Saved (Development Mode)");
    setIsSaveDialogOpen(false);
  };

  const handleExport = () => {
    const colors = colorShades.reduce((acc, shade) => {
      acc[shade.shade] = shade.hex;
      return acc;
    }, {});
    setIsExportDialogOpen(true);
  };

  return (
    <section>
      <div className="container max-w-screen-xl mx-auto py-8 px-4">
        {/* Selected Color Display */}
        <div
          className={`transition-opacity duration-300 ${
            isEditMode ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex flex-col gap-4 mb-8 justify-center items-center">
            <div className="flex justify-center items-center gap-3 border border-primary-500 py-2 w-64 rounded-full bg-primary-100">
              <div className="relative">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="absolute inset-0 opacity-0 w-12 h-12 cursor-pointer"
                />
                <div
                  className="w-12 h-12 rounded-full border border-gray-300"
                  style={{ backgroundColor: selectedColor }}
                />
              </div>
              <input
                type="text"
                value={inputColor}
                onChange={handleInputChange}
                className="text-lg font-semibold bg-transparent outline-none w-28 text-center"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>

        {/* Color Actions */}
        <ColorActions
          onRandomColor={() => handleColorChange(getRandomColor())}
          onExport={handleExport}
          onSave={() => setIsSaveDialogOpen(true)}
          isEditMode={isEditMode}
          onToggleEdit={() => setIsEditMode(!isEditMode)}
        />

        {/* Color Shades Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2">
          {colorShades.map((shade) => (
            <ColorShade
              key={shade.shade}
              {...shade}
              originalHex={initialShades[shade.shade]}
              isEditMode={isEditMode}
              onColorChange={handleShadeColorChange}
              isSelected={
                shade.hex.toLowerCase() === selectedColor.toLowerCase()
              }
              onClick={() => !isEditMode && handleColorChange(shade.hex)}
            />
          ))}
        </div>

        {/* Pro Feature */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsSecondaryVisible(true)}
            className="text-primary-600 hover:text-primary-700 cursor-pointer"
          >
            + Add a secondary color (Pro)
          </button>
        </div>

        {isSaveDialogOpen && (
          <SavePaletteDialog
            onSave={handleSavePalette}
            onClose={() => setIsSaveDialogOpen(false)}
          />
        )}

        {isExportDialogOpen && (
          <ExportDialog
            colors={colorShades.reduce((acc, shade) => {
              acc[shade.shade] = shade.hex;
              return acc;
            }, {})}
            onClose={() => setIsExportDialogOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
