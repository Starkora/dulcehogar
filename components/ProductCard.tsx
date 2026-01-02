import Image from 'next/image';
import { Cake, Cookie, Dessert } from 'lucide-react';

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
      {/* Image Placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
        {getIcon()}
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
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
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
