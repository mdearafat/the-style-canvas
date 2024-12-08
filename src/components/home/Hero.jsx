import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[-1px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[-1px]" />
      </div>
      <div className="relative">
        <div className="container max-w-screen-xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              Design System Made Simple
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Create, manage, and export beautiful color palettes and typography
              systems. Your design workflow, simplified.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/workspace"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Creating
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary-600 bg-white border-2 border-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
              >
                View Pricing
              </Link>
            </div>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <img
              src="/assets/project-ss.png"
              alt="Style Canvas Interface"
              className="rounded-xl shadow-2xl border border-gray-200 mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
