"use client";

import ColorPicker from "@/components/workspace/ColorPicker";
import LiveExamples from "@/components/workspace/LiveExamples";
import TabSection from "@/components/workspace/TabSection";
import Typography from "@/components/workspace/Typography";
import { generateColorShades, getRandomColor } from "@/utils/colorUtils";
import { useCallback, useEffect, useState } from "react";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState("colors");

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

  // Generate initial random color only once on mount
  useEffect(() => {
    const initialColor = getRandomColor();
    setPrimaryColor(initialColor);
    setPrimaryShades(generateColorShades(initialColor));
  }, []);

  const handlePrimaryChange = useCallback((color, shades) => {
    setPrimaryColor(color);
    if (shades) {
      setPrimaryShades(shades);
    } else {
      setPrimaryShades(generateColorShades(color));
    }
  }, []);

  const handleSecondaryChange = useCallback((color, shades) => {
    setSecondaryColor(color);
    if (shades) {
      setSecondaryShades(shades);
    } else {
      setSecondaryShades(generateColorShades(color));
    }
  }, []);

  const handleAddSecondary = useCallback(() => {
    const initialColor = getRandomColor();
    setShowSecondary(true);
    setSecondaryColor(initialColor);
    setSecondaryShades(generateColorShades(initialColor));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <TabSection activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "colors" ? (
        <ColorPicker
          primaryColor={primaryColor}
          primaryShades={primaryShades}
          onPrimaryChange={handlePrimaryChange}
          showSecondary={showSecondary}
          secondaryColor={secondaryColor}
          secondaryShades={secondaryShades}
          onSecondaryChange={handleSecondaryChange}
          onAddSecondary={handleAddSecondary}
        />
      ) : (
        <Typography
          settings={typographySettings}
          setSettings={setTypographySettings}
        />
      )}

      <LiveExamples
        colorShades={primaryShades}
        secondaryShades={showSecondary ? secondaryShades : null}
      />
    </main>
  );
}
