"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { Lock } from "lucide-react";
import ButtonShowcase from "./basic/ButtonShowcase";
import ProductCard from "./basic/ProductCard";
import TestimonialCard from "./basic/TestimonialCard";
import PricingCard from "./basic/PricingCard";
import StatisticsSection from "./basic/StatisticsSection";
import NewsletterCard from "./basic/NewsletterCard";
import ContactCard from "./basic/ContactCard";
import HeroSection from "./pro/HeroSection";
import FeaturesSection from "./pro/FeaturesSection";
import TestimonialsSection from "./pro/TestimonialsSection";
import PricingSection from "./pro/PricingSection";
import TeamSection from "./pro/TeamSection";
import ProFeatureModal from "@/src/components/common/ProFeatureModal";

const SimpleNotification = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md animate-slide-in">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function LiveExamples({ colorShades = [], secondaryShades }) {
  const [activeTab, setActiveTab] = useState("basic");
  const { isProUser } = useAuth();
  const [showProModal, setShowProModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Effect to switch to basic tab when secondary color is removed
  useEffect(() => {
    if (!secondaryShades?.length && activeTab === "pro") {
      setActiveTab("basic");
    }
  }, [secondaryShades, activeTab]);

  const handleProTab = () => {
    if (!isProUser) {
      setShowProModal(true);
      return;
    }
    if (!secondaryShades?.length) {
      setShowNotification(true);
      // Auto hide after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    setActiveTab("pro");
  };

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
            className={`px-4 py-2 rounded-lg font-medium transition-colors
              ${
                activeTab === "basic"
                  ? "bg-primary-600 text-white"
                  : "border border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white"
              }`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Examples
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
              ${
                activeTab === "pro" && secondaryShades?.length
                  ? "bg-primary-600 text-white"
                  : "border border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white"
              }`}
            onClick={handleProTab}
            title={
              !isProUser
                ? "Pro feature: Advanced examples"
                : !secondaryShades?.length
                ? "Add a secondary color to view pro examples"
                : "View pro examples"
            }
          >
            Pro Examples
            {!isProUser && <Lock className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Examples Content */}
      <div className="space-y-8">
        {activeTab === "basic" ? (
          <>
            <div className="space-y-8">
              <ButtonShowcase colorShades={colorShades} />
              <StatisticsSection colorShades={colorShades} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ProductCard colorShades={colorShades} />
              <TestimonialCard colorShades={colorShades} />
              <PricingCard colorShades={colorShades} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <NewsletterCard colorShades={colorShades} />
              <ContactCard colorShades={colorShades} />
            </div>
          </>
        ) : (
          <div className="space-y-12">
            <HeroSection
              primaryShades={colorShades}
              secondaryShades={secondaryShades}
            />
            <FeaturesSection
              primaryShades={colorShades}
              secondaryShades={secondaryShades}
            />
            <TestimonialsSection
              primaryShades={colorShades}
              secondaryShades={secondaryShades}
            />
            <PricingSection
              primaryShades={colorShades}
              secondaryShades={secondaryShades}
            />
            <TeamSection
              primaryShades={colorShades}
              secondaryShades={secondaryShades}
            />
          </div>
        )}
      </div>

      {/* Pro Modal only for non-pro users */}
      <ProFeatureModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        featureName="Pro Examples"
      />

      {/* Simple notification for pro users */}
      <SimpleNotification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        message="Please add a secondary color to view pro examples"
      />
    </section>
  );
}
