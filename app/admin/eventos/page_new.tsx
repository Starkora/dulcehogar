'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, Calendar, Gift, Heart, AlertCircle, Package, Upload, Eye, EyeOff } from 'lucide-react';
import { 
  getSpecialEvent, 
  saveSpecialEvent, 
  SpecialEvent,
  EventProduct,
  getEventProducts,
  addEventProduct,
  updateEventProduct,
  deleteEventProduct,
  archiveEventProduct
} from '@/lib/siteConfig';
import { isAuthenticated } from '@/lib/auth';

export default function AdminEventos() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);
  const [event, setEvent] = useState<SpecialEvent | null>(null);
  const [eventProducts, setEventProducts] = useState<EventProduct[]>([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<EventProduct>>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    image: '',
    unitType: 'unidad',
    quantity: 1,
    servings: undefined,
    displayOrder: 0
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      const loadedEvent = getSpecialEvent();
      setEvent(loadedEvent);
      if (loadedEvent) {
        const products = getEventProducts(loadedEvent.id);
        setEventProducts(products);
      }
      setIsLoading(false);
    }
  }, [router]);

  const handleSave = () => {
    if (event) {
      saveSpecialEvent(event);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    }
  };

  // Funciones para productos de eventos
  const handleAddProduct = () => {
    if (event && newProduct.name && newProduct.price) {
      const product = addEventProduct({
        eventId: event.id,
        name: newProduct.name!,
        description: newProduct.description!,
        price: newProduct.price!,
        originalPrice: newProduct.originalPrice,
        image: newProduct.image!,
        unitType: newProduct.unitType!,
        quantity: newProduct.quantity,
        servings: newProduct.servings,
        status: 'active',
        displayOrder: newProduct.displayOrder
      });
      
      setEventProducts([...eventProducts, product]);
      setShowAddProductForm(false);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        image: '',
        unitType: 'unidad',
        quantity: 1,
        servings: undefined,
        displayOrder: 0
      });
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
    }
  };

  const handleUpdateProduct = (id: string, updates: Partial<EventProduct>) => {
    updateEventProduct(id, updates);
    setEventProducts(eventProducts.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Desactivar este producto? (Se puede reactivar después)')) {
      deleteEventProduct(id);
      setEventProducts(eventProducts.filter(p => p.id !== id));
    }
  };

  const handleArchiveProduct = (id: string) => {
    if (confirm('¿Archivar este producto? (Se guardará para futuros eventos)')) {
      archiveEventProduct(id);
      setEventProducts(eventProducts.filter(p => p.id !== id));
    }
  };

  // Funciones para combos (las mismas de antes)
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

        {/* Información General - AQUÍ VA EL CÓDIGO EXISTENTE */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-pink-500" />
            Información del Evento
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                <span className={`absolute text-xs font-semibold ${event.isActive ? 'left-3 text-white' : 'right-3 text-gray-600'}`}>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {/* NUEVA SECCIÓN: PRODUCTOS DEL EVENTO */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="w-6 h-6 text-pink-500" />
              Productos Exclusivos del Evento
            </h2>
            <button
              onClick={() => setShowAddProductForm(!showAddProductForm)}
              className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              <Plus className="w-5 h-5" />
              Agregar Producto
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Estos productos son exclusivos para este evento y se separan de los productos regulares.
          </p>

          {/* Formulario para agregar producto */}
          {showAddProductForm && (
            <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Nuevo Producto de Evento</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="Torta Corazón Rojo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL de Imagen *
                  </label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    rows={3}
                    placeholder="Descripción detallada del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Precio Regular (S/) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.originalPrice || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Precio con Descuento (S/) *
                  </label>
                  <input
                    type="number"
                    value={newProduct.price || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Unidad
                  </label>
                  <select
                    value={newProduct.unitType}
                    onChange={(e) => setNewProduct({ ...newProduct, unitType: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="unidad">Unidad</option>
                    <option value="paquete">Paquete</option>
                    <option value="docena">Docena</option>
                    <option value="kilo">Kilo</option>
                    <option value="porcion">Porción</option>
                  </select>
                </div>

                {newProduct.unitType !== 'unidad' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      value={newProduct.quantity || 1}
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                      min="1"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Porciones (opcional)
                  </label>
                  <input
                    type="number"
                    value={newProduct.servings || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, servings: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    min="1"
                    placeholder="Para cuántas personas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Orden de visualización
                  </label>
                  <input
                    type="number"
                    value={newProduct.displayOrder || 0}
                    onChange={(e) => setNewProduct({ ...newProduct, displayOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Guardar Producto
                </button>
                <button
                  onClick={() => setShowAddProductForm(false)}
                  className="px-6 py-3 border-2 border-gray-300 hover:bg-gray-50 rounded-lg font-semibold transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de productos del evento */}
          {eventProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No hay productos exclusivos para este evento aún.</p>
              <p className="text-sm">Agrega productos especiales que solo estarán disponibles durante este evento.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {eventProducts.map((product) => (
                <div key={product.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-all">
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">S/ {product.originalPrice}</span>
                        )}
                        <span className="text-lg font-bold text-pink-600">S/ {product.price}</span>
                      </div>

                      <div className="flex gap-2 text-xs text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded">{product.unitType}</span>
                        {product.servings && <span className="bg-gray-100 px-2 py-1 rounded">{product.servings} personas</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1"
                    >
                      <EyeOff className="w-4 h-4" />
                      Desactivar
                    </button>
                    <button
                      onClick={() => handleArchiveProduct(product.id)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Archivar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CONTINÚA CON LAS DEMÁS SECCIONES: Botón de Navegación, Banner, Popup, Combos, etc. */}
        {/* Por brevedad, copio solo la estructura de combos */}

        {/* Gestión de Combos */}
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
              <div key={combo.id} className="border-2 border-pink-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Combo #{index + 1}</h3>
                  <button
                    onClick={() => removeCombo(combo.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
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

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={combo.popular || false}
                        onChange={(e) => updateCombo(combo.id, 'popular', e.target.checked)}
                        className="w-5 h-5 text-pink-500 rounded focus:ring-2 focus:ring-pink-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Marcar como Popular</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Items incluidos
                  </label>
                  <div className="space-y-2">
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
                          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addComboItem(combo.id)}
                      className="w-full px-4 py-2 border-2 border-dashed border-gray-300 hover:border-pink-500 rounded-lg text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      + Agregar Item
                    </button>
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
