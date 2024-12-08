import { AuthProvider } from "@/context/AuthContext";
import { Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap", // Optimize font loading
});

export const metadata = {
  title: "The Style Canvas",
  description:
    "Design with confidence - Create and manage your color palettes and typography with ease",
  keywords: "design, color palette, typography, UI design, UX design, Figma",
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "The Style Canvas",
    description:
      "Design with confidence - Create and manage your color palettes and typography with ease",
    url: "#",
    siteName: "The Style Canvas",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
