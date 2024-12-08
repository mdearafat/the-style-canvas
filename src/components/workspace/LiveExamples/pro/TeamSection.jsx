import { useColorTooltip } from "@/src/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";
import {
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
  Mail,
  Calendar,
} from "lucide-react";

export default function TeamSection({
  primaryShades = [],
  secondaryShades = [],
}) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getPrimaryShade = (shade) =>
    primaryShades?.find((s) => s.shade === shade)?.hex;
  const getSecondaryShade = (shade) =>
    secondaryShades?.find((s) => s.shade === shade)?.hex;

  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80",
      social: { twitter: "#", github: "#", linkedin: "#" },
      stats: { messages: "2.4k", meetings: "140+" },
    },
    {
      name: "David Chen",
      role: "Lead Designer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
      social: { twitter: "#", github: "#", linkedin: "#" },
      stats: { messages: "1.8k", meetings: "120+" },
    },
    {
      name: "Sarah Williams",
      role: "Tech Lead",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
      social: { twitter: "#", github: "#", linkedin: "#" },
      stats: { messages: "3.2k", meetings: "180+" },
    },
    {
      name: "Michael Park",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
      social: { twitter: "#", github: "#", linkedin: "#" },
      stats: { messages: "2.1k", meetings: "160+" },
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
            zIndex: 50,
          }}
        />
      )}

      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: `linear-gradient(135deg, ${getPrimaryShade(
            50
          )}, ${getSecondaryShade(50)})`,
        }}
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const position = {
            top: rect.top + window.scrollY,
            left: rect.left + rect.width / 2,
          };
          handleColorHover(
            "50-50",
            "gradient",
            e,
            {
              colorName: "primary → secondary",
              hex: `${getPrimaryShade(50)} → ${getSecondaryShade(50)}`,
            },
            position
          );
        }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="p-8 md:p-16">
          {/* Header with decorative elements */}
          <div className="relative text-center max-w-2xl mx-auto mb-16">
            {/* Decorative circles */}
            <div
              className="absolute -top-8 -left-16 w-32 h-32 rounded-full blur-2xl opacity-20"
              style={{ backgroundColor: getSecondaryShade(300) }}
            />
            <div
              className="absolute -bottom-8 -right-16 w-32 h-32 rounded-full blur-2xl opacity-20"
              style={{ backgroundColor: getPrimaryShade(300) }}
            />

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{
                background: `linear-gradient(135deg, ${getSecondaryShade(
                  100
                )}, ${getPrimaryShade(100)})`,
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const position = {
                  top: rect.top + window.scrollY,
                  left: rect.left + rect.width / 2,
                };
                handleColorHover(
                  "100-100",
                  "gradient",
                  e,
                  {
                    colorName: "secondary → primary",
                    hex: `${getSecondaryShade(100)} → ${getPrimaryShade(100)}`,
                  },
                  position
                );
              }}
              onMouseLeave={handleMouseLeave}
            >
              <span
                style={{ color: getSecondaryShade(700) }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const position = {
                    top: rect.top + window.scrollY,
                    left: rect.left + rect.width / 2,
                  };
                  handleColorHover(
                    700,
                    "text",
                    e,
                    {
                      colorName: "secondary",
                      hex: getSecondaryShade(700),
                    },
                    position
                  );
                }}
                onMouseLeave={handleMouseLeave}
              >
                Meet Our Team
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: getPrimaryShade(900) }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const position = {
                  top: rect.top + window.scrollY,
                  left: rect.left + rect.width / 2,
                };
                handleColorHover(
                  900,
                  "text",
                  e,
                  {
                    colorName: "primary",
                    hex: getPrimaryShade(900),
                  },
                  position
                );
              }}
              onMouseLeave={handleMouseLeave}
            >
              The minds behind the magic
            </h2>
            <p
              className="text-lg"
              style={{ color: getPrimaryShade(600) }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                const rect = e.currentTarget.getBoundingClientRect();
                const position = {
                  top: rect.top + window.scrollY,
                  left: rect.left + rect.width / 2,
                };
                handleColorHover(
                  600,
                  "text",
                  e,
                  {
                    colorName: "primary",
                    hex: getPrimaryShade(600),
                  },
                  position
                );
              }}
              onMouseLeave={handleMouseLeave}
            >
              A diverse team of passionate individuals working to transform
              color management
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl p-4 transition-all hover:shadow-lg"
                style={{
                  border: `1px solid ${getPrimaryShade(200)}`,
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const position = {
                    top: rect.top + window.scrollY,
                    left: rect.left + rect.width / 2,
                  };
                  handleColorHover(
                    200,
                    "border",
                    e,
                    {
                      colorName: "primary",
                      hex: getPrimaryShade(200),
                    },
                    position
                  );
                }}
                onMouseLeave={handleMouseLeave}
              >
                {/* Image Container with gradient border */}
                <div
                  className="relative mb-4 rounded-lg p-1 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${getPrimaryShade(
                      500
                    )}, ${getSecondaryShade(500)})`,
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const position = {
                      top: rect.top + window.scrollY,
                      left: rect.left + rect.width / 2,
                    };
                    handleColorHover(
                      "500-500",
                      "gradient",
                      e,
                      {
                        colorName: "primary → secondary",
                        hex: `${getPrimaryShade(500)} → ${getSecondaryShade(
                          500
                        )}`,
                      },
                      position
                    );
                  }}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-4">
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ color: getPrimaryShade(900) }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      const position = {
                        top: rect.top + window.scrollY,
                        left: rect.left + rect.width / 2,
                      };
                      handleColorHover(
                        900,
                        "text",
                        e,
                        {
                          colorName: "primary",
                          hex: getPrimaryShade(900),
                        },
                        position
                      );
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: getSecondaryShade(600) }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      const position = {
                        top: rect.top + window.scrollY,
                        left: rect.left + rect.width / 2,
                      };
                      handleColorHover(
                        600,
                        "text",
                        e,
                        {
                          colorName: "secondary",
                          hex: getSecondaryShade(600),
                        },
                        position
                      );
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    {member.role}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <MessageCircle
                        size={16}
                        style={{ color: getSecondaryShade(500) }}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          const position = {
                            top: rect.top + window.scrollY,
                            left: rect.left + rect.width / 2,
                          };
                          handleColorHover(
                            500,
                            "color",
                            e,
                            {
                              colorName: "secondary",
                              hex: getSecondaryShade(500),
                            },
                            position
                          );
                        }}
                        onMouseLeave={handleMouseLeave}
                      />
                      <span
                        className="text-sm"
                        style={{ color: getPrimaryShade(600) }}
                      >
                        {member.stats.messages}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar
                        size={16}
                        style={{ color: getSecondaryShade(500) }}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          const position = {
                            top: rect.top + window.scrollY,
                            left: rect.left + rect.width / 2,
                          };
                          handleColorHover(
                            500,
                            "color",
                            e,
                            {
                              colorName: "secondary",
                              hex: getSecondaryShade(500),
                            },
                            position
                          );
                        }}
                        onMouseLeave={handleMouseLeave}
                      />
                      <span
                        className="text-sm"
                        style={{ color: getPrimaryShade(600) }}
                      >
                        {member.stats.meetings}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {Object.entries(member.social).map(([platform, link]) => {
                    const Icon = {
                      twitter: Twitter,
                      github: Github,
                      linkedin: Linkedin,
                    }[platform];
                    return (
                      <a
                        key={platform}
                        href={link}
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: getPrimaryShade(100),
                        }}
                        onMouseEnter={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          const position = {
                            top: rect.top + window.scrollY,
                            left: rect.left + rect.width / 2,
                          };
                          handleColorHover(
                            100,
                            "background",
                            e,
                            {
                              colorName: "primary",
                              hex: getPrimaryShade(100),
                            },
                            position
                          );
                        }}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: getSecondaryShade(600) }}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            const position = {
                              top: rect.top + window.scrollY,
                              left: rect.left + rect.width / 2,
                            };
                            handleColorHover(
                              600,
                              "color",
                              e,
                              {
                                colorName: "secondary",
                                hex: getSecondaryShade(600),
                              },
                              position
                            );
                          }}
                          onMouseLeave={handleMouseLeave}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
