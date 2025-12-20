'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { TestimonialCard } from '@/components/TestimonialCard';
import { ReviewForm } from '@/components/ReviewForm';
import { UrgencyBanner, PromoCard, LimitedSlotsAlert, SeasonalPromo } from '@/components/UrgencyCTAs';
import { ExitIntentPopup } from '@/components/ExitIntentPopup';
import { InstagramFeed } from '@/components/InstagramFeed';
import { PhotoGallery } from '@/components/PhotoGallery';
import { PriceCalculator } from '@/components/PriceCalculator';
import { getApprovedReviews } from '@/lib/reviewModeration';
import { Cake, Cookie, Award, Calculator, HelpCircle } from 'lucide-react';

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  event: string;
  date: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: 'María González',
    rating: 5,
    comment: 'La torta de mi boda fue espectacular! Todos los invitados preguntaron dónde la habíamos conseguido. Además de hermosa, estaba deliciosa.',
    event: 'Boda',
    date: 'Hace 2 meses'
  },
  {
    name: 'Carlos Ramírez',
    rating: 5,
    comment: 'Los cupcakes para el cumpleaños de mi hija fueron un éxito total. Bellamente decorados y con sabores increíbles. Muy recomendados!',
    event: 'Cumpleaños',
    date: 'Hace 1 mes'
  },
  {
    name: 'Ana Martínez',
    rating: 5,
    comment: 'Excelente servicio y calidad. La torta red velvet estaba divina y la entrega fue puntual. Definitivamente volveré a ordenar.',
    event: 'Aniversario',
    date: 'Hace 3 semanas'
  }
];

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Cargar solo reseñas aprobadas
  const loadApprovedReviews = () => {
    const approved = getApprovedReviews();
    if (approved.length > 0) {
      setTestimonials(approved);
    }
  };

  // Load testimonials on mount
  useEffect(() => {
    loadApprovedReviews();
  }, []);

  const handleNewReview = () => {
    // Recargar reseñas después de enviar una nueva
    loadApprovedReviews();
    setShowReviewForm(false);
  };
  const featuredProducts = [
    {
      id: 1,
      name: 'Torta de Chocolate',
      description: 'Deliciosa torta de chocolate con ganache',
      price: 45,
      image: '/images/chocolate-cake.jpg'
    },
    {
      id: 2,
      name: 'Cupcakes Variados',
      description: 'Pack de 6 cupcakes con diferentes sabores',
      price: 25,
      image: '/images/cupcakes.jpg'
    },
    {
      id: 3,
      name: 'Galletas Artesanales',
      description: 'Docena de galletas decoradas',
      price: 18,
      image: '/images/cookies.jpg'
    }
  ];

  return (
    <>
      <UrgencyBanner />
      <Header />
      <WhatsAppButton />
      <ExitIntentPopup />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50">
          <div className="absolute inset-0 bg-[url('/images/bakery-pattern.png')] opacity-10"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
              Dulce Hogar
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Endulzando momentos especiales con amor y dedicación artesanal
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/productos" 
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Ver Productos
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

        {/* About Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Nuestra Historia
                </h2>
                <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                  En Dulce Hogar, cada creación es elaborada con ingredientes de la más alta calidad 
                  y el cariño de una tradición familiar que se transmite de generación en generación.
                </p>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Desde tortas personalizadas hasta deliciosas galletas artesanales, 
                  nos especializamos en hacer de tus celebraciones momentos inolvidables.
                </p>
                <Link 
                  href="/nosotros" 
                  className="text-pink-500 hover:text-pink-600 font-semibold text-lg inline-flex items-center"
                >
                  Conoce más sobre nosotros
                  <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-orange-200 flex items-center justify-center">
                  <Cake className="w-40 h-40 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Productos Destacados
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12">
              Descubre nuestras creaciones más populares
            </p>

            {/* Alerta de espacios limitados */}
            <div className="mb-8">
              <LimitedSlotsAlert />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link 
                href="/productos" 
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all inline-block shadow-lg"
              >
                Ver Todos los Productos
              </Link>
            </div>
          </div>
        </section>

        {/* Promoción Especial */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <PromoCard />
            <SeasonalPromo />
          </div>
        </section>

        {/* Calculadora de Precios Preview */}
        <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-orange-50">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Calculator className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ¿Cuánto Costaría tu Pedido?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Usa nuestra calculadora para obtener una estimación instantánea
            </p>
            <Link
              href="/calculadora"
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all inline-block shadow-lg"
            >
              Ir a la Calculadora
            </Link>
          </div>
        </section>

        {/* Galería Preview */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <PhotoGallery maxImages={6} />
            <div className="text-center mt-12">
              <Link
                href="/galeria"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all inline-block shadow-lg"
              >
                Ver Galería Completa
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12">
              Todo lo que necesitas para endulzar tus momentos especiales
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-pink-50 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <Cake className="w-16 h-16 text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Tortas Personalizadas</h3>
                <p className="text-gray-600">
                  Diseños únicos para cumpleaños, bodas y eventos especiales
                </p>
              </div>
              <div className="text-center p-8 bg-orange-50 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <Award className="w-16 h-16 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Postres Artesanales</h3>
                <p className="text-gray-600">
                  Cupcakes, brownies, macarons y más delicias hechas a mano
                </p>
              </div>
              <div className="text-center p-8 bg-pink-50 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  <Cookie className="w-16 h-16 text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Galletas Decoradas</h3>
                <p className="text-gray-600">
                  Galletas temáticas perfectas para cualquier ocasión
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Feed */}
        <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-orange-50">
          <div className="max-w-7xl mx-auto">
            <InstagramFeed maxPosts={6} columns={3} />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12">
              La satisfacción de nuestros clientes es nuestra mejor publicidad
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>

            {/* Review Form Toggle */}
            <div className="text-center">
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-xl inline-block"
              >
                {showReviewForm ? 'Ver Reseñas' : 'Dejar una Reseña'}
              </button>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="mt-12">
                <ReviewForm onSubmit={handleNewReview} />
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              ¿Listo para endulzar tu día?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contáctanos y crea tu pedido personalizado
            </p>
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <Link 
                href="/cotizacion" 
                className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all inline-block shadow-lg"
              >
                Solicitar Cotización
              </Link>
              <Link 
                href="/contacto" 
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold transition-all inline-block"
              >
                Contactar
              </Link>
            </div>
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white underline"
            >
              <HelpCircle className="w-5 h-5" />
              ¿Tienes preguntas? Visita nuestras FAQs
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
