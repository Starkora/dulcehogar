'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getProducts } from '@/lib/siteConfig';
import { useState, useEffect } from 'react';

const categories = ['Todos', 'Tortas', 'Cupcakes', 'Galletas', 'Postres'];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

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
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'bg-white hover:bg-pink-500 hover:text-white text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-xl">
                No hay productos disponibles en este momento.
              </p>
              <p className="text-gray-400 mt-2">
                Agrega productos desde el panel de administración.
              </p>
            </div>
          )}

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
