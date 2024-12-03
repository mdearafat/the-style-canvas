import ColorTooltip from "../../ColorTooltip";
import { useColorTooltip } from "@/hooks/useColorTooltip";

export default function ProductCard({ colorShades }) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getShade = (shade) => colorShades.find((s) => s.shade === shade)?.hex;

  return (
    <div className="relative color-tooltip-container product-card">
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
        className="h-48 w-full"
        style={{ backgroundColor: getShade(100) }}
        onMouseEnter={(e) =>
          handleColorHover(100, "background", e, {
            colorName: "primary",
            hex: getShade(100),
          })
        }
        onMouseLeave={handleMouseLeave}
      >
        <img
          src="https://placehold.co/600x400"
          alt="Product"
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div className="p-6">
        <span
          className="text-sm font-medium px-3 py-1 rounded-full inline-block"
          style={{
            backgroundColor: getShade(100),
            color: getShade(700),
          }}
          onMouseEnter={(e) =>
            handleColorHover(700, "text", e, {
              colorName: "primary",
              hex: getShade(700),
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          New Arrival
        </span>
        <h3
          className="mt-4 text-xl font-semibold"
          style={{ color: getShade(900) }}
          onMouseEnter={(e) =>
            handleColorHover(900, "text", e, {
              colorName: "primary",
              hex: getShade(900),
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          Premium Headphones
        </h3>
        <p
          className="mt-2"
          style={{ color: getShade(600) }}
          onMouseEnter={(e) =>
            handleColorHover(600, "text", e, {
              colorName: "primary",
              hex: getShade(600),
            })
          }
          onMouseLeave={handleMouseLeave}
        >
          High-quality wireless headphones with noise cancellation
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span
            className="text-2xl font-bold"
            style={{ color: getShade(800) }}
            onMouseEnter={(e) =>
              handleColorHover(800, "text", e, {
                colorName: "primary",
                hex: getShade(800),
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            $299
          </span>
          <button
            className="px-4 py-2 rounded-lg text-white transition-colors"
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
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
