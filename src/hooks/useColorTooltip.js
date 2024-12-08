import { useState } from "react";

export function useColorTooltip() {
  const [tooltipInfo, setTooltipInfo] = useState(null);

  const handleColorHover = (shade, type, event, colorInfo) => {
    event.stopPropagation();
    const element = event.currentTarget;
    const parentRect = element
      .closest(".color-tooltip-container")
      .getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    setTooltipInfo({
      shade,
      type,
      colorInfo,
      position: {
        top: rect.top - parentRect.top,
        left: rect.left - parentRect.left + rect.width / 2,
      },
    });
  };

  const handleMouseLeave = () => {
    setTooltipInfo(null);
  };

  return { tooltipInfo, handleColorHover, handleMouseLeave };
}
