'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { SiteConfig, getSiteConfig, updateSiteConfig } from '@/lib/siteConfig';
import { isAuthenticated } from '@/lib/auth';

export default function AdminConfiguracion() {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfig>(getSiteConfig());
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
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

  const handleToggle = (key: keyof SiteConfig) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  const handleBannerChange = (field: string, value: any) => {
    setConfig({
      ...config,
      urgencyBanner: { ...config.urgencyBanner, [field]: value }
    });
  };

  const handleSave = () => {
    updateSiteConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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

        {/* Banner de Urgencia */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Banner de Urgencia (Superior)
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Mostrar Banner</h3>
                <p className="text-sm text-gray-600">Banner superior con cuenta regresiva</p>
              </div>
              <button
                onClick={() => handleBannerChange('show', !config.urgencyBanner.show)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  config.urgencyBanner.show
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                }`}
              >
                {config.urgencyBanner.show ? (
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

            {config.urgencyBanner.show && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje del Banner
                  </label>
                  <input
                    type="text"
                    value={config.urgencyBanner.message}
                    onChange={(e) => handleBannerChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="¡Última oportunidad! Pedidos para Año Nuevo..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Días Restantes
                    </label>
                    <input
                      type="number"
                      value={config.urgencyBanner.daysLeft}
                      onChange={(e) => handleBannerChange('daysLeft', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Horas Restantes
                    </label>
                    <input
                      type="number"
                      value={config.urgencyBanner.hoursLeft}
                      onChange={(e) => handleBannerChange('hoursLeft', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      min="0"
                      max="23"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Popup de Salida (Exit Intent) */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Popup de Oferta (Exit Intent)
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Mostrar Popup</h3>
                <p className="text-sm text-gray-600">Popup con oferta cuando el usuario intenta salir</p>
              </div>
              <button
                onClick={() => setConfig({ ...config, exitPopup: { ...config.exitPopup, enabled: !config.exitPopup.enabled } })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  config.exitPopup.enabled
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                }`}
              >
                {config.exitPopup.enabled ? (
                  <>
                    <Eye className="w-5 h-5" />
                    Activo
                  </>
                ) : (
                  <>
                    <EyeOff className="w-5 h-5" />
                    Inactivo
                  </>
                )}
              </button>
            </div>

            {config.exitPopup.enabled && (
              <>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descuento (%)
                    </label>
                    <input
                      type="number"
                      value={config.exitPopup.discount}
                      onChange={(e) => setConfig({ ...config, exitPopup: { ...config.exitPopup, discount: Number(e.target.value) } })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Código de Cupón
                    </label>
                    <input
                      type="text"
                      value={config.exitPopup.code}
                      onChange={(e) => setConfig({ ...config, exitPopup: { ...config.exitPopup, code: e.target.value.toUpperCase() } })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="DULCE10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monto Mínimo (S/)
                    </label>
                    <input
                      type="number"
                      value={config.exitPopup.minAmount}
                      onChange={(e) => setConfig({ ...config, exitPopup: { ...config.exitPopup, minAmount: Number(e.target.value) } })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>

                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <p className="text-sm text-pink-800">
                    <strong>Vista Previa:</strong> Obtén {config.exitPopup.discount}% de Descuento en tu primer pedido. 
                    Usa el código <strong>{config.exitPopup.code}</strong>. Válido en pedidos superiores a S/{config.exitPopup.minAmount}.
                  </p>
                </div>
              </>
            )}
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
