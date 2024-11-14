import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white py-8">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About the Project</h3>
            <p className="text-gray-400">
              This app was created as a course project to simplify color and
              typography design for UI/UX designers. Built with passion and
              attention to detail, this app offers real-time previews and
              seamless Figma integration for professional design workflows.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/workspace" className="footer-link">
                  Workspace
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="footer-link">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Figma Plugin
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Connect with Me</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/your-github"
                  className="footer-link"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/your-linkedin"
                  className="footer-link"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:your-email@example.com" className="footer-link">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>&copy; 2024 The Style Canvas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
