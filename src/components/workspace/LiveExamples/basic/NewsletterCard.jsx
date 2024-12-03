import { Send } from "lucide-react";
import { useColorTooltip } from "@/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";

export default function NewsletterCard({ colorShades }) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getShade = (shade) => colorShades.find((s) => s.shade === shade)?.hex;

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: getShade(900) }}
                onMouseEnter={(e) =>
                  handleColorHover(900, "text", e, {
                    colorName: "primary",
                    hex: getShade(900),
                  })
                }
                onMouseLeave={handleMouseLeave}
              >
                Stay Updated
              </h3>
              <p className="text-gray-600">
                Get the latest updates straight to your inbox.
              </p>
            </div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: getShade(100) }}
              onMouseEnter={(e) =>
                handleColorHover(100, "background", e, {
                  colorName: "primary",
                  hex: getShade(100),
                })
              }
              onMouseLeave={handleMouseLeave}
            >
              <Send className="w-6 h-6" style={{ color: getShade(600) }} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 transition-shadow"
                style={{
                  focusBorderColor: getShade(500),
                  focusRingColor: `${getShade(500)}20`,
                }}
              />
            </div>

            <div className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded flex items-center justify-center mt-0.5 cursor-pointer"
                style={{
                  backgroundColor: getShade(100),
                  border: `2px solid ${getShade(200)}`,
                }}
                onMouseEnter={(e) =>
                  handleColorHover(100, "background", e, {
                    colorName: "primary",
                    hex: getShade(100),
                  })
                }
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: getShade(600) }}
                />
              </div>
              <label className="text-sm text-gray-600 cursor-pointer">
                I agree to receive newsletters and accept the data privacy
                statement.
              </label>
            </div>

            <button
              className="w-full py-2.5 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: getShade(600) }}
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
              Subscribe Now
            </button>

            <p className="text-center text-sm text-gray-500">
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
