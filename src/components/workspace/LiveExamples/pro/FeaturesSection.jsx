import { useColorTooltip } from "@/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";
import { Zap, Shield, Palette, Layers } from "lucide-react";

export default function FeaturesSection({
  primaryShades = [],
  secondaryShades = [],
}) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getPrimaryShade = (shade) =>
    primaryShades?.find((s) => s.shade === shade)?.hex;
  const getSecondaryShade = (shade) =>
    secondaryShades?.find((s) => s.shade === shade)?.hex;

  const features = [
    {
      icon: Zap,
      title: "Intelligent Color Generation",
      description:
        "Generate harmonious color palettes with our smart algorithm",
    },
    {
      icon: Shield,
      title: "Accessibility Built-in",
      description: "Ensure WCAG compliance with automatic contrast checking",
    },
    {
      icon: Palette,
      title: "Advanced Color Tools",
      description: "Professional tools for perfect color management",
    },
    {
      icon: Layers,
      title: "Design System Ready",
      description: "Export tokens and styles for your favorite design tools",
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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div
          className="p-8 md:p-16 relative"
          style={{
            background: `linear-gradient(135deg, ${getPrimaryShade(
              50
            )} 0%, ${getSecondaryShade(50)} 100%)`,
          }}
          onMouseEnter={(e) => {
            handleColorHover("50-50", "gradient", e, {
              colorName: "primary → secondary",
              hex: `${getPrimaryShade(50)} → ${getSecondaryShade(50)}`,
            });
          }}
          onMouseLeave={handleMouseLeave}
        >
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6"
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
                Features
              </span>
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
              Everything you need to manage colors
            </h2>
            <p
              className="text-lg"
              style={{ color: getPrimaryShade(700) }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                handleColorHover(700, "text", e, {
                  colorName: "primary",
                  hex: getPrimaryShade(700),
                });
              }}
              onMouseLeave={handleMouseLeave}
            >
              Professional tools for designers and developers
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group p-8 rounded-2xl backdrop-blur-sm transition-all hover:shadow-xl"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${getSecondaryShade(200)}`,
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
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${getPrimaryShade(
                      500
                    )}, ${getSecondaryShade(500)})`,
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleColorHover("500-500", "gradient", e, {
                      colorName: "primary → secondary",
                      hex: `${getPrimaryShade(500)} → ${getSecondaryShade(
                        500
                      )}`,
                    });
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
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
                  {feature.title}
                </h3>
                <p
                  style={{ color: getPrimaryShade(600) }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleColorHover(600, "text", e, {
                      colorName: "primary",
                      hex: getPrimaryShade(600),
                    });
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
