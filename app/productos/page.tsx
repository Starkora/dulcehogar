'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const products = [
  {
    id: 1,
    name: 'Torta de Chocolate',
    description: 'Deliciosa torta de chocolate con ganache y decoración personalizada',
    price: 45,
    image: '/images/chocolate-cake.jpg',
    category: 'Tortas'
  },
  {
    id: 2,
    name: 'Torta de Vainilla',
    description: 'Esponjosa torta de vainilla con crema y frutas frescas',
    price: 42,
    image: '/images/vanilla-cake.jpg',
    category: 'Tortas'
  },
  {
    id: 3,
    name: 'Torta Red Velvet',
    description: 'Clásica torta red velvet con frosting de queso crema',
    price: 48,
    image: '/images/red-velvet.jpg',
    category: 'Tortas'
  },
  {
    id: 4,
    name: 'Cupcakes Variados',
    description: 'Pack de 6 cupcakes con diferentes sabores y decoraciones',
    price: 25,
    image: '/images/cupcakes.jpg',
    category: 'Cupcakes'
  },
  {
    id: 5,
    name: 'Cupcakes de Chocolate',
    description: 'Pack de 6 cupcakes de chocolate con buttercream',
    price: 22,
    image: '/images/chocolate-cupcakes.jpg',
    category: 'Cupcakes'
  },
  {
    id: 6,
    name: 'Cupcakes de Vainilla',
    description: 'Pack de 6 cupcakes de vainilla con decoración temática',
    price: 22,
    image: '/images/vanilla-cupcakes.jpg',
    category: 'Cupcakes'
  },
  {
    id: 7,
    name: 'Galletas Decoradas',
    description: 'Docena de galletas artesanales con diseños personalizados',
    price: 18,
    image: '/images/cookies.jpg',
    category: 'Galletas'
  },
  {
    id: 8,
    name: 'Brownies Premium',
    description: 'Caja de 9 brownies con nueces y chips de chocolate',
    price: 20,
    image: '/images/brownies.jpg',
    category: 'Postres'
  },
  {
    id: 9,
    name: 'Macarons Franceses',
    description: 'Caja de 12 macarons de sabores variados',
    price: 28,
    image: '/images/macarons.jpg',
    category: 'Postres'
  }
];

const categories = ['Todos', 'Tortas', 'Cupcakes', 'Galletas', 'Postres'];

export default function ProductsPage() {
  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Nuestros Productos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada creación es elaborada con ingredientes frescos y amor
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 bg-white hover:bg-pink-500 hover:text-white text-gray-700 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Custom Orders */}
          <div className="mt-20 bg-white rounded-3xl p-12 shadow-xl text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Buscas algo especial?
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Realizamos pedidos personalizados para cualquier ocasión
            </p>
            <a
              href="/contacto"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg"
            >
              Solicitar Pedido Personalizado
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
