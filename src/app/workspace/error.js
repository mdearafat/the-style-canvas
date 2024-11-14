'use client';

export default function WorkspaceError({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Error loading workspace
      </h2>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}
