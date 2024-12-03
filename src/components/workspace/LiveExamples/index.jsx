import { useState } from "react";
import { Lock } from "lucide-react";
import ProductCard from "./basic/ProductCard";
import TestimonialCard from "./basic/TestimonialCard";
import PricingCard from "./basic/PricingCard";
import StatisticsSection from "./basic/StatisticsSection";
import NewsletterCard from "./basic/NewsletterCard";
import ContactCard from "./basic/ContactCard";
import ButtonShowcase from "./basic/ButtonShowcase";
import HeroSection from "./pro/HeroSection";
import DualToneCard from "./pro/DualToneCard";

export default function LiveExamples({ colorShades, secondaryShades }) {
  const [activeTab, setActiveTab] = useState("basic");
  const getShade = (shade) => colorShades.find((s) => s.shade === shade)?.hex;

  return (
    <section className="max-w-screen-xl mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Examples</h2>
        <p className="text-gray-600 mb-6">
          See how your colors look in real-time with these example components
        </p>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "basic"
                ? "text-white"
                : "text-gray-600 hover:text-white"
            }`}
            style={{
              backgroundColor:
                activeTab === "basic" ? getShade(600) : "transparent",
            }}
            onClick={() => setActiveTab("basic")}
          >
            Basic Examples
          </button>
          <button
            className="px-4 py-2 rounded-lg font-medium text-gray-600 cursor-not-allowed opacity-60"
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${getShade(200)}`,
            }}
            disabled
          >
            Pro Examples
          </button>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="space-y-8">
        {activeTab === "basic" ? (
          <>
            {/* Row 1: Full width components */}
            <div className="space-y-8">
              <ButtonShowcase colorShades={colorShades} />
              <StatisticsSection colorShades={colorShades} />
            </div>

            {/* Row 2: Three columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProductCard colorShades={colorShades} />
              <TestimonialCard colorShades={colorShades} />
              <PricingCard colorShades={colorShades} />
            </div>

            {/* Row 3: Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <NewsletterCard colorShades={colorShades} />
              <ContactCard colorShades={colorShades} />
            </div>
          </>
        ) : (
          <div className="relative">
            {/* Pro Lock Overlay */}
            <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[1px] rounded-2xl z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white rounded-full p-3 shadow-lg inline-block mb-4">
                  <Lock className="w-6 h-6 text-gray-900" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Pro Features
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Upgrade to access advanced color combinations and premium
                  components.
                </p>
              </div>
            </div>

            {/* Pro Components (blurred) */}
            <div className="space-y-8 filter blur-[1px]">
              {/* Row 1: Full width Hero */}
              <div className="w-full">
                <HeroSection
                  primaryShades={colorShades}
                  secondaryShades={secondaryShades}
                />
              </div>

              {/* Row 2: Two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DualToneCard
                  primaryShades={colorShades}
                  secondaryShades={secondaryShades}
                />
                {/* Add more pro components here */}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
