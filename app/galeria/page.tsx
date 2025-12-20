import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PhotoGallery } from '@/components/PhotoGallery';

export const metadata = {
  title: 'Galería de Fotos - Dulce Hogar',
  description: 'Explora nuestra galería de tortas, cupcakes y postres personalizados para bodas, cumpleaños y eventos especiales.',
};

export default function GaleriaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <PhotoGallery />
        </div>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Te Inspiraste?
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Podemos crear algo similar para tu evento especial
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/cotizacion"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Solicitar Cotización
              </a>
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
