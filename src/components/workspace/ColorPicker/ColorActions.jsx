export default function ColorActions({ onRandomColor, onExport, onSave }) {
  return (
    <div className="flex justify-center space-x-6 mb-8">
      <button
        onClick={onRandomColor}
        className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300"
      >
        Random
      </button>
      <button
        onClick={onExport}
        className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300"
      >
        Export
      </button>
      <button className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300">
        Edit
      </button>
      <button
        onClick={onSave}
        className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300"
      >
        Save
      </button>
    </div>
  );
}
