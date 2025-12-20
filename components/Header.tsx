'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Cake, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Cake className="w-8 h-8 text-pink-500" />
            <span className="text-2xl font-bold text-pink-500">Dulce Hogar</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-pink-500 font-semibold transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              className="text-gray-700 hover:text-pink-500 font-semibold transition-colors"
            >
              Productos
            </Link>
            <Link 
              href="/galeria" 
              className="text-gray-700 hover:text-pink-500 font-semibold transition-colors"
            >
              Galería
            </Link>
            <Link 
              href="/calculadora" 
              className="text-gray-700 hover:text-pink-500 font-semibold transition-colors"
            >
              Calcular Precio
            </Link>
            <Link 
              href="/faqs" 
              className="text-gray-700 hover:text-pink-500 font-semibold transition-colors"
            >
              FAQs
            </Link>
            <Link 
              href="/nosotros" 
              className="text-gray-700 hover:text-pink-500 font-semibold transition-colors"
            >
              Nosotros
            </Link>
            <Link 
              href="/contacto" 
              className="text-gray-700 hover:text-pink-500 font-semibold transition-colors"
            >
              Contacto
            </Link>
            <Link 
              href="/cotizacion" 
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md cursor-pointer"
            >
              Cotizar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              href="/" 
              className="block text-gray-700 hover:text-pink-500 font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link 
              href="/productos" 
              className="block text-gray-700 hover:text-pink-500 font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link 
              href="/galeria" 
              className="block text-gray-700 hover:text-pink-500 font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Galería
            </Link>
            <Link 
              href="/calculadora" 
              className="block text-gray-700 hover:text-pink-500 font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Calcular Precio
            </Link>
            <Link 
              href="/faqs" 
              className="block text-gray-700 hover:text-pink-500 font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link 
              href="/nosotros" 
              className="block text-gray-700 hover:text-pink-500 font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </Link>
            <Link 
              href="/contacto" 
              className="block text-gray-700 hover:text-pink-500 font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link 
              href="/cotizacion" 
              className="block bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold text-center cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Cotizar
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
