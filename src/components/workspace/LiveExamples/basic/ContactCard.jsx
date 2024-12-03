import { Mail, Phone, MapPin } from "lucide-react";
import { useColorTooltip } from "@/hooks/useColorTooltip";
import ColorTooltip from "../../ColorTooltip";

export default function ContactCard({ colorShades }) {
  const { tooltipInfo, handleColorHover, handleMouseLeave } = useColorTooltip();
  const getShade = (shade) => colorShades.find((s) => s.shade === shade)?.hex;

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 000-0000",
      link: "tel:+15550000000",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Business Ave, Suite 100",
      link: "#",
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
          className="h-32 relative"
          style={{
            background: `linear-gradient(to right, ${getShade(500)}, ${getShade(
              600
            )})`,
          }}
          onMouseEnter={(e) =>
            handleColorHover("500-600", "gradient", e, {
              colorName: "primary",
              hex: getShade(500),
            })
          }
          onMouseLeave={handleMouseLeave}
        />

        <div className="p-8 -mt-12">
          <div
            className="rounded-xl bg-white shadow-lg p-6 mb-6"
            style={{ borderTop: `4px solid ${getShade(500)}` }}
            onMouseEnter={(e) =>
              handleColorHover(500, "border", e, {
                colorName: "primary",
                hex: getShade(500),
              })
            }
            onMouseLeave={handleMouseLeave}
          >
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: getShade(900) }}
              onMouseEnter={(e) =>
                handleColorHover(900, "text", e, {
                  colorName: "primary",
                  hex: getShade(900),
                })
              }
              onMouseLeave={handleMouseLeave}
            >
              Get in Touch
            </h3>
            <p className="text-gray-600">
              Have questions? We're here to help you.
            </p>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="flex items-start gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: getShade(50),
                  }}
                  onMouseEnter={(e) => {
                    handleColorHover(50, "background", e, {
                      colorName: "primary",
                      hex: getShade(50),
                    });
                    e.currentTarget.style.backgroundColor = getShade(100);
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.currentTarget.style.backgroundColor = getShade(50);
                  }}
                >
                  <info.icon
                    className="w-6 h-6"
                    style={{ color: getShade(600) }}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    {info.label}
                  </div>
                  <div
                    className="font-medium transition-colors"
                    style={{ color: getShade(700) }}
                    onMouseEnter={(e) =>
                      handleColorHover(700, "text", e, {
                        colorName: "primary",
                        hex: getShade(700),
                      })
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    {info.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <button
              className="w-full py-3 rounded-xl font-medium text-white transition-colors"
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
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
