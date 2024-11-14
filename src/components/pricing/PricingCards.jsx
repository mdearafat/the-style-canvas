export default function PricingCards() {
  return (
    <section>
      <div className="container max-w-screen-xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-800">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 mt-4">
            Pick the perfect plan for your needs. Whether you're just getting
            started or need advanced features, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="border border-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-200">
            <h3 class="text-2xl font-semibold text-primary-800">Free</h3>
            <p class="text-gray-600 mt-4 mb-6">
              Perfect for individuals who are just getting started with design.
            </p>
            <div class="text-4xl font-bold text-gray-800 mb-4">$0</div>
            <p class="text-sm text-gray-600 mb-6">Billed Monthly</p>

            <ul class="text-gray-600 space-y-4 mb-6">
              <li>Basic Color Palette</li>
              <li>Basic Typography Settings</li>
              <li>Real-Time Previews</li>
            </ul>

            <a
              href="#"
              class="block text-center bg-primary-600 text-white py-3 px-6 rounded-full hover:bg-primary-700"
            >
              Get Started
            </a>
          </div>

          {/* Pro Plan */}
          <div className="border border-primary-500 bg-primary-50 rounded-lg p-8 shadow-md hover:shadow-lg transition duration-200">
            <h3 class="text-2xl font-semibold text-primary-800">Pro</h3>
            <p class="text-gray-600 mt-4 mb-6">
              For professionals who need more advanced features and flexibility.
            </p>
            <div class="text-4xl font-bold text-gray-800 mb-4">$5</div>
            <p class="text-sm text-gray-600 mb-6">Billed Monthly</p>

            <ul class="text-gray-600 space-y-4 mb-6">
              <li>Advanced Color Palettes</li>
              <li>Custom Typography</li>
              <li>Figma Plugin Integration</li>
              <li>Real-Time Pro Previews</li>
              <li>Priority Support</li>
            </ul>

            <a
              href="#"
              class="block text-center bg-primary-600 text-white py-3 px-6 rounded-full hover:bg-primary-700"
            >
              Go Pro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
