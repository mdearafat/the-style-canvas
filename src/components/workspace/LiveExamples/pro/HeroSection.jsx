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

      {/* Hero content here */}
    </div>
  );
}
