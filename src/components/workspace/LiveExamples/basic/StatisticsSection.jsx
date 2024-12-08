import { Users, Clock, Trophy, Zap } from "lucide-react";
import { useColorTooltip } from "@/src/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";

export default function StatisticsSection({ colorShades }) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getShade = (shade) => colorShades.find((s) => s.shade === shade)?.hex;

  const stats = [
    {
      icon: Users,
      label: "Active Users",
      value: "50K+",
      description: "Monthly active users",
    },
    {
      icon: Clock,
      label: "Time Saved",
      value: "120K",
      description: "Hours per month",
    },
    {
      icon: Trophy,
      label: "Awards",
      value: "150+",
      description: "Industry recognition",
    },
    {
      icon: Zap,
      label: "Fast Setup",
      value: "24h",
      description: "Average onboarding",
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

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: getShade(900) }}
            onMouseEnter={(e) =>
              handleColorHover(900, "text", e, {
                colorName: "primary",
                hex: getShade(900),
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            Trusted by thousands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the thousands of teams worldwide that are using our platform to
            scale their businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div
                className="absolute inset-0 rounded-xl transition-colors"
                style={{ backgroundColor: getShade(50) }}
                onMouseEnter={(e) =>
                  handleColorHover(50, "background", e, {
                    colorName: "primary",
                    hex: getShade(50),
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
              <div className="relative p-6">
                <div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{ backgroundColor: getShade(100) }}
                  onMouseEnter={(e) =>
                    handleColorHover(100, "background", e, {
                      colorName: "primary",
                      hex: getShade(100),
                    })
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <stat.icon
                    className="w-6 h-6"
                    style={{ color: getShade(600) }}
                  />
                </div>
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: getShade(900) }}
                  onMouseEnter={(e) =>
                    handleColorHover(900, "text", e, {
                      colorName: "primary",
                      hex: getShade(900),
                    })
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  <div className="font-medium">{stat.label}</div>
                  <div className="text-sm">{stat.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
