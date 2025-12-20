import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PriceCalculator } from '@/components/PriceCalculator';
import { Calculator } from 'lucide-react';

export const metadata = {
  title: 'Calculadora de Precios - Dulce Hogar',
  description: 'Calcula el precio estimado de tu pedido de repostería. Personaliza tu torta, cupcakes o galletas según tus necesidades.',
};

export default function CalculadoraPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <Calculator className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Calculadora de Precios
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Obtén una estimación instantánea del precio de tu pedido personalizado.
            Ajusta las opciones según tus necesidades y recibe una cotización al instante.
          </p>
        </div>
        
        <PriceCalculator />

        {/* Información Adicional */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Información Importante
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Los precios mostrados son estimaciones y pueden variar según el diseño específico solicitado.
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Para pedidos especiales o diseños complejos, contáctanos directamente para una cotización personalizada.
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Los descuentos por volumen se aplican automáticamente en pedidos grandes.
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Todos nuestros productos son elaborados con ingredientes frescos de la más alta calidad.
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
