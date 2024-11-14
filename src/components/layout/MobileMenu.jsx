'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) onClose();
    };

    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end items-center p-4 border-b">
          <button
            onClick={onClose}
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
          <Link href="/workspace" className="nav-link" onClick={onClose}>
            Workspace
          </Link>
          <Link href="/pricing" className="nav-link" onClick={onClose}>
            Pricing
          </Link>
          <Link href="#" className="nav-link" onClick={onClose}>
            Figma Plugin
          </Link>
          <Link href="/auth/login" className="btn-primary" onClick={onClose}>
            Login
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}
