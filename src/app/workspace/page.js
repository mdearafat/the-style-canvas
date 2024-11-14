'use client';

import ColorPicker from '@/components/workspace/ColorPicker';
import LiveExamples from '@/components/workspace/LiveExamples';
import TabSection from '@/components/workspace/TabSection';
import Typography from '@/components/workspace/Typography';
import { useCallback, useState } from 'react';

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState('colors');
  const [selectedColor, setSelectedColor] = useState('');
  const [colorShades, setColorShades] = useState([]);

  const handleColorChange = useCallback((color, shades) => {
    setSelectedColor(color);
    setColorShades(shades);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <TabSection activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'colors' ? (
        <ColorPicker
          selectedColor={selectedColor}
          colorShades={colorShades}
          onColorChange={handleColorChange}
        />
      ) : (
        <Typography />
      )}

      <LiveExamples colorShades={colorShades} />
    </main>
  );
}
