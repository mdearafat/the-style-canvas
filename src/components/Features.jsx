export default function Features() {
  return (
    <section>
      <div className="container max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-8 px-4">
        <div className="bg-primary-100 p-5 rounded-3xl">
          <h3 className="text-xl font-semibold text-gray-800 leading-7">
            Create Tailored Colors with Ease
          </h3>
          <p className="text-lg text-gray-600 mt-2">
            Effortlessly generate custom color palettes by selecting a base
            color, with automatically generated shades ranging from 50 to 950.
            This feature gives users full control over color variations, helping
            create the perfect balance between subtle and bold design choices.
          </p>
        </div>

        <div className="bg-primary-100 p-5 rounded-3xl">
          <h3 className="text-xl font-semibold text-gray-800 leading-7">
            Real-Time Design Previews
          </h3>
          <p className="text-lg text-gray-600 mt-2">
            Watch design changes come to life instantly with live previews. As
            users modify colors or typography, updates are reflected in
            real-time across UI elements like buttons, headings, and cards. This
            ensures design consistency and accuracy, improving the user
            experience.
          </p>
        </div>

        <div className="bg-primary-100 p-5 rounded-3xl">
          <h3 className="text-xl font-semibold text-gray-800 leading-7">
            Flexible Typography Settings
          </h3>
          <p className="text-lg text-gray-600 mt-2">
            Fine-tune typography with advanced options like font family, weight,
            base size, and line height. Tailor headings (H1-H6) and body text
            for a cohesive and professional look. Pro users can save these
            settings, making it easier to maintain brand consistency across
            projects.
          </p>
        </div>

        <div className="bg-primary-100 p-5 rounded-3xl">
          <h3 className="text-xl font-semibold text-gray-800 leading-7">
            Figma Integration for Pro Users
          </h3>
          <p className="text-lg text-gray-600 mt-2">
            Seamlessly integrate your saved color palettes and typography
            settings with Figma using our exclusive plugin. This feature enables
            pro users to quickly apply saved styles, improving design efficiency
            and maintaining consistency across projects without extra manual
            work.
          </p>
        </div>
      </div>
    </section>
  );
}
