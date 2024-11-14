// app/layout.js
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Poppins } from 'next/font/google';
import './globals.css';

export const metadata = {
  title: 'The Style Canvas',
  description: 'Design system management made easy',
};

// Import Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
