'use client';

import { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Cake, Sparkles, Smartphone } from 'lucide-react';

// Simulación de posts de Instagram (en producción usarías Instagram Basic Display API)
const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    likes: 234,
    comments: 12,
    caption: 'Torta de chocolate con fresas frescas para un cumpleaños muy especial...',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1588195538326-c5acd4cbbe01?w=400&h=400&fit=crop',
    likes: 189,
    comments: 8,
    caption: 'Cupcakes personalizados para baby shower. ¡Dulzura en cada bocado!',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=400&fit=crop',
    likes: 312,
    comments: 15,
    caption: 'Torta de bodas elegante con detalles en oro comestible',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=400&fit=crop',
    likes: 156,
    comments: 6,
    caption: 'Galletas decoradas para Primera Comunión. Diseños únicos y deliciosos',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=400&fit=crop',
    likes: 278,
    comments: 11,
    caption: 'Red Velvet con decoración artística. ¡Arte comestible!',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=400&fit=crop',
    likes: 201,
    comments: 9,
    caption: 'Mini tartas personalizadas para eventos corporativos',
  },
];

interface InstagramFeedProps {
  maxPosts?: number;
  columns?: 2 | 3 | 4 | 6;
}

export function InstagramFeed({ maxPosts = 6, columns = 3 }: InstagramFeedProps) {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const posts = instagramPosts.slice(0, maxPosts);

  const gridCols = {
    2: 'grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    6: 'md:grid-cols-6'
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Instagram className="w-8 h-8 text-pink-500" />
        <h2 className="text-3xl font-bold text-gray-900">
          Síguenos en Instagram
        </h2>
      </div>

      <p className="text-center text-gray-600 mb-8">
        Inspírate con nuestras últimas creaciones y mantente al día con nuestras novedades
      </p>

      <div className={`grid grid-cols-2 ${gridCols[columns]} gap-4 mb-8`}>
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
            onMouseEnter={() => setHoveredPost(post.id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay al hacer hover */}
            <div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
              hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="flex items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 fill-white" />
                  <span className="font-bold text-lg">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  <span className="font-bold text-lg">{post.comments}</span>
                </div>
              </div>
              <a
                href="https://instagram.com/dulcehogar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white text-pink-600 px-4 py-2 rounded-full font-semibold hover:bg-pink-50 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
                Ver en Instagram
              </a>
            </div>

            {/* Caption oculto para accesibilidad */}
            <span className="sr-only">{post.caption}</span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://instagram.com/dulcehogar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
        >
          <Instagram className="w-5 h-5" />
          Síguenos @dulcehogar
        </a>
      </div>
    </div>
  );
}

export function InstagramEmbed() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900">@dulcehogar</p>
            <p className="text-sm text-gray-500">Dulce Hogar Repostería</p>
          </div>
        </div>
        <a
          href="https://instagram.com/dulcehogar"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
        >
          Seguir
        </a>
      </div>

      <div className="text-gray-700 mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <Cake className="w-4 h-4 text-pink-500 flex-shrink-0" />
          <span>Repostería artesanal en Bogotá</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0" />
          <span>Tortas, cupcakes y galletas personalizadas</span>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-pink-500 flex-shrink-0" />
          <span>Pedidos por WhatsApp</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mb-4">
        {instagramPosts.slice(0, 9).map((post) => (
          <div key={post.id} className="aspect-square">
            <img
              src={post.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <a
        href="https://instagram.com/dulcehogar"
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center text-pink-600 hover:text-pink-700 font-semibold"
      >
        Ver más en Instagram →
      </a>
    </div>
  );
}
