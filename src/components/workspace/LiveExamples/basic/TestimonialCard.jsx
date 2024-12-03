export default function TestimonialCard({ colorShades }) {
  const getShade = (shade) => colorShades.find((s) => s.shade === shade)?.hex;

  return (
    <div
      className="rounded-xl p-6 relative"
      style={{ backgroundColor: getShade(50) }}
    >
      <div
        className="absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: getShade(100) }}
      >
        <svg
          className="w-6 h-6"
          style={{ color: getShade(600) }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <div className="ml-16">
        <p
          className="text-lg mb-4 font-medium"
          style={{ color: getShade(700) }}
        >
          "This product has completely transformed how I work. The interface is
          intuitive and the features are exactly what I needed."
        </p>
        <div className="flex items-center">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: "url(https://placehold.co/100x100)",
            }}
          />
          <div className="ml-3">
            <h4 className="font-semibold" style={{ color: getShade(900) }}>
              Sarah Johnson
            </h4>
            <p className="text-sm" style={{ color: getShade(600) }}>
              Design Lead, Acme Inc
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
