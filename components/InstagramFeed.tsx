'use client';

import { useState, useEffect } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Cake, Sparkles, Smartphone } from 'lucide-react';
import { getInstagramPosts, type InstagramPost } from '@/lib/siteConfig';

interface InstagramFeedProps {
  maxPosts?: number;
  columns?: 2 | 3 | 4 | 6;
}

export function InstagramFeed({ maxPosts = 6, columns = 3 }: InstagramFeedProps) {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    setInstagramPosts(getInstagramPosts());
  }, []);

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

      {posts.length > 0 ? (
        <>
          <div className={`grid grid-cols-2 ${gridCols[columns]} gap-4 mb-8`}>
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
                onMouseEnter={() => setHoveredPost(parseInt(post.id))}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay al hacer hover */}
                <div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
                  hoveredPost === parseInt(post.id) ? 'opacity-100' : 'opacity-0'
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
                    href={post.postUrl || "https://instagram.com/dulcehogar"}
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
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl">
          <Instagram className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl mb-2">
            No hay posts de Instagram todavía
          </p>
          <p className="text-gray-400">
            Agrega posts desde el panel de administración
          </p>
        </div>
      )}
    </div>
  );
}

export function InstagramEmbed() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    setInstagramPosts(getInstagramPosts());
  }, []);

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

      {instagramPosts.length > 0 && (
        <div className="grid grid-cols-3 gap-1 mb-4">
          {instagramPosts.slice(0, 9).map((post: InstagramPost) => (
            <div key={post.id} className="aspect-square">
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

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
