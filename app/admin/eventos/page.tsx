'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, Calendar, Gift, Heart, AlertCircle } from 'lucide-react';
import { getSpecialEvent, saveSpecialEvent, SpecialEvent } from '@/lib/siteConfig';
import { isAuthenticated } from '@/lib/auth';

export default function AdminEventos() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);
  const [event, setEvent] = useState<SpecialEvent | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push('/admin/login');
      } else {
        const loadedEvent = getSpecialEvent();
        setEvent(loadedEvent);
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleSave = () => {
    if (event) {
      saveSpecialEvent(event);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    }
  };

  const addCombo = () => {
    if (event) {
      const newCombo = {
        id: `combo-${Date.now()}`,
        name: 'Nuevo Combo',
        description: 'Descripción del combo',
        items: ['Item 1', 'Item 2'],
        originalPrice: 100,
        discountedPrice: 80,
        servings: 'Para X personas',
        popular: false
      };
      setEvent({
        ...event,
        combos: [...event.combos, newCombo]
      });
    }
  };

  const removeCombo = (comboId: string) => {
    if (event && confirm('¿Eliminar este combo?')) {
      setEvent({
        ...event,
        combos: event.combos.filter(c => c.id !== comboId)
      });
    }
  };

  const updateCombo = (comboId: string, field: string, value: any) => {
    if (event) {
      setEvent({
        ...event,
        combos: event.combos.map(c => 
          c.id === comboId ? { ...c, [field]: value } : c
        )
      });
    }
  };

  const addComboItem = (comboId: string) => {
    if (event) {
      setEvent({
        ...event,
        combos: event.combos.map(c => 
          c.id === comboId ? { ...c, items: [...c.items, 'Nuevo item'] } : c
        )
      });
    }
  };

  const updateComboItem = (comboId: string, itemIndex: number, value: string) => {
    if (event) {
      setEvent({
        ...event,
        combos: event.combos.map(c => {
          if (c.id === comboId) {
            const newItems = [...c.items];
            newItems[itemIndex] = value;
            return { ...c, items: newItems };
          }
          return c;
        })
      });
    }
  };

  const removeComboItem = (comboId: string, itemIndex: number) => {
    if (event) {
      setEvent({
        ...event,
        combos: event.combos.map(c => {
          if (c.id === comboId) {
            return { ...c, items: c.items.filter((_, i) => i !== itemIndex) };
          }
          return c;
        })
      });
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

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No hay evento especial configurado</p>
          </div>
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
              Gestión de Eventos Especiales
            </h1>
            <p className="text-gray-600">
              Configura eventos como San Valentín, Navidad, Día de la Madre, etc.
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

        {savedMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-800 font-semibold">¡Cambios guardados exitosamente!</p>
          </div>
        )}

        {/* Información General */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-pink-500" />
            Información del Evento
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del Evento *
              </label>
              <input
                type="text"
                value={event.name}
                onChange={(e) => setEvent({ ...event, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="San Valentín 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estado
              </label>
              <button
                onClick={() => setEvent({ ...event, isActive: !event.isActive })}
                className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors ${
                  event.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-8 w-8 transform rounded-full bg-white transition-transform ${
                    event.isActive ? 'translate-x-14' : 'translate-x-2'
                  }`}
                />
                <span className={`absolute text-sm font-bold ${
                  event.isActive ? 'left-3 text-white' : 'right-3 text-gray-600'
                }`}>
                  {event.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha del Evento *
              </label>
              <input
                type="date"
                value={event.eventDate}
                onChange={(e) => setEvent({ ...event, eventDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha Límite de Pedidos *
              </label>
              <input
                type="date"
                value={event.orderDeadline}
                onChange={(e) => setEvent({ ...event, orderDeadline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Botón en Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Botón en Navegación
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEvent({ 
                  ...event, 
                  headerButton: { ...event.headerButton, show: !event.headerButton.show }
                })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  event.headerButton.show ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    event.headerButton.show ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">
                {event.headerButton.show ? 'Mostrar' : 'Ocultar'} botón en navegación
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Texto del Botón
                </label>
                <input
                  type="text"
                  value={event.headerButton.text}
                  onChange={(e) => setEvent({ 
                    ...event, 
                    headerButton: { ...event.headerButton, text: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="San Valentín"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="text"
                  value={event.headerButton.url}
                  onChange={(e) => setEvent({ 
                    ...event, 
                    headerButton: { ...event.headerButton, url: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="/san-valentin"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Banner en Home */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Banner en Página Principal
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEvent({ 
                  ...event, 
                  banner: { ...event.banner, show: !event.banner.show }
                })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  event.banner.show ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    event.banner.show ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">
                {event.banner.show ? 'Mostrar' : 'Ocultar'} banner
              </span>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título del Banner
              </label>
              <input
                type="text"
                value={event.banner.message}
                onChange={(e) => setEvent({ 
                  ...event, 
                  banner: { ...event.banner, message: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="❤️ SAN VALENTÍN 2026"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={event.banner.description}
                onChange={(e) => setEvent({ 
                  ...event, 
                  banner: { ...event.banner, description: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                rows={2}
                placeholder="Sorprende a tu pareja..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Texto del Botón
              </label>
              <input
                type="text"
                value={event.banner.buttonText}
                onChange={(e) => setEvent({ 
                  ...event, 
                  banner: { ...event.banner, buttonText: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Ver Ofertas Especiales"
              />
            </div>
          </div>
        </div>

        {/* Pop-up de Salida */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Pop-up de Salida
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setEvent({ 
                  ...event, 
                  popup: { ...event.popup, show: !event.popup.show }
                })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  event.popup.show ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    event.popup.show ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">
                {event.popup.show ? 'Mostrar' : 'Ocultar'} pop-up
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={event.popup.title}
                  onChange={(e) => setEvent({ 
                    ...event, 
                    popup: { ...event.popup, title: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="¡San Valentín se acerca!"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción
                </label>
                <input
                  type="text"
                  value={event.popup.description}
                  onChange={(e) => setEvent({ 
                    ...event, 
                    popup: { ...event.popup, description: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="Para tu pedido de San Valentín"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descuento (%)
                </label>
                <input
                  type="number"
                  value={event.popup.discount}
                  onChange={(e) => setEvent({ 
                    ...event, 
                    popup: { ...event.popup, discount: Number(e.target.value) }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Código Promocional
                </label>
                <input
                  type="text"
                  value={event.popup.code}
                  onChange={(e) => setEvent({ 
                    ...event, 
                    popup: { ...event.popup, code: e.target.value.toUpperCase() }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 uppercase"
                  placeholder="AMOR2026"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Compra Mínima (S/)
                </label>
                <input
                  type="number"
                  value={event.popup.minAmount}
                  onChange={(e) => setEvent({ 
                    ...event, 
                    popup: { ...event.popup, minAmount: Number(e.target.value) }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  min="0"
                  step="10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Combos Especiales */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Gift className="w-6 h-6 text-pink-500" />
              Combos Especiales
            </h2>
            <button
              onClick={addCombo}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <Plus className="w-5 h-5" />
              Agregar Combo
            </button>
          </div>

          <div className="space-y-6">
            {event.combos.map((combo, index) => (
              <div key={combo.id} className="border-2 border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Combo {index + 1}</h3>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={combo.popular}
                        onChange={(e) => updateCombo(combo.id, 'popular', e.target.checked)}
                        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className="text-sm text-gray-700">Más Popular</span>
                    </label>
                    <button
                      onClick={() => removeCombo(combo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre del Combo
                    </label>
                    <input
                      type="text"
                      value={combo.name}
                      onChange={(e) => updateCombo(combo.id, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción
                    </label>
                    <input
                      type="text"
                      value={combo.description}
                      onChange={(e) => updateCombo(combo.id, 'description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Items Incluidos
                    </label>
                    <button
                      onClick={() => addComboItem(combo.id)}
                      className="text-sm text-pink-500 hover:text-pink-600 font-semibold"
                    >
                      + Agregar Item
                    </button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {combo.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateComboItem(combo.id, itemIndex, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                          onClick={() => removeComboItem(combo.id, itemIndex)}
                          className="px-3 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Precio Original (S/)
                    </label>
                    <input
                      type="number"
                      value={combo.originalPrice}
                      onChange={(e) => updateCombo(combo.id, 'originalPrice', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Precio con Descuento (S/)
                    </label>
                    <input
                      type="number"
                      value={combo.discountedPrice}
                      onChange={(e) => updateCombo(combo.id, 'discountedPrice', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                      min="0"
                      step="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Para cuántas personas
                    </label>
                    <input
                      type="text"
                      value={combo.servings}
                      onChange={(e) => updateCombo(combo.id, 'servings', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                      placeholder="Para 2 personas"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Guardar */}
        <div className="sticky bottom-6 z-10">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Save className="w-6 h-6" />
            Guardar Todos los Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
