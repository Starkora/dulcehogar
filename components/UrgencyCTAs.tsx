'use client';

import { useState, useEffect } from 'react';
import { X, Clock, Sparkles, Gift, TrendingUp, AlertTriangle } from 'lucide-react';
import { getSiteConfig } from '@/lib/siteConfig';

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [config, setConfig] = useState(getSiteConfig());

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  if (!isVisible || !config.urgencyBanner.show) return null;

  return (
    <div className="bg-gradient-to-r from-pink-600 to-orange-600 text-white py-3 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
      <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 flex-1">
          <Sparkles className="w-5 h-5 animate-bounce" />
          <div className="flex-1">
            <p className="font-bold text-sm md:text-base">
              {config.urgencyBanner.message}
            </p>
            <p className="text-xs md:text-sm opacity-90">
              Solo quedan <span className="font-bold">{config.urgencyBanner.daysLeft}</span> días,{' '}
              <span className="font-bold">{config.urgencyBanner.hoursLeft}</span> horas
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Cerrar banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function PromoCard() {
  return (
    <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-8 h-8" />
          <span className="bg-white text-pink-600 px-3 py-1 rounded-full text-sm font-bold">
            OFERTA ESPECIAL
          </span>
        </div>
        
        <h3 className="text-3xl font-bold mb-2">
          15% de Descuento
        </h3>
        <p className="text-xl mb-4 opacity-90">
          En tu primer pedido
        </p>
        
        <p className="mb-6 text-white/90">
          Aplica en pedidos superiores a S/100. Menciona el código <span className="font-bold bg-white/20 px-2 py-1 rounded">DULCE15</span> al hacer tu pedido.
        </p>
        
        <a
          href="https://api.whatsapp.com/send/?phone=51904065007&text=¡Hola!%20Quiero%20usar%20mi%20descuento%20DULCE15&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl cursor-pointer"
        >
          Reclamar Descuento
        </a>
        
        <p className="text-xs mt-4 opacity-75">
          *Válido hasta el 31 de Diciembre de 2025. No acumulable con otras promociones.
        </p>
      </div>
    </div>
  );
}

export function LimitedSlotsAlert() {
  const [slots, setSlots] = useState(3);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simular actualización de espacios disponibles
    const storedSlots = localStorage.getItem('available-slots');
    const alertVisible = localStorage.getItem('slots-alert-visible');
    
    if (storedSlots) {
      setSlots(parseInt(storedSlots));
    }
    if (alertVisible !== null) {
      setIsVisible(alertVisible === 'true');
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('slots-alert-visible', 'false');
    
    // Volver a mostrar después de 24 horas
    setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem('slots-alert-visible', 'true');
    }, 24 * 60 * 60 * 1000);
  };

  if (slots === 0 || !isVisible) return null;

  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 relative">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="font-bold text-red-900 mb-1">
            ¡Espacios Limitados Esta Semana!
          </p>
          <p className="text-red-700 text-sm">
            Solo quedan <span className="font-bold text-xl">{slots}</span> espacios disponibles para pedidos de esta semana. 
            ¡Reserva el tuyo ahora!
          </p>
        </div>
        <button
          onClick={handleClose}
          className="ml-2 hover:bg-red-200 rounded-full p-1 transition-colors cursor-pointer"
          aria-label="Cerrar alerta"
        >
          <X className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  );
}

export function TrendingBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
      <TrendingUp className="w-4 h-4" />
      Más Pedido Esta Semana
    </div>
  );
}

export function SeasonalPromo() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Sparkles className="w-6 h-6" />
        <h4 className="text-2xl font-bold">Especial Año Nuevo</h4>
        <Sparkles className="w-6 h-6" />
      </div>
      <p className="mb-4">
        Tortas temáticas de Año Nuevo con diseños exclusivos
      </p>
      <p className="text-3xl font-bold mb-4">
        Desde S/120
      </p>
      <a
        href="/productos"
        className="inline-block bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-full font-bold transition-all cursor-pointer"
      >
        Ver Diseños
      </a>
    </div>
  );
}
