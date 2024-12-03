import { useState } from "react";
import ProductCard from "./basic/ProductCard";
import TestimonialCard from "./basic/TestimonialCard";
import DualToneCard from "./pro/DualToneCard";
import HeroSection from "./pro/HeroSection";

export default function LiveExamples({ colorShades, secondaryShades }) {
  const [activeTab, setActiveTab] = useState("basic");

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
        <button
          onClick={() => setActiveTab("basic")}
          className={`py-2 px-6 rounded-t-lg font-semibold ${
            activeTab === "basic"
              ? "bg-primary-600 text-white"
              : "bg-primary-200 text-primary-700 hover:bg-primary-300"
          }`}
        >
          Basic Examples
        </button>
        <button
          onClick={() => secondaryShades && setActiveTab("pro")}
          className={`py-2 px-6 rounded-lg font-semibold flex items-center gap-2 ${
            !secondaryShades
              ? "bg-primary-200 text-primary-700 cursor-not-allowed opacity-80"
              : activeTab === "pro"
              ? "bg-primary-600 text-white"
              : "bg-primary-200 text-primary-700 hover:bg-primary-300"
          }`}
        >
          Pro Examples
          {!secondaryShades && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {activeTab === "basic" ? (
          <>
            <ProductCard colorShades={colorShades} />
            <TestimonialCard colorShades={colorShades} />
          </>
        ) : (
          <>
            <DualToneCard
              primaryShades={colorShades}
              secondaryShades={secondaryShades}
            />
            <HeroSection
              primaryShades={colorShades}
              secondaryShades={secondaryShades}
            />
          </>
        )}
      </div>
    </section>
  );
}
