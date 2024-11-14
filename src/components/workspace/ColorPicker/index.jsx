'use client';

import { generateColorShades, getRandomColor } from '@/utils/colorUtils';
import { supabase } from '@/utils/supabase';
import { useEffect, useState } from 'react';
import ColorActions from './ColorActions';
import ColorShade from './ColorShade';
import SavePaletteDialog from './SavePaletteDialog';

export default function ColorPicker({
  selectedColor,
  colorShades,
  onColorChange,
}) {
  const [inputColor, setInputColor] = useState(selectedColor);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  useEffect(() => {
    setInputColor(selectedColor);
  }, [selectedColor]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputColor(value);

    // Only update if it's a valid hex color
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      handleColorChange(value);
    }
  };

  useEffect(() => {
    const initialColor = getRandomColor();
    const shades = generateColorShades(initialColor);
    onColorChange(initialColor, shades);
  }, [onColorChange]);

  const handleColorChange = (color) => {
    const shades = generateColorShades(color);
    onColorChange(color, shades);
  };

  const handleSavePalette = async (name) => {
    const palette = {
      name,
      colors: colorShades.reduce((acc, shade) => {
        acc[shade.shade] = shade.hex;
        return acc;
      }, {}),
    };

    console.log('Saving palette:', palette);

    // Save to Supabase
    const { data, error } = await supabase.from('palettes').insert([palette]);

    if (error) {
      console.error('Error saving palette:', error);
      alert('Failed to save palette. Please try again.');
    } else {
      alert('Palette Saved');
      console.log('Palette saved:', data);
    }
  };

  return (
    <section>
      <div className="container max-w-screen-xl mx-auto py-8 px-4">
        {/* Selected Color Display */}
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

        {/* Color Actions */}
        <ColorActions
          onRandomColor={() => handleColorChange(getRandomColor())}
          onExport={() => {
            /* Export logic */
          }}
          onSave={() => setIsSaveDialogOpen(true)}
        />

        {/* Color Shades Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11 gap-2">
          {colorShades.map((shade) => (
            <ColorShade
              key={shade.shade}
              {...shade}
              isSelected={
                shade.hex.toLowerCase() === selectedColor.toLowerCase()
              }
              onClick={() => handleColorChange(shade.hex)}
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
      </div>
    </section>
  );
}
