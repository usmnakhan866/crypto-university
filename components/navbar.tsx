"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import LanguageSelector from "./language-selector"
import { useLanguage } from "@/context/language-context"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%282%29-11HOb82pwYEQQetmF0hA8iWNxDNwig.png"
            alt="Crypto University Logo"
            width={50}
            height={50}
            className="mr-2"
          />
          <span className="text-xl font-bold text-gray-900">Crypto University</span>
        </Link>

        {/* Language Selector (Desktop) */}
        <div className="hidden md:block absolute right-4 top-4">
          <LanguageSelector />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-900 hover:text-primary transition-colors relative group">
            {t("nav.home")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="text-gray-900 hover:text-primary transition-colors relative group">
            {t("nav.about")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/qa" className="text-gray-900 hover:text-primary transition-colors relative group">
            {t("nav.qa")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="text-gray-900 hover:text-primary transition-colors relative group">
            {t("nav.contact")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/checkout"
            className="btn-primary flex items-center gap-2 transform hover:scale-105 transition-transform"
          >
            {t("nav.startNow")}
            <span className="animate-pulse">→</span>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden z-50 shadow-lg">
            <div className="container mx-auto py-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-900 hover:text-primary transition-colors px-4 py-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/about"
                className="text-gray-900 hover:text-primary transition-colors px-4 py-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/qa"
                className="text-gray-900 hover:text-primary transition-colors px-4 py-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.qa")}
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-primary transition-colors px-4 py-3 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              <Link
                href="/checkout"
                className="btn-primary mx-4 text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.startNow")}
                <span className="animate-pulse">→</span>
              </Link>

              {/* Language Selector (Mobile) */}
              <div className="px-4 py-2">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

