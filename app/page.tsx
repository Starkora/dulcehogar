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
import { ProductCarousel } from '@/components/ProductCarousel';
import { getApprovedReviews } from '@/lib/reviewModeration';
import { getProducts, getPromotions, Product as SiteProduct } from '@/lib/siteConfig';
import { Cake, Cookie, Award, HelpCircle, MessageCircle, Heart, Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

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
  const [config, setConfig] = useState<any>({ urgencyBanner: { show: false } });
  const [products, setProducts] = useState<SiteProduct[]>(getProducts());
  const [promotions, setPromotions] = useState(getPromotions());
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewsPerPage, setReviewsPerPage] = useState(3);
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [activePromotionsFromDB, setActivePromotionsFromDB] = useState<any[]>([]);

  // Cargar solo reseñas aprobadas desde la base de datos
  const loadApprovedReviews = async () => {
    try {
      const response = await fetch('/api/reviews?status=approved');
      const data = await response.json();
      
      // Verificar que la respuesta sea un array
      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        
        setTestimonials([]);
      }
    } catch (error) {
      
      setTestimonials([]);
    }
  };

  const loadSiteConfig = async () => {
    try {
      const response = await fetch('/api/site-config');
      const data = await response.json();
      setConfig({
        ...data,
        urgencyBanner: data.urgencyBanner || { show: false }
      });
    } catch (error) {
      
    }
  };

  const loadActivePromotions = async () => {
    try {
      const response = await fetch('/api/promotions');
      const data = await response.json();
      const actives = data.filter((p: any) => p.isActive);
      setActivePromotionsFromDB(actives);
    } catch (error) {
      
    }
  };

  // Load testimonials and config on mount
  useEffect(() => {
    loadApprovedReviews();
    loadSiteConfig();
    loadActivePromotions();
    setProducts(getProducts());
    setPromotions(getPromotions());
    
    // Ajustar reseñas por página según el tamaño de pantalla
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setReviewsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setReviewsPerPage(2);
      } else {
        setReviewsPerPage(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewReview = () => {
    // Recargar reseñas después de enviar una nueva
    loadApprovedReviews();
    setShowReviewForm(false);
  };

  const nextReview = () => {
    if (currentReviewIndex + reviewsPerPage < testimonials.length) {
      setCurrentReviewIndex(currentReviewIndex + reviewsPerPage);
    }
  };

  const prevReview = () => {
    if (currentReviewIndex > 0) {
      setCurrentReviewIndex(Math.max(0, currentReviewIndex - reviewsPerPage));
    }
  };

  const visibleReviews = testimonials.slice(currentReviewIndex, currentReviewIndex + reviewsPerPage);
  const hasMoreReviews = currentReviewIndex + reviewsPerPage < testimonials.length;
  const hasPrevReviews = currentReviewIndex > 0;

  const activePromotions = promotions.filter(p => p.isActive);

  return (
    <>
      {config.urgencyBanner?.show && <UrgencyBanner />}
      <Header />
      
      {/* Banner flotante de promoción */}
      {showPromoBanner && activePromotionsFromDB.length > 0 && (
        <div className="fixed top-20 right-4 z-99990 max-w-sm animate-slide-in-right">
          <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowPromoBanner(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 bg-white text-pink-500 text-xs font-bold px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3 h-3" />
                PROMOCIÓN ESPECIAL
              </span>
              <h3 className="text-xl font-bold mb-2">{activePromotionsFromDB[0].title}</h3>
              <p className="text-white/90 text-sm mb-3">{activePromotionsFromDB[0].description}</p>
              
              {activePromotionsFromDB[0].discountPercent > 0 && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                  <p className="text-2xl font-bold">{activePromotionsFromDB[0].discountPercent}% OFF</p>
                  {activePromotionsFromDB[0].code && (
                    <p className="text-sm mt-1">Código: <span className="font-bold">{activePromotionsFromDB[0].code}</span></p>
                  )}
                  {activePromotionsFromDB[0].validUntil && (
                    <p className="text-xs mt-1 text-white/80">Válido hasta: {activePromotionsFromDB[0].validUntil}</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <a
                href="https://api.whatsapp.com/send/?phone=51957076760&text=¡Hola!%20Quiero%20aprovechar%20la%20promoción&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white hover:bg-gray-100 text-pink-500 px-4 py-2 rounded-lg font-semibold text-center transition-all cursor-pointer"
              >
                Aprovechar
              </a>
              {activePromotionsFromDB.length > 1 && (
                <Link
                  href="#promociones"
                  onClick={() => setShowPromoBanner(false)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-medium transition-all cursor-pointer text-sm"
                >
                  Ver más
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      
      <WhatsAppButton />
      <ExitIntentPopup />
      <main className="min-h-screen">
        {/* Hero Section con Carrusel de Productos */}
        {config.showHero && <ProductCarousel />}

        {/* San Valentín Banner Especial */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full animate-pulse delay-75"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full animate-pulse delay-150"></div>
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white fill-current animate-bounce" />
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              San Valentín 2026
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 flex items-center justify-center gap-2">
              <Heart className="w-6 h-6" />
              Sorprende a tu pareja con nuestras creaciones especiales
            </p>
            
            <p className="text-lg text-white/80 mb-8">
              Combos románticos desde S/ 75 • Descuento especial 15% con código <span className="font-bold">AMOR2026</span>
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap mb-8">
              <Link
                href="/san-valentin"
                className="bg-white hover:bg-gray-100 text-pink-500 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Heart className="w-5 h-5 fill-current" />
                Ver Ofertas Especiales
              </Link>
              <a
                href="https://api.whatsapp.com/send/?phone=51957076760&text=¡Hola!%20Quiero%20información%20sobre%20San%20Valentín&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Pedir por WhatsApp
              </a>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <p className="text-white font-semibold text-lg flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                ¡Solo hasta el 12 de Febrero!
              </p>
              <p className="text-white/90 text-sm mt-1">
                Asegura tu pedido para el día más romántico del año
              </p>
            </div>
          </div>
        </section>

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
                    <button
                      onClick={() => {
                        const message = encodeURIComponent(
                          `¡Hola! Me interesa la promoción: ${promo.title}${promo.code ? ` - Código: ${promo.code}` : ''}`
                        );
                        window.open(`https://wa.me/51957076760?text=${message}`, '_blank');
                      }}
                      className="bg-white text-pink-500 hover:bg-pink-50 px-6 py-3 rounded-full font-semibold transition-all inline-block shadow-lg cursor-pointer"
                    >
                      {promo.ctaText}
                    </button>
                    {promo.validUntil && (
                      <p className="text-xs mt-4 opacity-75">*Válido hasta el {promo.validUntil}. No acumulable con otras promociones.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div key={promo.id} className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold mb-4">{promo.title}</h3>
                    <p className="text-lg mb-6">
                      {promo.description}
                    </p>
                    <button
                      onClick={() => {
                        const message = encodeURIComponent(
                          `¡Hola! Me interesa la promoción: ${promo.title}${promo.code ? ` - Código: ${promo.code}` : ''}`
                        );
                        window.open(`https://wa.me/51957076760?text=${message}`, '_blank');
                      }}
                      className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full font-semibold transition-all inline-block shadow-lg cursor-pointer"
                    >
                      {promo.ctaText}
                    </button>
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
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-xl inline-block cursor-pointer"
                >
                  Dejar la Primera Reseña
                </button>
              </div>
            ) : (
              <>
                {/* Carrusel de Reseñas */}
                <div className="relative mb-12">
                  {/* Botón anterior */}
                  {hasPrevReviews && (
                    <button
                      onClick={prevReview}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-pink-50 transition-all group"
                      aria-label="Reseña anterior"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-pink-500" />
                    </button>
                  )}

                  {/* Grid de reseñas visibles */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
                    {visibleReviews.map((testimonial, index) => (
                      <TestimonialCard key={currentReviewIndex + index} {...testimonial} />
                    ))}
                  </div>

                  {/* Botón siguiente */}
                  {hasMoreReviews && (
                    <button
                      onClick={nextReview}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-pink-50 transition-all group"
                      aria-label="Siguiente reseña"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-pink-500" />
                    </button>
                  )}

                  {/* Indicadores */}
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: Math.ceil(testimonials.length / reviewsPerPage) }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentReviewIndex(i * reviewsPerPage)}
                        className={`h-2 rounded-full transition-all ${
                          Math.floor(currentReviewIndex / reviewsPerPage) === i
                            ? 'w-8 bg-pink-500'
                            : 'w-2 bg-gray-300 hover:bg-pink-300'
                        }`}
                        aria-label={`Ir a página ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Form Toggle */}
                <div className="text-center">
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-xl inline-block cursor-pointer"
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
