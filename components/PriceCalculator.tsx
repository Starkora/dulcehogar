'use client';

import { useState } from 'react';
import { Calculator, Cake, Users, Sparkles, ArrowRight } from 'lucide-react';

interface PriceCalculatorProps {
  onQuoteReady?: (quote: QuoteData) => void;
}

interface QuoteData {
  productType: string;
  portions: number;
  decorationLevel: string;
  flavor: string;
  estimatedPrice: number;
}

const productTypes = [
  { id: 'cake', name: 'Torta', basePrice: 40000, icon: Cake },
  { id: 'cupcakes', name: 'Cupcakes', basePrice: 3000, icon: Cake },
  { id: 'cookies', name: 'Galletas', basePrice: 1500, icon: Cake },
];

const decorationLevels = [
  { id: 'basic', name: 'Básica', multiplier: 1, description: 'Decoración sencilla y elegante' },
  { id: 'medium', name: 'Media', multiplier: 1.5, description: 'Detalles personalizados' },
  { id: 'premium', name: 'Premium', multiplier: 2.2, description: 'Diseño elaborado y único' },
];

const flavors = [
  'Chocolate',
  'Vainilla',
  'Red Velvet',
  'Zanahoria',
  'Tres Leches',
  'Arequipe',
  'Frutos Rojos',
  'Limón',
];

export function PriceCalculator({ onQuoteReady }: PriceCalculatorProps) {
  const [productType, setProductType] = useState('cake');
  const [portions, setPortions] = useState(20);
  const [decorationLevel, setDecorationLevel] = useState('basic');
  const [flavor, setFlavor] = useState('Chocolate');
  const [showResult, setShowResult] = useState(false);

  const calculatePrice = () => {
    const product = productTypes.find(p => p.id === productType);
    const decoration = decorationLevels.find(d => d.id === decorationLevel);
    
    if (!product || !decoration) return 0;

    let price = product.basePrice * portions * decoration.multiplier;
    
    // Descuento por volumen
    if (portions > 50) {
      price *= 0.9; // 10% descuento
    } else if (portions > 100) {
      price *= 0.85; // 15% descuento
    }

    return Math.round(price / 1000) * 1000; // Redondear a miles
  };

  const estimatedPrice = calculatePrice();

  const handleCalculate = () => {
    setShowResult(true);
    
    if (onQuoteReady) {
      onQuoteReady({
        productType: productTypes.find(p => p.id === productType)?.name || '',
        portions,
        decorationLevel: decorationLevels.find(d => d.id === decorationLevel)?.name || '',
        flavor,
        estimatedPrice,
      });
    }
  };

  const handleWhatsAppQuote = () => {
    const product = productTypes.find(p => p.id === productType);
    const decoration = decorationLevels.find(d => d.id === decorationLevel);
    
    const message = encodeURIComponent(
      `¡Hola! Me gustaría cotizar:\n\n` +
      `📦 Producto: ${product?.name}\n` +
      `👥 Porciones: ${portions}\n` +
      `✨ Decoración: ${decoration?.name}\n` +
      `🍰 Sabor: ${flavor}\n` +
      `💰 Precio estimado: ${new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 0 }).format(estimatedPrice)}\n\n` +
      `¿Podrían confirmar disponibilidad y precio final?`
    );
    
    window.open(`https://wa.me/573001234567?text=${message}`, '_blank');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Calculator className="w-8 h-8 text-pink-500" />
        <h2 className="text-3xl font-bold text-gray-900">
          Calculadora de Precios
        </h2>
      </div>
      
      <p className="text-center text-gray-600 mb-8">
        Obtén una estimación instantánea del precio de tu pedido
      </p>

      <div className="space-y-6">
        {/* Tipo de Producto */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Tipo de Producto
          </label>
          <div className="grid grid-cols-3 gap-4">
            {productTypes.map((product) => {
              const Icon = product.icon;
              return (
                <button
                  key={product.id}
                  onClick={() => {
                    setProductType(product.id);
                    setShowResult(false);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    productType === product.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${
                    productType === product.id ? 'text-pink-500' : 'text-gray-400'
                  }`} />
                  <p className="font-semibold text-gray-900">{product.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Porciones */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Users className="w-4 h-4 inline mr-2" />
            Número de Porciones: <span className="text-pink-500 text-xl">{portions}</span>
          </label>
          <input
            type="range"
            min="10"
            max="150"
            step="5"
            value={portions}
            onChange={(e) => {
              setPortions(parseInt(e.target.value));
              setShowResult(false);
            }}
            className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10</span>
            <span>50</span>
            <span>100</span>
            <span>150+</span>
          </div>
        </div>

        {/* Nivel de Decoración */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Nivel de Decoración
          </label>
          <div className="grid grid-cols-3 gap-4">
            {decorationLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => {
                  setDecorationLevel(level.id);
                  setShowResult(false);
                }}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  decorationLevel === level.id
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <p className="font-bold text-gray-900 mb-1">{level.name}</p>
                <p className="text-xs text-gray-600">{level.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Sabor */}
        <div>
          <label htmlFor="flavor" className="block text-sm font-semibold text-gray-700 mb-3">
            Sabor
          </label>
          <select
            id="flavor"
            value={flavor}
            onChange={(e) => {
              setFlavor(e.target.value);
              setShowResult(false);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            {flavors.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Botón Calcular */}
        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calcular Precio
        </button>

        {/* Resultado */}
        {showResult && (
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-6 border-2 border-pink-200 animate-fadeIn">
            <p className="text-center text-gray-700 mb-2">Precio Estimado:</p>
            <p className="text-center text-4xl font-bold text-pink-600 mb-4">
              {formatPrice(estimatedPrice)}
            </p>
            <p className="text-center text-sm text-gray-600 mb-4">
              *Precio aproximado. El precio final puede variar según diseño específico y disponibilidad.
            </p>
            {portions > 50 && (
              <p className="text-center text-sm text-green-600 font-semibold mb-4">
                ¡Descuento por volumen aplicado! 🎉
              </p>
            )}
            <button
              onClick={handleWhatsAppQuote}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Solicitar Cotización por WhatsApp
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
