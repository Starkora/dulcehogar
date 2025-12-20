'use client';

import { useState, useEffect } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Verificar si ya se mostró antes
    const shown = sessionStorage.getItem('exit-popup-shown');
    if (shown) {
      setHasShown(true);
      return;
    }

    // Para desktop: detectar cuando el mouse sale por arriba
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit-popup-shown', 'true');
      }
    };

    // Para móviles: mostrar después de 5 segundos de navegación
    const mobileTimer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit-popup-shown', 'true');
      }
    }, 5000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-slideUp">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-10 h-10 text-pink-500" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Espera!
          </h2>
          
          <p className="text-xl text-gray-700 mb-4">
            Antes de irte...
          </p>

          <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-6 mb-6">
            <p className="text-lg font-bold text-pink-600 mb-2">
              Obtén 10% de Descuento
            </p>
            <p className="text-gray-700 mb-4">
              En tu primer pedido. Usa el código:
            </p>
            <div className="bg-white border-2 border-pink-300 rounded-lg px-4 py-3 mb-4">
              <p className="text-2xl font-bold text-pink-600 tracking-wider">
                DULCE10
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Válido en pedidos superiores a S/80
            </p>
          </div>

          <a
            href="https://api.whatsapp.com/send/?phone=51904065007&text=¡Hola!%20Quiero%20usar%20mi%20código%20DULCE10&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsVisible(false)}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>Hacer mi Pedido Ahora</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700"
          >
            No gracias, seguir navegando
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
