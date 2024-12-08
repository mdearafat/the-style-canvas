export default function ColorTooltip({
  shade,
  colorInfo,
  type = "text",
  style = {},
}) {
  return (
    <div
      className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm shadow-lg whitespace-nowrap z-50"
      style={style}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-4 rounded"
          style={{ backgroundColor: colorInfo.hex }}
        />
        <span className="font-medium text-gray-800">
          {colorInfo.colorName} {shade}
        </span>
        <span className="text-gray-500">• {type}</span>
      </div>
    </div>
  );
}
