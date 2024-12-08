import { useState, useEffect } from "react";
import { generateColorShades, getRandomColor } from "@/src/utils/colorUtils";
import { useAuth } from "@/src/context/AuthContext";
import ColorActions from "./ColorActions";
import ColorShade from "./ColorShade";
import SavePaletteDialog from "./SavePaletteDialog";
import ExportDialog from "./ExportDialog";

export default function ColorSection({
  selectedColor,
  colorShades,
  onColorChange,
  isSecondary = false,
}) {
  const { isProUser } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialShades, setInitialShades] = useState({});
  const [inputColor, setInputColor] = useState(selectedColor);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  useEffect(() => {
    setInputColor(selectedColor);
  }, [selectedColor]);

  useEffect(() => {
    const initial = {};
    colorShades.forEach((shade) => {
      initial[shade.shade] = shade.hex;
    });
    setInitialShades(initial);
    setIsEditMode(false);
  }, [selectedColor]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputColor(value);
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      handleColorChange(value);
    }
  };

  const handleColorChange = (color) => {
    const shades = generateColorShades(color);
    onColorChange(color, shades);
  };

  const handleShadeColorChange = (shade, newColor) => {
    if (!isProUser) return;
    const updatedShades = colorShades.map((s) =>
      s.shade === shade ? { ...s, hex: newColor } : s
    );
    onColorChange(selectedColor, updatedShades);
  };

  return (
    <div className="mb-12">
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

      <ColorActions
        onRandomColor={() => handleColorChange(getRandomColor())}
        onExport={() => setIsExportDialogOpen(true)}
        onSave={() => setIsSaveDialogOpen(true)}
        isEditMode={isEditMode}
        onToggleEdit={() => setIsEditMode(!isEditMode)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2">
        {colorShades.map((shade) => (
          <ColorShade
            key={shade.shade}
            {...shade}
            originalHex={initialShades[shade.shade]}
            isEditMode={isEditMode}
            onColorChange={handleShadeColorChange}
            isSelected={shade.hex.toLowerCase() === selectedColor.toLowerCase()}
            onClick={() => !isEditMode && handleColorChange(shade.hex)}
          />
        ))}
      </div>
      {isSaveDialogOpen && (
        <SavePaletteDialog
          onClose={() => setIsSaveDialogOpen(false)}
          colors={colorShades.reduce((acc, shade) => {
            acc[shade.shade] = shade.hex;
            return acc;
          }, {})}
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
  );
}
