import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link href="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
}
