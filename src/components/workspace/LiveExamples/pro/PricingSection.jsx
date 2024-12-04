import { useColorTooltip } from "@/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";
import { Check } from "lucide-react";

export default function PricingSection({
  primaryShades = [],
  secondaryShades = [],
}) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getPrimaryShade = (shade) =>
    primaryShades?.find((s) => s.shade === shade)?.hex;
  const getSecondaryShade = (shade) =>
    secondaryShades?.find((s) => s.shade === shade)?.hex;

  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out our color system",
      features: [
        "Basic color palette generation",
        "Simple export options",
        "Community support",
        "Basic documentation",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Everything you need for professional color management",
      features: [
        "Advanced color generation",
        "Multiple palette management",
        "Export to any format",
        "Priority support",
        "Advanced documentation",
        "Team collaboration",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large teams with custom needs",
      features: [
        "Custom color rules",
        "Dedicated support",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee",
        "Training sessions",
      ],
      popular: false,
    },
  ];

  return (
    <div className="relative color-tooltip-container w-full">
      {tooltipInfo && (
        <ColorTooltip
          shade={tooltipInfo.shade}
          colorInfo={tooltipInfo.colorInfo}
          type={tooltipInfo.type}
          style={{
            position: "absolute",
            top: tooltipInfo.position.top - 40,
            left: tooltipInfo.position.left,
            transform: "translateX(-50%)",
          }}
        />
      )}

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: getPrimaryShade(950),
          boxShadow: `0 0 0 1px ${getPrimaryShade(900)}`,
        }}
        onMouseEnter={(e) => {
          handleColorHover(950, "background", e, {
            colorName: "primary",
            hex: getPrimaryShade(950),
          });
        }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-8 md:p-16">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6"
              style={{
                backgroundColor: getSecondaryShade(500),
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                handleColorHover(500, "background", e, {
                  colorName: "secondary",
                  hex: getSecondaryShade(500),
                });
              }}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-white">Pricing</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: getPrimaryShade(900) }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                handleColorHover(900, "text", e, {
                  colorName: "primary",
                  hex: getPrimaryShade(900),
                });
              }}
              onMouseLeave={handleMouseLeave}
            >
              Choose your plan
            </h2>
            <p
              className="text-lg"
              style={{ color: getPrimaryShade(400) }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                handleColorHover(400, "text", e, {
                  colorName: "primary",
                  hex: getPrimaryShade(400),
                });
              }}
              onMouseLeave={handleMouseLeave}
            >
              Start free and scale as you grow
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl p-8 transition-transform hover:-translate-y-1 ${
                  plan.popular ? "ring-2" : ""
                }`}
                style={{
                  backgroundColor: getPrimaryShade(900),
                  borderColor: plan.popular
                    ? getSecondaryShade(500)
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  handleColorHover(900, "background", e, {
                    colorName: "primary",
                    hex: getPrimaryShade(900),
                  });
                }}
                onMouseLeave={handleMouseLeave}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: getSecondaryShade(500) }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleColorHover(500, "background", e, {
                        colorName: "secondary",
                        hex: getSecondaryShade(500),
                      });
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="text-white">Most Popular</span>
                  </div>
                )}

                <div className="mb-8">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: getPrimaryShade(50) }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleColorHover(50, "text", e, {
                        colorName: "primary",
                        hex: getPrimaryShade(50),
                      });
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: getPrimaryShade(50) }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        handleColorHover(50, "text", e, {
                          colorName: "primary",
                          hex: getPrimaryShade(50),
                        });
                      }}
                      onMouseLeave={handleMouseLeave}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        style={{ color: getPrimaryShade(400) }}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          handleColorHover(400, "text", e, {
                            colorName: "primary",
                            hex: getPrimaryShade(400),
                          });
                        }}
                        onMouseLeave={handleMouseLeave}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p
                    className="mt-2"
                    style={{ color: getPrimaryShade(400) }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleColorHover(400, "text", e, {
                        colorName: "primary",
                        hex: getPrimaryShade(400),
                      });
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check
                        size={16}
                        style={{ color: getSecondaryShade(500) }}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          handleColorHover(500, "color", e, {
                            colorName: "secondary",
                            hex: getSecondaryShade(500),
                          });
                        }}
                        onMouseLeave={handleMouseLeave}
                      />
                      <span
                        style={{ color: getPrimaryShade(300) }}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          handleColorHover(300, "text", e, {
                            colorName: "primary",
                            hex: getPrimaryShade(300),
                          });
                        }}
                        onMouseLeave={handleMouseLeave}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-3 px-6 rounded-lg font-medium transition-all"
                  style={{
                    backgroundColor: plan.popular
                      ? getSecondaryShade(500)
                      : "transparent",
                    border: `2px solid ${getSecondaryShade(500)}`,
                    color: plan.popular ? "white" : getSecondaryShade(500),
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleColorHover(
                      500,
                      plan.popular ? "background" : "border",
                      e,
                      {
                        colorName: "secondary",
                        hex: getSecondaryShade(500),
                      }
                    );
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
