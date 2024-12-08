import { useColorTooltip } from "@/src/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";
import { Star } from "lucide-react";

export default function TestimonialsSection({
  primaryShades = [],
  secondaryShades = [],
}) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getPrimaryShade = (shade) =>
    primaryShades?.find((s) => s.shade === shade)?.hex;
  const getSecondaryShade = (shade) =>
    secondaryShades?.find((s) => s.shade === shade)?.hex;

  const testimonials = [
    {
      avatar: "https://i.pravatar.cc/100?img=1",
      name: "Sarah Chen",
      role: "Design Systems Lead",
      company: "TechCorp",
      content:
        "This color system has transformed how we manage our design tokens. The integration with our tools is seamless.",
      rating: 5,
    },
    {
      avatar: "https://i.pravatar.cc/100?img=2",
      name: "Marcus Rodriguez",
      role: "Senior Developer",
      company: "DevStudio",
      content:
        "The accessibility features are game-changing. We've reduced our color-related accessibility issues by 90%.",
      rating: 5,
    },
    {
      avatar: "https://i.pravatar.cc/100?img=3",
      name: "Emma Thompson",
      role: "Product Designer",
      company: "CreativeFlow",
      content:
        "Finally, a color management tool that speaks both design and development languages. Absolutely essential.",
      rating: 5,
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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div
          className="p-8 md:p-16 relative"
          style={{
            background: `linear-gradient(135deg, ${getPrimaryShade(
              50
            )}, ${getSecondaryShade(50)})`,
          }}
          onMouseEnter={(e) => {
            handleColorHover("50-50", "gradient", e, {
              colorName: "primary → secondary",
              hex: `${getPrimaryShade(50)} → ${getSecondaryShade(50)}`,
            });
          }}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6"
              style={{
                backgroundColor: `${getSecondaryShade(100)}CC`,
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                handleColorHover(100, "background", e, {
                  colorName: "secondary",
                  hex: getSecondaryShade(100),
                });
              }}
              onMouseLeave={handleMouseLeave}
            >
              <span
                style={{ color: getSecondaryShade(700) }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  handleColorHover(700, "text", e, {
                    colorName: "secondary",
                    hex: getSecondaryShade(700),
                  });
                }}
                onMouseLeave={handleMouseLeave}
              >
                Testimonials
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: getPrimaryShade(900) }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                handleColorHover(900, "text", e, {
                  colorName: "primary",
                  hex: getPrimaryShade(900),
                });
              }}
              onMouseLeave={handleMouseLeave}
            >
              Loved by designers and developers
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative group rounded-2xl p-8 transition-all hover:shadow-xl backdrop-blur-sm"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${getSecondaryShade(200)}`,
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  handleColorHover(200, "border", e, {
                    colorName: "secondary",
                    hex: getSecondaryShade(200),
                  });
                }}
                onMouseLeave={handleMouseLeave}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={getSecondaryShade(500)}
                      color={getSecondaryShade(500)}
                      className="cursor-pointer"
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        handleColorHover(500, "color", e, {
                          colorName: "secondary",
                          hex: getSecondaryShade(500),
                        });
                      }}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>

                {/* Content */}
                <p
                  className="mb-6 text-lg"
                  style={{ color: getPrimaryShade(700) }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleColorHover(700, "text", e, {
                      colorName: "primary",
                      hex: getPrimaryShade(700),
                    });
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ color: getPrimaryShade(900) }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        handleColorHover(900, "text", e, {
                          colorName: "primary",
                          hex: getPrimaryShade(900),
                        });
                      }}
                      onMouseLeave={handleMouseLeave}
                    >
                      {testimonial.name}
                    </h4>
                    <div
                      className="text-sm"
                      style={{ color: getPrimaryShade(600) }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        handleColorHover(600, "text", e, {
                          colorName: "primary",
                          hex: getPrimaryShade(600),
                        });
                      }}
                      onMouseLeave={handleMouseLeave}
                    >
                      {testimonial.role} · {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
