'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, Save, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { Promotion, getPromotions, addPromotion, updatePromotion, deletePromotion } from '@/lib/siteConfig';
import { isAuthenticated } from '@/lib/auth';

export default function AdminPromociones() {
  const router = useRouter();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [formData, setFormData] = useState({
    type: 'discount' as 'discount' | 'seasonal',
    title: '',
    description: '',
    discount: 0,
    code: '',
    validUntil: '',
    ctaText: '',
    ctaLink: '/contacto',
    isActive: true
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setPromotions(getPromotions());
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
    
    if (editingPromotion) {
      updatePromotion(editingPromotion.id, formData);
    } else {
      addPromotion(formData);
    }
    
    setPromotions(getPromotions());
    resetForm();
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      type: promotion.type,
      title: promotion.title,
      description: promotion.description,
      discount: promotion.discount || 0,
      code: promotion.code || '',
      validUntil: promotion.validUntil || '',
      ctaText: promotion.ctaText,
      ctaLink: promotion.ctaLink,
      isActive: promotion.isActive
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta promoción?')) {
      deletePromotion(id);
      setPromotions(getPromotions());
    }
  };

  const toggleActive = (id: string, currentStatus: boolean) => {
    updatePromotion(id, { isActive: !currentStatus });
    setPromotions(getPromotions());
  };

  const resetForm = () => {
    setFormData({
      type: 'discount',
      title: '',
      description: '',
      discount: 0,
      code: '',
      validUntil: '',
      ctaText: '',
      ctaLink: '/contacto',
      isActive: true
    });
    setEditingPromotion(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Gestión de Promociones
            </h1>
            <p className="text-gray-600">
              Crea y administra ofertas especiales
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingPromotion ? 'Editar Promoción' : 'Nueva Promoción'}
            </h2>
            {isEditing && (
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Promoción *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'discount' | 'seasonal' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="discount">Descuento</option>
                  <option value="seasonal">Especial/Temporada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Ej: 15% de Descuento"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                rows={3}
                required
              />
            </div>

            {formData.type === 'discount' && (
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descuento (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
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
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="DULCE15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Válido Hasta
                  </label>
                  <input
                    type="text"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="31 de Diciembre"
                  />
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Texto del Botón *
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Reclamar Descuento"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enlace del Botón *
                </label>
                <input
                  type="text"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="/contacto"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-pink-500"
              />
              <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                Promoción activa (se mostrará en el sitio)
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              {editingPromotion ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editingPromotion ? 'Guardar Cambios' : 'Crear Promoción'}
            </button>
          </form>
        </div>

        {/* Lista de Promociones */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Promociones Actuales ({promotions.length})
          </h2>

          {promotions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay promociones registradas</p>
              <p className="text-gray-400 mt-2">Crea tu primera promoción usando el formulario arriba</p>
            </div>
          ) : (
            <div className="space-y-4">
              {promotions.map((promo) => (
                <div key={promo.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-800 text-xl">{promo.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          promo.type === 'discount' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {promo.type === 'discount' ? 'Descuento' : 'Especial'}
                        </span>
                        <button
                          onClick={() => toggleActive(promo.id, promo.isActive)}
                          className="flex items-center gap-1"
                        >
                          {promo.isActive ? (
                            <ToggleRight className="w-8 h-8 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="text-gray-600 mb-3">{promo.description}</p>
                      {promo.code && (
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Código:</span> {promo.code}
                        </p>
                      )}
                      {promo.validUntil && (
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Válido hasta:</span> {promo.validUntil}
                        </p>
                      )}
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">Botón:</span> {promo.ctaText} → {promo.ctaLink}
                      </p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
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
