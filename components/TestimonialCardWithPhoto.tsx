'use client';

import { useState } from 'react';
import { Star, Camera, X } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  event: string;
  date: string;
  photoUrl?: string;
}

export function TestimonialCardWithPhoto({
  name,
  rating,
  comment,
  event,
  date,
  photoUrl
}: TestimonialCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
        {/* Foto del producto/evento si existe */}
        {photoUrl && !imageError && (
          <div 
            className="mb-4 -mx-6 -mt-6 rounded-t-2xl overflow-hidden cursor-pointer group"
            onClick={() => setShowFullImage(true)}
          >
            <div className="relative h-48 bg-gray-100">
              <Image
                src={photoUrl}
                alt={`Foto de ${event}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  Ver imagen completa
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-gray-700 mb-4 leading-relaxed line-clamp-4">
          "{comment}"
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="font-bold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{event}</p>
          </div>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>

      {/* Modal de imagen completa */}
      {showFullImage && photoUrl && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <button
            onClick={() => setShowFullImage(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={photoUrl}
              alt={`Foto de ${event}`}
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
