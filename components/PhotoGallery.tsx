'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  category: string;
  title: string;
  description?: string;
}

// Imágenes de ejemplo (en producción vendrían de una base de datos o CMS)
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop',
    category: 'Bodas',
    title: 'Torta de Bodas Elegante',
    description: '3 pisos con flores naturales'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1588195538326-c5acd4cbbe01?w=800&h=800&fit=crop',
    category: 'Cumpleaños',
    title: 'Cupcakes Personalizados',
    description: 'Decoración temática'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=800&fit=crop',
    category: 'Bodas',
    title: 'Torta con Detalles Dorados',
    description: 'Oro comestible y flores'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=800&fit=crop',
    category: 'Comunión',
    title: 'Galletas Decoradas',
    description: 'Diseños personalizados'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&h=800&fit=crop',
    category: 'Cumpleaños',
    title: 'Red Velvet Artística',
    description: 'Decoración pintada a mano'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&h=800&fit=crop',
    category: 'Corporativo',
    title: 'Mini Tartas',
    description: 'Eventos empresariales'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=800&fit=crop',
    category: 'Cumpleaños',
    title: 'Torta de Chocolate Premium',
    description: 'Cobertura de ganache'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=800&fit=crop',
    category: 'Baby Shower',
    title: 'Cupcakes Pastel',
    description: 'Colores suaves'
  },
];

const categories = ['Todas', 'Bodas', 'Cumpleaños', 'Comunión', 'Corporativo', 'Baby Shower'];

interface PhotoGalleryProps {
  maxImages?: number;
}

export function PhotoGallery({ maxImages }: PhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'Todas'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const displayImages = maxImages ? filteredImages.slice(0, maxImages) : filteredImages;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? displayImages.length - 1 : lightboxIndex - 1
      );
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <Images className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Galería de Creaciones
        </h2>
        <p className="text-xl text-gray-600">
          Explora nuestras obras maestras dulces
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-pink-50 border-2 border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayImages.map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-bold text-sm">{image.title}</p>
                {image.description && (
                  <p className="text-xs opacity-90">{image.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Cerrar"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          {/* Image */}
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={displayImages[lightboxIndex].url}
              alt={displayImages[lightboxIndex].title}
              fill
              className="object-contain"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-6 mx-16">
              <h3 className="text-2xl font-bold mb-2">
                {displayImages[lightboxIndex].title}
              </h3>
              <p className="text-gray-300">
                {displayImages[lightboxIndex].description}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Categoría: {displayImages[lightboxIndex].category} • 
                Imagen {lightboxIndex + 1} de {displayImages.length}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}
    </div>
  );
}
