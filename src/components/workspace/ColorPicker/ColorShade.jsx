import Toast from '@/components/common/Toast';
import { useState } from 'react';

export default function ColorShade({ shade, hex, isSelected, onClick }) {
  const [showToast, setShowToast] = useState(false);

  const handleClick = async () => {
    if (isSelected) {
      onClick();
      return;
    }

    try {
      await navigator.clipboard.writeText(hex);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`flex flex-col items-center border p-4 rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
          isSelected
            ? 'border-2 border-blue-500 shadow-lg'
            : 'border border-gray-200'
        }`}
      >
        <div
          className="w-16 h-16 rounded-full border border-gray-200"
          style={{ backgroundColor: hex }}
        />
        <p className="text-sm text-gray-800">{shade}</p>
        <p className="text-sm text-gray-600">{hex}</p>
      </div>
      <Toast
        message={`Color ${hex} copied!`}
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
