export default function ProductCard({ colorShades }) {
  const getShadeByNumber = (shadeNumber) => {
    return colorShades.find((shade) => shade.shade === shadeNumber)?.hex || '';
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
      <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
        alt="Product Image"
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      <h3 className="text-lg font-semibold text-gray-800">
        Wireless Headphones
      </h3>

      <p className="text-gray-600 mt-2">
        Premium wireless headphones with noise cancellation and superior sound
        quality.
      </p>

      <div className="mt-4">
        <span className="text-xl font-semibold text-gray-900">$299.99</span>
      </div>

      <button
        className="w-full text-white py-2 px-4 rounded-lg mt-4 transition-colors"
        style={{
          backgroundColor: getShadeByNumber(600),
          ':hover': { backgroundColor: getShadeByNumber(700) },
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
