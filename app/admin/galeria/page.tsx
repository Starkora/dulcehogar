'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { GalleryImage, getGalleryImages, addGalleryImage, deleteGalleryImage } from '@/lib/siteConfig';
import { isAuthenticated } from '@/lib/auth';
import { ImageUpload } from '@/components/ImageUpload';

export default function AdminGaleria() {
  const router = useRouter();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    category: 'Todas'
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setImages(getGalleryImages());
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryImage(formData);
    setImages(getGalleryImages());
    setFormData({ url: '', title: '', category: 'Todas' });
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta imagen?')) {
      deleteGalleryImage(id);
      setImages(getGalleryImages());
    }
  };

  const categories = ['Todas', 'Bodas', 'Cumpleaños', 'Comunión', 'Corporativo', 'Baby Shower'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Gestión de Galería
            </h1>
            <p className="text-gray-600">
              Administra las imágenes de tus creaciones
            </p>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Link>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Agregar Nueva Imagen
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUpload
              value={formData.url}
              onChange={(url) => setFormData({ ...formData, url })}
              folder="galeria"
              label="Imagen de la Galería"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título de la Imagen *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Ej: Torta de Boda Elegante"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Agregar a Galería
            </button>
          </form>
        </div>

        {/* Galería */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Imágenes en Galería ({images.length})
          </h2>

          {images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay imágenes en la galería</p>
              <p className="text-gray-400 mt-2">Agrega tu primera imagen usando el formulario arriba</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <p className="text-white font-semibold text-sm text-center px-2 mb-2">
                      {image.title}
                    </p>
                    <span className="text-xs text-pink-300 mb-3">{image.category}</span>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
