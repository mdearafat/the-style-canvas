'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary-50">
      <div className="container max-w-screen-xl mx-auto flex justify-between items-center py-5 px-4">
        <Link href="/">
          <Image
            src="/assets/The Style Canvas.svg"
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>

        <nav className="hidden md:flex space-x-10 items-center">
          <Link href="/workspace" className="nav-link">
            Workspace
          </Link>
          <Link href="/pricing" className="nav-link">
            Pricing
          </Link>
          <Link href="#" className="nav-link">
            Figma Plugin
          </Link>
          <Link href="#" className="btn-primary">
            Login
          </Link>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-primary-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
