export default function ColorActions({
  onRandomColor,
  onExport,
  onSave,
  isEditMode,
  onToggleEdit,
}) {
  return (
    <div className="flex justify-center space-x-6 mb-8">
      <button
        onClick={onRandomColor}
        className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300"
        disabled={isEditMode}
      >
        Random
      </button>
      <button
        onClick={onExport}
        className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300"
        disabled={isEditMode}
      >
        Export
      </button>
      <button
        onClick={onToggleEdit}
        className={`py-2 px-6 rounded-lg transition-colors ${
          isEditMode
            ? "bg-primary-600 text-white hover:bg-primary-700"
            : "bg-primary-200 text-primary-700 hover:bg-primary-300"
        }`}
      >
        {isEditMode ? "Done" : "Edit"}
      </button>
      <button
        onClick={onSave}
        className="bg-primary-200 text-primary-700 py-2 px-6 rounded-lg hover:bg-primary-300"
        disabled={isEditMode}
      >
        Save
      </button>
    </div>
  );
}
