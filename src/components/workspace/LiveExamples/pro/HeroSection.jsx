import { useColorTooltip } from "@/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";

export default function HeroSection({
  primaryShades = [],
  secondaryShades = [],
}) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getPrimaryShade = (shade) =>
    primaryShades?.find((s) => s.shade === shade)?.hex;
  const getSecondaryShade = (shade) =>
    secondaryShades?.find((s) => s.shade === shade)?.hex;

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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Hero Container */}
        <div className="relative min-h-[600px]">
          {/* Background Elements */}
          <div className="absolute inset-0 flex flex-col md:flex-row">
            {/* Gradient background */}
            <div className="relative w-full md:w-3/5 h-full">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${getPrimaryShade(
                    50
                  )} 0%, ${getSecondaryShade(100)} 100%)`,
                }}
              />
            </div>
            {/* Image section */}
            <div
              className="hidden md:block w-2/5 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop")',
                opacity: 0.9,
              }}
            />
          </div>

          {/* Content */}
          <div
            className="relative px-6 py-12 md:px-16 md:py-32 h-full"
            onMouseEnter={(e) => {
              handleColorHover("50-100", "gradient", e, {
                colorName: "primary → secondary",
                hex: `${getPrimaryShade(50)} → ${getSecondaryShade(100)}`,
              });
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-4xl">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6 md:mb-8 backdrop-blur-sm"
                style={{
                  backgroundColor: `${getSecondaryShade(100)}CC`,
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  handleColorHover(100, "background", e, {
                    colorName: "secondary",
                    hex: getSecondaryShade(100),
                  });
                }}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getSecondaryShade(500) }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleColorHover(500, "background", e, {
                      colorName: "secondary",
                      hex: getSecondaryShade(500),
                    });
                  }}
                  onMouseLeave={handleMouseLeave}
                />
                <span
                  style={{ color: getSecondaryShade(700) }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleColorHover(700, "text", e, {
                      colorName: "secondary",
                      hex: getSecondaryShade(700),
                    });
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  Color System 2.0
                </span>
              </div>

              {/* Main Content Container */}
              <div
                className="space-y-6 max-w-xl backdrop-blur-sm bg-white/30 p-6 md:p-8 rounded-2xl"
                onMouseEnter={(e) => e.stopPropagation()}
              >
                <h1
                  className="text-3xl md:text-5xl font-bold leading-tight"
                  style={{ color: getPrimaryShade(900) }}
                  onMouseEnter={(e) =>
                    handleColorHover(900, "text", e, {
                      colorName: "primary",
                      hex: getPrimaryShade(900),
                    })
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  Design with Purpose and Precision
                </h1>

                <p
                  className="text-base md:text-xl"
                  style={{ color: getPrimaryShade(700) }}
                  onMouseEnter={(e) =>
                    handleColorHover(700, "text", e, {
                      colorName: "primary",
                      hex: getPrimaryShade(700),
                    })
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  Elevate your design system with our intelligent color
                  management. Create cohesive, accessible, and beautiful
                  interfaces that scale.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {/* Primary CTA */}
                  <div
                    className="group px-6 py-3 rounded-lg font-medium transition-all text-center"
                    style={{
                      background: `linear-gradient(135deg, ${getPrimaryShade(
                        600
                      )}, ${getPrimaryShade(700)})`,
                      boxShadow: `0 8px 24px -4px ${getPrimaryShade(500)}66`,
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleColorHover("600-700", "gradient", e, {
                        colorName: "primary",
                        hex: `${getPrimaryShade(600)} → ${getPrimaryShade(
                          700
                        )}`,
                      });
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="text-white">Get Started Free</span>
                  </div>

                  {/* Secondary CTA */}
                  <div
                    className="group px-6 py-3 rounded-lg font-medium transition-all backdrop-blur-sm text-center"
                    style={{
                      backgroundColor: "white",
                      border: `2px solid ${getSecondaryShade(200)}`,
                    }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      handleColorHover(200, "border", e, {
                        colorName: "secondary",
                        hex: getSecondaryShade(200),
                      });
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      style={{ color: getSecondaryShade(700) }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        handleColorHover(700, "text", e, {
                          colorName: "secondary",
                          hex: getSecondaryShade(700),
                        });
                      }}
                      onMouseLeave={handleMouseLeave}
                    >
                      Watch Demo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
