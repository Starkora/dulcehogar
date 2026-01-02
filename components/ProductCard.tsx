'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Cake, Cookie, Dessert, ChevronDown, ChevronUp } from 'lucide-react';

interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription = product.description.length > 100;
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getIcon = () => {
    if (product.name.toLowerCase().includes('galleta') || product.name.toLowerCase().includes('cookie')) {
      return <Cookie className="w-24 h-24 text-pink-400" />;
    } else if (product.name.toLowerCase().includes('cupcake')) {
      return <Cake className="w-24 h-24 text-pink-400" />;
    } else {
      return <Cake className="w-24 h-24 text-pink-400" />;
    }
  };

  const handleOrder = () => {
    const phoneNumber = '573001234567';
    const message = encodeURIComponent(
      `¡Hola! Me interesa ordenar: ${product.name} - ${formatPrice(product.price)}\n\n${product.description}`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-pink-100 to-orange-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            {getIcon()}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {product.category && (
          <span className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            {product.category}
          </span>
        )}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {product.name}
        </h3>
        <div className="mb-4">
          <p className={`text-gray-600 ${!isExpanded && isLongDescription ? 'line-clamp-2' : ''}`}>
            {product.description}
          </p>
          {isLongDescription && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-pink-500 hover:text-pink-600 text-sm font-medium mt-1 flex items-center gap-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  Ver menos <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Ver más <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-pink-500">
            {formatPrice(product.price)}
          </span>
          <button 
            onClick={handleOrder}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            Pedir
          </button>
        </div>
      </div>
    </div>
  );
}
