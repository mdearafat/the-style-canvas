import { useState } from 'react';

export default function SavePaletteDialog({ onSave, onClose }) {
  const [paletteName, setPaletteName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!paletteName.trim()) {
      setError('Please enter a valid name');
      return;
    }
    onSave(paletteName);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-semibold mb-4">Save Palette</h2>
        <input
          type="text"
          value={paletteName}
          onChange={(e) => setPaletteName(e.target.value)}
          placeholder="Enter palette name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 btn-primary text-white rounded hover:bg-primary-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
