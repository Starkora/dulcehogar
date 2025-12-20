import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickQuoteForm } from '@/components/QuickQuoteForm';
import { MessageSquare, Zap, DollarSign, Palette } from 'lucide-react';

export const metadata = {
  title: 'Solicitar Cotización - Dulce Hogar',
  description: 'Solicita una cotización rápida para tu evento. Te responderemos de inmediato con precios y disponibilidad.',
};

export default function CotizacionPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <MessageSquare className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Solicita tu Cotización
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Completa el formulario y te contactaremos de inmediato por WhatsApp con una cotización personalizada para tu evento.
          </p>
        </div>
        
        <QuickQuoteForm />

        {/* Beneficios */}
        <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Respuesta Inmediata</h3>
            <p className="text-sm text-gray-600">
              Te contactamos en menos de 30 minutos
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Sin Compromiso</h3>
            <p className="text-sm text-gray-600">
              Cotización gratuita y sin obligación
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Personalizado</h3>
            <p className="text-sm text-gray-600">
              Diseños únicos para tu evento especial
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
