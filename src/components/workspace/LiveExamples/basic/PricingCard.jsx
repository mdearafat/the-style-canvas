import { Check } from "lucide-react";
import { useColorTooltip } from "@/src/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";

export default function PricingCard({ colorShades }) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getShade = (shade) => colorShades.find((s) => s.shade === shade)?.hex;

  const features = [
    "Unlimited projects",
    "Priority support",
    "Custom domains",
    "Analytics dashboard",
    "Team collaboration",
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

      <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
        <div
          className="p-8"
          style={{ backgroundColor: getShade(50) }}
          onMouseEnter={(e) =>
            handleColorHover(50, "background", e, {
              colorName: "primary",
              hex: getShade(50),
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
            style={{
              backgroundColor: getShade(100),
              color: getShade(700),
            }}
            onMouseEnter={(e) =>
              handleColorHover(100, "background", e, {
                colorName: "primary",
                hex: getShade(100),
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            Pro Plan
          </div>

          <div className="flex items-baseline gap-1">
            <span
              className="text-4xl font-bold"
              style={{ color: getShade(900) }}
              onMouseEnter={(e) =>
                handleColorHover(900, "text", e, {
                  colorName: "primary",
                  hex: getShade(900),
                })
              }
              onMouseLeave={handleMouseLeave}
            >
              $49
            </span>
            <span className="text-gray-600">/month</span>
          </div>
        </div>

        <div className="p-8">
          <p className="text-gray-600 mb-6">
            Perfect for growing businesses and teams.
          </p>

          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: getShade(100) }}
                  onMouseEnter={(e) =>
                    handleColorHover(100, "background", e, {
                      colorName: "primary",
                      hex: getShade(100),
                    })
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <Check className="w-3 h-3" style={{ color: getShade(600) }} />
                </div>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            className="w-full py-3 rounded-xl font-medium transition-colors"
            style={{
              backgroundColor: getShade(600),
              color: "white",
            }}
            onMouseEnter={(e) => {
              handleColorHover(600, "background", e, {
                colorName: "primary",
                hex: getShade(600),
              });
              e.currentTarget.style.backgroundColor = getShade(700);
            }}
            onMouseLeave={(e) => {
              handleMouseLeave();
              e.currentTarget.style.backgroundColor = getShade(600);
            }}
          >
            Get Started
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
