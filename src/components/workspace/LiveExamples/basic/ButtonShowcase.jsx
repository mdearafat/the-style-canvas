import { useColorTooltip } from "@/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";

export default function ButtonShowcase({ colorShades }) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getShade = (shade) => colorShades.find((s) => s.shade === shade)?.hex;

  const buttonStates = ["Default", "Hover", "Active", "Disabled"];
  const buttonStyles = [
    {
      title: "Buttons · Flat",
      type: "flat",
      getStyles: (state) => ({
        backgroundColor:
          state === "Disabled"
            ? getShade(200)
            : getShade(
                state === "Active" ? 700 : state === "Hover" ? 600 : 500
              ),
        color: "white",
        opacity: state === "Disabled" ? 0.5 : 1,
      }),
    },
    {
      title: "Buttons · Outline",
      type: "outline",
      getStyles: (state) => ({
        backgroundColor: state === "Hover" ? getShade(50) : "transparent",
        color: state === "Disabled" ? getShade(300) : getShade(500),
        border: `2px solid ${
          state === "Disabled" ? getShade(200) : getShade(500)
        }`,
        opacity: state === "Disabled" ? 0.5 : 1,
      }),
    },
    {
      title: "Buttons · Bezel",
      type: "bezel",
      getStyles: (state) => ({
        background:
          state === "Disabled"
            ? getShade(200)
            : `linear-gradient(to right, ${getShade(500)}, ${getShade(600)})`,
        color: "white",
        opacity: state === "Disabled" ? 0.5 : 1,
        boxShadow:
          state === "Active"
            ? "none"
            : state === "Disabled"
            ? "none"
            : "0 4px 12px rgba(0, 0, 0, 0.15)",
      }),
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {buttonStyles.map((style) => (
            <div key={style.type} className="space-y-4">
              <h3 className="font-medium text-gray-900 mb-6">{style.title}</h3>
              {buttonStates.map((state) => (
                <button
                  key={state}
                  className={`
                    w-full py-2.5 px-4 rounded-lg font-medium transition-all
                    ${
                      state === "Disabled"
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}
                  style={style.getStyles(state)}
                  disabled={state === "Disabled"}
                  onMouseEnter={(e) => {
                    if (state !== "Disabled") {
                      let shadeInfo =
                        style.type === "flat"
                          ? { shade: 500, type: "background" }
                          : style.type === "outline"
                          ? { shade: 500, type: "border" }
                          : { shade: "500-600", type: "gradient" };

                      handleColorHover(shadeInfo.shade, shadeInfo.type, e, {
                        colorName: "primary",
                        hex: getShade(500),
                      });
                    }
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  {state}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
