'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

export function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.slice(0, 6)); // Solo mostrar 6 productos
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (loading || products.length === 0) {
    return (
      <section className="relative py-24 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 overflow-hidden min-h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </section>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 overflow-hidden min-h-[700px]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Productos Destacados</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Endulza tu día
          </h2>
          <p className="text-xl text-gray-600">
            Descubre nuestras creaciones artesanales
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative">
          {/* Product Display */}
          <div className="flex items-center justify-center gap-8 mb-8">
            {/* Previous Product (Preview) */}
            <div className="hidden lg:block opacity-30 transform scale-75 transition-all duration-500">
              {products[(currentIndex - 1 + products.length) % products.length] && (
                <div className="w-64 h-80 bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={products[(currentIndex - 1 + products.length) % products.length].image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Current Product (Main) */}
            <div className="relative transform transition-all duration-700 ease-out">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-80 md:w-96 transform hover:scale-105 transition-all duration-300">
                {/* Product Image */}
                <div className="relative h-64 md:h-72 overflow-hidden group">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Heart Icon */}
                  <button className="absolute top-4 right-4 bg-white/90 hover:bg-pink-500 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
                    <Heart className="w-5 h-5" />
                  </button>

                  {/* Category Badge */}
                  {currentProduct.category && (
                    <div className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {currentProduct.category}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {currentProduct.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {currentProduct.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Precio desde</p>
                      <p className="text-3xl font-bold text-pink-600">
                        S/ {currentProduct.price}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/productos"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Ver Todos los Productos
                  </Link>
                </div>
              </div>
            </div>

            {/* Next Product (Preview) */}
            <div className="hidden lg:block opacity-30 transform scale-75 transition-all duration-500">
              {products[(currentIndex + 1) % products.length] && (
                <div className="w-64 h-80 bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={products[(currentIndex + 1) % products.length].image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all transform hover:scale-110 z-20"
            aria-label="Producto anterior"
          >
            <ChevronLeft className="w-6 h-6 text-pink-500" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all transform hover:scale-110 z-20"
            aria-label="Siguiente producto"
          >
            <ChevronRight className="w-6 h-6 text-pink-500" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-pink-500'
                    : 'w-3 h-3 bg-gray-300 hover:bg-pink-300'
                }`}
                aria-label={`Ir a producto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center mt-12 flex-wrap">
          <Link
            href="/san-valentin"
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <Heart className="w-5 h-5 fill-current" />
            Ofertas San Valentín
          </Link>
          <Link
            href="/contacto"
            className="bg-white hover:bg-gray-50 text-pink-500 px-8 py-4 rounded-full text-lg font-semibold border-2 border-pink-500 transition-all transform hover:scale-105 shadow-lg"
          >
            Contactar
          </Link>
        </div>
      </div>
    </section>
  );
}
