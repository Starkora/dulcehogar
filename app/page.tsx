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
import { getApprovedReviews } from '@/lib/reviewModeration';
import { getSiteConfig, getProducts, getPromotions, Product as SiteProduct } from '@/lib/siteConfig';
import { Cake, Cookie, Award, HelpCircle, MessageCircle } from 'lucide-react';

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
  event: string;
  date: string;
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [config, setConfig] = useState(getSiteConfig());
  const [products, setProducts] = useState<SiteProduct[]>(getProducts());
  const [promotions, setPromotions] = useState(getPromotions());

  // Cargar solo reseñas aprobadas (sin testimoniales por defecto)
  const loadApprovedReviews = () => {
    const approved = getApprovedReviews();
    setTestimonials(approved);
  };

  // Load testimonials and config on mount
  useEffect(() => {
    loadApprovedReviews();
    setConfig(getSiteConfig());
    setProducts(getProducts());
    setPromotions(getPromotions());
  }, []);

  const handleNewReview = () => {
    // Recargar reseñas después de enviar una nueva
    loadApprovedReviews();
    setShowReviewForm(false);
  };

  const activePromotions = promotions.filter(p => p.isActive);

  return (
    <>
      {config.urgencyBanner.show && <UrgencyBanner />}
      <Header />
      <WhatsAppButton />
      <ExitIntentPopup />
      <main className="min-h-screen">
        {/* Hero Section */}
        {config.showHero && (
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
        )}

        {/* About Section */}
        {config.showAbout && (
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
        )}

        {/* Featured Products */}
        {config.showProducts && products.length > 0 && (
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
              {products.slice(0, 6).map((product) => (
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
        )}

        {/* Promoción Especial */}
        {config.showPromotions && activePromotions.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {activePromotions.slice(0, 2).map((promo) => (
              promo.type === 'discount' ? (
                <div key={promo.id} className="bg-gradient-to-br from-orange-400 via-pink-500 to-pink-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-4 left-4">
                    <span className="bg-white text-pink-500 px-4 py-1 rounded-full text-sm font-bold">
                      OFERTA ESPECIAL
                    </span>
                  </div>
                  <div className="mt-12">
                    <h3 className="text-4xl font-bold mb-2">{promo.title}</h3>
                    <p className="text-lg opacity-90 mb-4">En tu primer pedido</p>
                    <p className="text-sm mb-6">
                      {promo.description}
                    </p>
                    <Link
                      href={promo.ctaLink}
                      className="bg-white text-pink-500 hover:bg-pink-50 px-6 py-3 rounded-full font-semibold transition-all inline-block shadow-lg"
                    >
                      {promo.ctaText}
                    </Link>
                    {promo.validUntil && (
                      <p className="text-xs mt-4 opacity-75">*Válido hasta el {promo.validUntil}. No acumulable con otras promociones.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div key={promo.id} className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/images/confetti.png')] opacity-10"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold mb-4">{promo.title}</h3>
                    <p className="text-lg mb-6">
                      {promo.description}
                    </p>
                    <Link
                      href={promo.ctaLink}
                      className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full font-semibold transition-all inline-block shadow-lg"
                    >
                      {promo.ctaText}
                    </Link>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
        )}

        {/* Galería Preview */}
        {config.showGallery && (
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
        )}

        {/* Services Section - Always visible */}
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
        {config.showInstagram && (
        <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-orange-50">
          <div className="max-w-7xl mx-auto">
            <InstagramFeed maxPosts={6} columns={3} />
          </div>
        </section>
        )}

        {/* Testimonials Section */}
        {config.showTestimonials && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12">
              La satisfacción de nuestros clientes es nuestra mejor publicidad
            </p>
            
            {testimonials.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl">
                <MessageCircle className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-3">
                  Aún no hay reseñas
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Sé el primero en compartir tu experiencia con nosotros. Tu opinión es muy valiosa.
                </p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-xl inline-block"
                >
                  Dejar la Primera Reseña
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}

            {/* Review Form */}
            {showReviewForm && (
              <div className="mt-12">
                <ReviewForm onSubmit={handleNewReview} />
              </div>
            )}
          </div>
        </section>
        )}

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
