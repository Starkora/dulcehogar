'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { getGalleryImages, type GalleryImage as GalleryImageType } from '@/lib/siteConfig';

interface PhotoGalleryProps {
  maxImages?: number;
}

export function PhotoGallery({ maxImages }: PhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>([]);

  useEffect(() => {
    setGalleryImages(getGalleryImages());
  }, []);

  // Obtener categorías únicas de las imágenes
  const categories = ['Todas', ...Array.from(new Set(galleryImages.map(img => img.category)))];

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
      {displayImages.length > 0 ? (
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
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl">
          <Images className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl mb-2">
            No hay imágenes en la galería todavía
          </p>
          <p className="text-gray-400">
            Agrega imágenes desde el panel de administración
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && displayImages.length > 0 && (
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
