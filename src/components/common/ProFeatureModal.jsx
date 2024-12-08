import { useRouter } from "next/navigation";

export default function ProFeatureModal({ isOpen, onClose, featureName }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    router.push("/pricing");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-4 text-primary-600">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Pro Feature: {featureName}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Upgrade to Pro to unlock this feature and many more!
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleUpgrade}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Upgrade to Pro
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 -z-10"
        onClick={onClose}
      />
    </div>
  );
}
