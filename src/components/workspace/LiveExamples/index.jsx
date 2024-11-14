import ProductCard from './ProductCard';

export default function LiveExamples({ colorShades }) {
  // Find specific shades for different UI elements
  const getShadeByNumber = (shadeNumber) => {
    return colorShades.find((shade) => shade.shade === shadeNumber)?.hex || '';
  };

  return (
    <section className="max-w-screen-xl container mx-auto py-5 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Live Examples</h2>
        <p className="text-gray-600 mt-2">
          See how it looks in real-world components
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center items-center mb-6">
        <button className="bg-primary-600 text-white py-2 px-6 rounded-t-lg font-semibold ">
          Basic Examples
        </button>
        <button className="bg-primary-200 text-gray-500 py-2 px-6 border-l-2 border-gray-300 rounded-t-lg font-semibold cursor-not-allowed opacity-80">
          Pro Examples <span className="ml-2">🔒</span>
        </button>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <ProductCard colorShades={colorShades} />
      </div>
    </section>
  );
}
