'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Heart, Gift, Sparkles, MessageCircle, Clock, Users, Star } from 'lucide-react';
import { getProducts } from '@/lib/siteConfig';

export default function SanValentinPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [products, setProducts] = useState<any[]>([]);
  const [eventProducts, setEventProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch regular products
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        
      }
    };

    // Fetch event products
    const fetchEventProducts = async () => {
      try {
        const response = await fetch('/api/event-products?eventId=san-valentin-2026');
        const data = await response.json();
        setEventProducts(data);
      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchEventProducts();
    
    // Countdown to Valentine's Day
    const valentineDay = new Date('2026-02-14T23:59:59');
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = valentineDay.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const handleOrderCombo = (comboName: string, price: string) => {
    const phoneNumber = '51957076760';
    const message = encodeURIComponent(
      `¡Hola! Quiero ordenar el combo de San Valentín: ${comboName} - ${price}\n\n¿Pueden confirmar disponibilidad?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-50">
        {/* Hero San Valentín */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-red-400/10"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-full mb-6 animate-pulse">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-bold">Especial San Valentín 2026</span>
                <Heart className="w-5 h-5 fill-current" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
                Regala Amor Dulce
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Sorprende a tu pareja con nuestras creaciones especiales hechas con amor
              </p>

              {/* Countdown */}
              <div className="flex justify-center gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-4xl font-bold text-pink-500">{timeLeft.days}</div>
                  <div className="text-sm text-gray-600 mt-1">Días</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-4xl font-bold text-pink-500">{timeLeft.hours}</div>
                  <div className="text-sm text-gray-600 mt-1">Horas</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-4xl font-bold text-pink-500">{timeLeft.minutes}</div>
                  <div className="text-sm text-gray-600 mt-1">Minutos</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="#combos"
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <Gift className="w-5 h-5" />
                  Ver Combos Especiales
                </a>
                <a
                  href="#productos"
                  className="bg-white hover:bg-gray-50 text-pink-500 px-8 py-4 rounded-full text-lg font-semibold border-2 border-pink-500 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Ver Productos
                </a>
              </div>
            </div>

            {/* Urgency Banner */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 shadow-xl text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Clock className="w-6 h-6" />
                <p className="text-xl font-bold">¡Últimos días para ordenar!</p>
              </div>
              <p className="text-sm opacity-90">
                Pedidos hasta el 12 de Febrero para entrega garantizada el 14
              </p>
            </div>
          </div>
        </section>

        {/* Combos Especiales */}
        <section id="combos" className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Combos Románticos
              </h2>
              <p className="text-xl text-gray-600">
                Paquetes especiales diseñados para enamorar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Combo Clásico */}
              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mb-4">
                    <Heart className="w-10 h-10 text-white fill-current" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Amor Clásico</h3>
                  <p className="text-pink-600 font-semibold mb-4">Perfecto para comenzar</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>6 Cupcakes decorados</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>12 Galletas con mensaje</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Tarjeta personalizada</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Para 2 personas</span>
                  </li>
                </ul>

                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 line-through">S/ 95</div>
                  <div className="text-4xl font-bold text-pink-500">S/ 75</div>
                  <div className="text-sm text-red-600 font-semibold mt-1">¡Ahorra S/ 20!</div>
                </div>

                <button
                  onClick={() => handleOrderCombo('Amor Clásico', 'S/ 75')}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ordenar Ahora
                </button>
              </div>

              {/* Combo Premium */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-4 border-pink-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    MÁS POPULAR
                  </span>
                </div>
                
                <div className="text-center mb-6 mt-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4">
                    <Gift className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Amor Premium</h3>
                  <p className="text-pink-600 font-semibold mb-4">¡El más completo!</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Torta personalizada 1kg</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>12 Cupcakes temáticos</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>24 Galletas decoradas</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Caja regalo premium</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Para 4-6 personas</span>
                  </li>
                </ul>

                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 line-through">S/ 180</div>
                  <div className="text-4xl font-bold text-red-500">S/ 145</div>
                  <div className="text-sm text-red-600 font-semibold mt-1">¡Ahorra S/ 35!</div>
                </div>

                <button
                  onClick={() => handleOrderCombo('Amor Premium', 'S/ 145')}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ordenar Ahora
                </button>
              </div>

              {/* Combo Deluxe */}
              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-600 to-red-600 rounded-full mb-4">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Amor Deluxe</h3>
                  <p className="text-pink-600 font-semibold mb-4">Para una ocasión especial</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Torta personalizada 2kg</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>18 Cupcakes premium</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>36 Galletas artesanales</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Caja premium + flores</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Para 8-10 personas</span>
                  </li>
                </ul>

                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 line-through">S/ 280</div>
                  <div className="text-4xl font-bold text-pink-500">S/ 225</div>
                  <div className="text-sm text-red-600 font-semibold mt-1">¡Ahorra S/ 55!</div>
                </div>

                <button
                  onClick={() => handleOrderCombo('Amor Deluxe', 'S/ 225')}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ordenar Ahora
                </button>
              </div>
            </div>

            {/* Nota importante */}
            <div className="mt-12 bg-pink-50 border-2 border-pink-200 rounded-2xl p-6 text-center">
              <p className="text-gray-700 text-lg flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-pink-600 fill-current" />
                <span className="font-bold text-pink-600">Incluido en todos los combos:</span>
                <span>Empaque especial, tarjeta personalizada y entrega con dedicatoria</span>
              </p>
            </div>
          </div>
        </section>

        {/* Productos Individuales */}
        <section id="productos" className="py-20 px-4 bg-gradient-to-br from-pink-50 to-red-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Productos Exclusivos de San Valentín
              </h2>
              <p className="text-xl text-gray-600">
                Productos especiales solo disponibles para esta fecha
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando productos...</p>
              </div>
            ) : eventProducts.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {eventProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : null}

            <div className="text-center mb-8 mt-16">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Productos Regulares
              </h3>
              <p className="text-lg text-gray-600">
                Arma tu propio combo personalizado
              </p>
            </div>

            {products.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Estamos preparando productos especiales para ti. ¡Vuelve pronto!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-red-500">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Heart className="w-16 h-16 mx-auto mb-6 fill-current animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para sorprender?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Haz tu pedido ahora y asegura la entrega perfecta para San Valentín
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="https://api.whatsapp.com/send/?phone=51957076760&text=¡Hola!%20Quiero%20hacer%20un%20pedido%20para%20San%20Valentín&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-pink-500 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
              <Link
                href="/contacto"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white transition-all transform hover:scale-105 shadow-lg"
              >
                Ver más opciones de contacto
              </Link>
            </div>
            
            <div className="mt-12 bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                <Gift className="w-5 h-5" />
                Usa el código: AMOR2026
              </p>
              <p className="opacity-90">15% de descuento en pedidos mayores a S/ 50</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
