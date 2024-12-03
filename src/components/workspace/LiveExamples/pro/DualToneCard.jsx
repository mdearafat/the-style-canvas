import ColorTooltip from "../../ColorTooltip";
import { useColorTooltip } from "@/hooks/useColorTooltip";

export default function DualToneCard({ primaryShades, secondaryShades }) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();

  const getShade = (shades, shade) =>
    shades?.find((s) => s.shade === shade)?.hex;

  return (
    <div className="relative color-tooltip-container rounded-lg overflow-hidden shadow-lg">
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
        className="p-8"
        style={{ backgroundColor: getShade(primaryShades, 50) }}
        onMouseEnter={(e) =>
          handleColorHover(50, "background", e, {
            colorName: "primary",
            hex: getShade(primaryShades, 50),
          })
        }
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="text-3xl font-bold mb-4"
          style={{ color: getShade(primaryShades, 900) }}
          onMouseEnter={(e) =>
            handleColorHover(900, "text", e, {
              colorName: "primary",
              hex: getShade(primaryShades, 900),
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          Premium Plan
        </div>
        <div
          className="mb-6"
          style={{ color: getShade(primaryShades, 600) }}
          onMouseEnter={(e) =>
            handleColorHover(600, "text", e, {
              colorName: "primary",
              hex: getShade(primaryShades, 600),
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          Perfect for growing businesses
        </div>

        <div className="flex items-baseline gap-2 mb-6">
          <span
            className="text-4xl font-bold"
            style={{ color: getShade(primaryShades, 900) }}
            onMouseEnter={(e) =>
              handleColorHover(900, "text", e, {
                colorName: "primary",
                hex: getShade(primaryShades, 900),
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            $49
          </span>
          <span
            style={{ color: getShade(primaryShades, 600) }}
            onMouseEnter={(e) =>
              handleColorHover(600, "text", e, {
                colorName: "primary",
                hex: getShade(primaryShades, 600),
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            /month
          </span>
        </div>

        {secondaryShades && (
          <button
            className="w-full py-2 px-4 rounded-lg transition-colors"
            style={{
              backgroundColor: getShade(secondaryShades, 500),
              color: getShade(secondaryShades, 50),
            }}
            onMouseEnter={(e) => {
              handleColorHover(500, "background", e, {
                colorName: "secondary",
                hex: getShade(secondaryShades, 500),
              });
              e.currentTarget.style.backgroundColor = getShade(
                secondaryShades,
                600
              );
            }}
            onMouseLeave={(e) => {
              handleMouseLeave();
              e.currentTarget.style.backgroundColor = getShade(
                secondaryShades,
                500
              );
            }}
          >
            Get Started
          </button>
        )}

        {!secondaryShades && (
          <button
            className="w-full py-2 px-4 rounded-lg transition-colors"
            style={{
              backgroundColor: getShade(primaryShades, 600),
              color: "white",
            }}
            onMouseEnter={(e) => {
              handleColorHover(600, "background", e, {
                colorName: "primary",
                hex: getShade(primaryShades, 600),
              });
              e.currentTarget.style.backgroundColor = getShade(
                primaryShades,
                700
              );
            }}
            onMouseLeave={(e) => {
              handleMouseLeave();
              e.currentTarget.style.backgroundColor = getShade(
                primaryShades,
                600
              );
            }}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}
