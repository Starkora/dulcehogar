'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';

interface SiteConfig {
  showHero: boolean;
  showAbout: boolean;
  showProducts: boolean;
  showPromotions: boolean;
  showGallery: boolean;
  showTestimonials: boolean;
  showInstagram: boolean;
}

export default function AdminConfiguracion() {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfig>({
    showHero: true,
    showAbout: true,
    showProducts: true,
    showPromotions: true,
    showGallery: true,
    showTestimonials: true,
    showInstagram: true
  });
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push('/admin/login');
      } else {
        loadConfig();
      }
    };
    checkAuth();
  }, [router]);

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/site-config');
      const data = await response.json();
      
      // Mergear configuración de BD con valores por defecto
      setConfig({
        showHero: data.showHero ?? true,
        showAbout: data.showAbout ?? true,
        showProducts: data.showProducts ?? true,
        showPromotions: data.showPromotions ?? true,
        showGallery: data.showGallery ?? true,
        showTestimonials: data.showTestimonials ?? true,
        showInstagram: data.showInstagram ?? true
      });
    } catch (error) {
      console.error('Error loading config:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleToggle = (key: keyof SiteConfig) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  const handleSave = async () => {
    try {
      await fetch('/api/site-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving config:', error);
      alert('Error al guardar la configuración');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Configuración del Sitio
            </h1>
            <p className="text-gray-600">
              Controla qué secciones se muestran en tu sitio web
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

        {saved && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
            ✓ Configuración guardada correctamente
          </div>
        )}

        {/* Visibilidad de Secciones */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Visibilidad de Secciones
          </h2>

          <div className="space-y-4">
            {[
              { key: 'showHero' as const, label: 'Sección Hero (Banner Principal)', desc: 'Banner principal con título y botones' },
              { key: 'showAbout' as const, label: 'Sección Nosotros', desc: 'Historia y descripción del negocio' },
              { key: 'showProducts' as const, label: 'Productos Destacados', desc: 'Muestra productos en la página principal' },
              { key: 'showPromotions' as const, label: 'Promociones', desc: 'Tarjetas de ofertas y descuentos' },
              { key: 'showGallery' as const, label: 'Galería de Creaciones', desc: 'Galería de fotos de productos' },
              { key: 'showTestimonials' as const, label: 'Testimonios/Reseñas', desc: 'Opiniones de clientes' },
              { key: 'showInstagram' as const, label: 'Feed de Instagram', desc: 'Integración con Instagram' }
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{label}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
                <button
                  onClick={() => handleToggle(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    config[key]
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                  }`}
                >
                  {config[key] ? (
                    <>
                      <Eye className="w-5 h-5" />
                      Visible
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-5 h-5" />
                      Oculto
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Guardar */}
        <button
          onClick={handleSave}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Save className="w-5 h-5" />
          Guardar Configuración
        </button>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> Los cambios se aplicarán inmediatamente en tu sitio web. Recarga la página principal para ver los cambios.
          </p>
        </div>
      </div>
    </div>
  );
}
