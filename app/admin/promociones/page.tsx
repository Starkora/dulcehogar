'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, Save, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercent?: number;
  code?: string;
  validUntil?: string;
  isActive: boolean;
}

export default function AdminPromociones() {
  const router = useRouter();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountPercent: 0,
    code: '',
    validUntil: '',
    isActive: true
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      loadPromotions();
    }
  }, [router]);

  const loadPromotions = async () => {
    try {
      const response = await fetch('/api/promotions');
      const data = await response.json();
      if (Array.isArray(data)) {
        setPromotions(data);
      }
    } catch (error) {
      console.error('Error loading promotions:', error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let response;
      if (editingPromotion) {
        response = await fetch('/api/promotions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingPromotion.id, ...formData }),
        });
      } else {
        response = await fetch('/api/promotions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error: ${errorData.error || 'No se pudo guardar la promoción'}`);
        return;
      }
      
      await loadPromotions();
      resetForm();
      setSuccessMessage(editingPromotion ? 'Promoción actualizada correctamente' : 'Promoción creada correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving promotion:', error);
      alert('Error al guardar la promoción: ' + error);
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      title: promotion.title,
      description: promotion.description,
      discountPercent: promotion.discountPercent || 0,
      code: promotion.code || '',
      validUntil: promotion.validUntil || '',
      isActive: promotion.isActive
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/promotions?id=${id}`, {
        method: 'DELETE',
      });
      await loadPromotions();
      setDeleteConfirmId(null);
      setSuccessMessage('Promoción eliminada correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting promotion:', error);
      alert('Error al eliminar la promoción');
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const promo = promotions.find(p => p.id === id);
      if (promo) {
        await fetch('/api/promotions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...promo, isActive: !currentStatus }),
        });
        await loadPromotions();
      }
    } catch (error) {
      console.error('Error toggling promotion:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      discountPercent: 0,
      code: '',
      validUntil: '',
      isActive: true
    });
    setEditingPromotion(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Modal de confirmación de eliminación */}
        {deleteConfirmId && (
          <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl p-6 shadow-2xl border-2 border-red-200 max-w-sm w-full animate-scale-in">
              <h3 className="text-lg font-bold text-gray-800 mb-2">¿Eliminar promoción?</h3>
              <p className="text-gray-600 text-sm mb-4">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in-right">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-500 text-xl font-bold">✓</span>
            </div>
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

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

            {formData.discountPercent > 0 && (
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descuento (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
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
              className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02] hover:shadow-xl cursor-pointer"
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
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 transform hover:scale-105 hover:shadow-lg cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(promo.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 transform hover:scale-105 hover:shadow-lg cursor-pointer"
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
