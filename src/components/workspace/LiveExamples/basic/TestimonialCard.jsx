import { Quote } from "lucide-react";
import { useColorTooltip } from "@/src/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";

export default function TestimonialCard({ colorShades }) {
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

      <div className="rounded-2xl overflow-hidden bg-white shadow-md">
        <div
          className="h-24 relative"
          style={{
            background: `linear-gradient(to right, ${getShade(400)}, ${getShade(
              500
            )})`,
          }}
          onMouseEnter={(e) =>
            handleColorHover("400-500", "background", e, {
              colorName: "primary",
              hex: getShade(400),
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl shadow-lg bg-cover bg-center border-4 border-white"
            style={{
              backgroundImage: "url(https://placehold.co/200x200)",
            }}
          />
        </div>

        <div className="pt-10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4
                className="font-semibold text-lg"
                style={{ color: getShade(900) }}
                onMouseEnter={(e) =>
                  handleColorHover(900, "text", e, {
                    colorName: "primary",
                    hex: getShade(900),
                  })
                }
                onMouseLeave={handleMouseLeave}
              >
                Sarah Johnson
              </h4>
              <p className="text-gray-600">Design Lead, Acme Inc</p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center opacity-75"
              style={{ backgroundColor: getShade(100) }}
              onMouseEnter={(e) =>
                handleColorHover(100, "background", e, {
                  colorName: "primary",
                  hex: getShade(100),
                })
              }
              onMouseLeave={handleMouseLeave}
            >
              <Quote className="w-5 h-5" style={{ color: getShade(600) }} />
            </div>
          </div>

          <div
            className="p-4 rounded-xl mb-4"
            style={{ backgroundColor: getShade(50) }}
            onMouseEnter={(e) =>
              handleColorHover(50, "background", e, {
                colorName: "primary",
                hex: getShade(50),
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            <p className="text-gray-600 leading-relaxed">
              "This product has completely transformed how I work. The interface
              is intuitive, and the features are exactly what I needed for my
              daily workflow."
            </p>
          </div>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-1.5 rounded-full"
                style={{
                  backgroundColor: i < 4 ? getShade(400) : getShade(100),
                }}
                onMouseEnter={(e) =>
                  handleColorHover(i < 4 ? 400 : 100, "background", e, {
                    colorName: "primary",
                    hex: getShade(i < 4 ? 400 : 100),
                  })
                }
                onMouseLeave={handleMouseLeave}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
