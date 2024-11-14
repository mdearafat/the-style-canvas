'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Something went wrong!
      </h2>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}
