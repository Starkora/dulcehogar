import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Star, Heart, Award, Clock, ChefHat, Palette, User } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-pink-50 to-orange-50 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Nuestra Historia
            </h1>
            <p className="text-xl text-gray-600">
              Una tradición familiar que endulza vidas desde hace más de 10 años
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                <strong className="text-gray-800">Dulce Hogar</strong> nació del sueño de crear momentos dulces 
                y memorables para cada familia. Lo que comenzó como una pasión en la cocina de casa, 
                se ha convertido en un emprendimiento que lleva alegría a cientos de hogares.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Cada receta que preparamos tiene un toque especial: el amor y dedicación que ponemos 
                en cada ingrediente, cada decoración y cada entrega. Creemos que los postres son más 
                que un dulce, son la excusa perfecta para celebrar la vida y crear recuerdos.
              </p>

              <div className="my-12 bg-gradient-to-r from-pink-100 to-orange-100 p-8 rounded-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                  Nuestra Filosofía
                </h2>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <Star className="w-6 h-6 text-pink-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Calidad Premium:</strong> Usamos solo ingredientes de la más alta calidad
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Heart className="w-6 h-6 text-pink-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Hecho con Amor:</strong> Cada producto es elaborado artesanalmente
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Palette className="w-6 h-6 text-pink-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Diseños Únicos:</strong> Personalizamos cada pedido según tus necesidades
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-6 h-6 text-pink-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Puntualidad:</strong> Respetamos tus tiempos y fechas especiales
                    </div>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Nos especializamos en tortas personalizadas para bodas, cumpleaños y eventos corporativos, 
                así como en una amplia variedad de postres artesanales que se adaptan a todos los gustos 
                y necesidades dietéticas.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Nuestro Equipo
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ChefHat className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">María García</h3>
                <p className="text-pink-500 font-semibold mb-3">Chef Pastelera</p>
                <p className="text-gray-600">
                  15 años de experiencia creando delicias
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Carlos Ruiz</h3>
                <p className="text-pink-500 font-semibold mb-3">Decorador</p>
                <p className="text-gray-600">
                  Especialista en diseños personalizados
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ana López</h3>
                <p className="text-pink-500 font-semibold mb-3">Atención al Cliente</p>
                <p className="text-gray-600">
                  Ayudándote a encontrar el postre perfecto
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              ¿Quieres ser parte de nuestra historia?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contáctanos y déjanos endulzar tus momentos especiales
            </p>
            <a
              href="/contacto"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg"
            >
              Contáctanos
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
