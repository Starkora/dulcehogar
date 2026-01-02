'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Settings, Package, Image, Tag, Eye, ArrowLeft, LogOut, Instagram } from 'lucide-react';
import { isAuthenticated, logout } from '@/lib/auth';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-600">
              Gestiona el contenido de tu sitio web
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al Sitio
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
            >
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Productos */}
          <Link
            href="/admin/productos"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-pink-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Productos
            </h2>
            <p className="text-gray-600">
              Agrega, edita o elimina productos de tu catálogo
            </p>
          </Link>

          {/* Galería */}
          <Link
            href="/admin/galeria"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Image className="w-8 h-8 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Galería
            </h2>
            <p className="text-gray-600">
              Gestiona las imágenes de tus creaciones
            </p>
          </Link>

          {/* Promociones */}
          <Link
            href="/admin/promociones"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Tag className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Promociones
            </h2>
            <p className="text-gray-600">
              Crea y gestiona ofertas especiales
            </p>
          </Link>

          {/* Configuración */}
          <Link
            href="/admin/configuracion"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Configuración
            </h2>
            <p className="text-gray-600">
              Controla qué secciones mostrar en el sitio
            </p>
          </Link>

          {/* Instagram */}
          <Link
            href="/admin/instagram"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
              <Instagram className="w-8 h-8 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Instagram
            </h2>
            <p className="text-gray-600">
              Gestiona los posts que aparecen en tu feed
            </p>
          </Link>

          {/* Reseñas */}
          <Link
            href="/admin/reviews"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Reseñas
            </h2>
            <p className="text-gray-600">
              Modera y gestiona las reseñas de clientes
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
