import logo from '../assets/The Style Canvas.svg';
export default function NavBar() {
  return (
    <>
      <header className="bg-primary-50">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center py-5 px-4">
          <a href="index.html">
            <img src={logo} alt="Logo" />
          </a>

          <nav className="hidden md:flex space-x-10 items-center">
            <a href="Workspace.html" className="nav-link">
              Workspace
            </a>
            <a href="Pricing.html" className="nav-link">
              Pricing
            </a>
            <a href="#" className="nav-link">
              Figma Plugin
            </a>
            <a href="#" className="btn-primary">
              Login
            </a>
          </nav>

          <button
            id="hamburger-button"
            className="md:hidden text-primary-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className="fixed top-0 right-0 w-64 bg-white h-full shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out z-50"
      >
        <div className="flex justify-end items-center p-4 border-b">
          <button
            id="close-button"
            className="text-primary-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          <a href="Workspace.html" className="nav-link">
            Workspace
          </a>
          <a href="Pricing.html" className="nav-link">
            Pricing
          </a>
          <a href="#" className="nav-link">
            Figma Plugin
          </a>
          <a href="#" className="btn-primary">
            Login
          </a>
        </nav>
      </div>

      <div
        id="overlay"
        className="fixed inset-0 bg-black opacity-50 hidden z-40"
      ></div>
    </>
  );
}
