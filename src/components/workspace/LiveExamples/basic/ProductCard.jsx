import { Star, ShoppingCart } from "lucide-react";
import { useColorTooltip } from "@/src/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";

export default function ProductCard({ colorShades }) {
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

      <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
        <div className="relative">
          <div
            className="w-full h-48"
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
              alt="Product Image"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full text-white"
            style={{ backgroundColor: getShade(500) }}
            onMouseEnter={(e) =>
              handleColorHover(500, "background", e, {
                colorName: "primary",
                hex: getShade(500),
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            New
          </span>
        </div>
        <div className="p-4">
          <h2
            className="text-xl font-semibold mb-2"
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
          </h2>
          <p className="text-gray-600 mb-4">
            High-quality wireless headphones with noise cancellation
          </p>
          <div className="flex items-center mb-4">
            <div
              className="flex mr-2"
              onMouseEnter={(e) =>
                handleColorHover(400, "background", e, {
                  colorName: "primary",
                  hex: getShade(400),
                })
              }
              onMouseLeave={handleMouseLeave}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5"
                  style={{
                    fill: getShade(400),
                    color: getShade(400),
                  }}
                />
              ))}
            </div>
            <span className="text-gray-600">(4.5/5)</span>
          </div>
          <div className="flex justify-between items-center">
            <span
              className="text-2xl font-bold"
              style={{ color: getShade(900) }}
              onMouseEnter={(e) =>
                handleColorHover(900, "text", e, {
                  colorName: "primary",
                  hex: getShade(900),
                })
              }
              onMouseLeave={handleMouseLeave}
            >
              $299
            </span>
            <button
              className="flex items-center px-4 py-2 rounded-lg text-white transition-colors"
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
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
