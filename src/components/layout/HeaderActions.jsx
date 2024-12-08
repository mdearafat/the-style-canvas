"use client";

import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import UserMenu from "./UserMenu";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function HeaderActions() {
  const { user, isProUser, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return <div className="animate-pulse h-8 w-24 bg-gray-200 rounded"></div>;
  }

  const navigationLinks = [
    { href: "/workspace", label: "Workspace" },
    { href: "#", label: "Figma Plugin" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <nav className="flex items-center space-x-8">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-600 hover:text-gray-900"
          >
            {link.label}
          </Link>
        ))}

        {user ? (
          <>
            {isProUser ? (
              <span className="text-primary-600 font-medium">Pro User</span>
            ) : (
              <Link
                href="/pricing"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                Go Pro
              </Link>
            )}
            <UserMenu />
          </>
        ) : (
          <Link
            href="/auth/login"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-gray-600 hover:text-gray-900"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
