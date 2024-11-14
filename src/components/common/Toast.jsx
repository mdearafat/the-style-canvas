export default function Toast({ message, visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50">
      {message}
    </div>
  );
}
