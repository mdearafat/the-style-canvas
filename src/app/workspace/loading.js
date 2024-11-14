export default function WorkspaceLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      <p className="ml-4 text-gray-600">Loading workspace...</p>
    </div>
  );
}
