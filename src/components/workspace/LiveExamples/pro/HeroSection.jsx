export default function HeroSection({ primaryShades, secondaryShades }) {
  const getPrimaryShade = (shade) =>
    primaryShades.find((s) => s.shade === shade)?.hex;
  const getSecondaryShade = (shade) =>
    secondaryShades.find((s) => s.shade === shade)?.hex;

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{ backgroundColor: getPrimaryShade(50) }}
    >
      <div className="p-8 md:p-12 lg:px-16 lg:py-24 relative z-10">
        <div className="max-w-2xl text-center mx-auto">
          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{ color: getPrimaryShade(900) }}
          >
            Transform Your Digital Experience
          </h2>
          <p className="mt-4 text-lg" style={{ color: getPrimaryShade(700) }}>
            Create stunning designs with our innovative platform. Start your
            journey today.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
              style={{
                backgroundColor: getSecondaryShade(600),
                ":hover": { backgroundColor: getSecondaryShade(700) },
              }}
            >
              Get Started
            </button>
            <button
              className="px-6 py-3 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: getPrimaryShade(100),
                color: getPrimaryShade(700),
                ":hover": { backgroundColor: getPrimaryShade(200) },
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* Decorative elements using secondary color */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/3"
        style={{ backgroundColor: getSecondaryShade(500) }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/3"
        style={{ backgroundColor: getSecondaryShade(400) }}
      />
    </div>
  );
}
