'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';
import { ImageUpload } from '@/components/ImageUpload';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  isReferenceImage?: boolean;
  isApproximatePrice?: boolean;
  unitType?: 'unidad' | 'paquete' | 'docena' | 'kilo' | 'porcion';
  quantity?: number;
  servings?: number;
}

export default function AdminProductos() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    isReferenceImage: false,
    isApproximatePrice: false,
    unitType: 'unidad' as 'unidad' | 'paquete' | 'docena' | 'kilo' | 'porcion',
    quantity: 1,
    servings: undefined as number | undefined
  });

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push('/admin/login');
      } else {
        loadProducts();
      }
    };
    checkAuth();
  }, [router]);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setProducts(data);
        
        // Extraer categorías únicas
        const uniqueCategories = Array.from(
          new Set(data.map(p => p.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories.sort());
      }
    } catch (error) {
      console.error('Error loading products:', error);
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
    
    // Si hay nueva categoría, usarla
    const finalCategory = showNewCategoryInput && newCategory.trim() 
      ? newCategory.trim() 
      : formData.category;
    
    const productData = { ...formData, category: finalCategory };
    
    try {
      if (editingProduct) {
        await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProduct.id, ...productData }),
        });
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      }
      
      await loadProducts();
      resetForm();
      
      // Scroll to top after creating a product
      if (!editingProduct) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error al guardar el producto');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category || '',
      isReferenceImage: product.isReferenceImage || false,
      isApproximatePrice: product.isApproximatePrice || false,
      unitType: product.unitType || 'unidad',
      quantity: product.quantity || 1,
      servings: product.servings
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    
    try {
      await fetch(`/api/products?id=${deleteConfirmId}`, {
        method: 'DELETE',
      });
      await loadProducts();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error al eliminar el producto');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: 0, image: '', category: '', isReferenceImage: false, isApproximatePrice: false, unitType: 'unidad', quantity: 1, servings: undefined });
    setEditingProduct(null);
    setShowEditModal(false);
    setShowNewCategoryInput(false);
    setNewCategory('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Gestión de Productos
            </h1>
            <p className="text-gray-600">
              Administra el catálogo de productos
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

        {/* Modal de Edición */}
        {showEditModal && editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-gray-800">
                  Editar Producto
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre del Producto *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Categoría
                      </label>
                      {!showNewCategoryInput ? (
                        <div className="flex gap-2">
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          >
                            <option value="">Seleccionar categoría</option>
                            {categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => setShowNewCategoryInput(true)}
                            className="px-4 py-3 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer"
                          >
                            + Nueva
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="Nombre de la nueva categoría"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setShowNewCategoryInput(false);
                              setNewCategory('');
                            }}
                            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg font-semibold transition-all cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
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

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tipo de Unidad *
                      </label>
                      <select
                        value={formData.unitType}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          unitType: e.target.value as any,
                          quantity: e.target.value === 'docena' ? 12 : formData.quantity 
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                      >
                        <option value="unidad">Unidad</option>
                        <option value="paquete">Paquete</option>
                        <option value="docena">Docena</option>
                        <option value="kilo">Kilogramo</option>
                        <option value="porcion">Porción</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {formData.unitType === 'paquete' ? 'Unidades por paquete' :
                         formData.unitType === 'kilo' ? 'Kilogramos' :
                         formData.unitType === 'porcion' ? 'Número de porciones' :
                         formData.unitType === 'docena' ? 'Cantidad (fijo: 12)' :
                         'Cantidad'}
                      </label>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        min="1"
                        disabled={formData.unitType === 'docena'}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Precio (S/) *
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Porciones (opcional)
                    </label>
                    <input
                      type="number"
                      value={formData.servings || ''}
                      onChange={(e) => setFormData({ ...formData, servings: e.target.value ? parseInt(e.target.value) : undefined })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Ej: 8 (personas)"
                      min="1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Si aplica, indica para cuántas personas alcanza este producto
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-700">
                        ¿Imagen de referencia?
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isReferenceImage: !formData.isReferenceImage })}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
                          formData.isReferenceImage ? 'bg-pink-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            formData.isReferenceImage ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className="text-sm text-gray-600">
                        {formData.isReferenceImage ? 'Sí' : 'No'}
                      </span>
                    </div>
                    {formData.isReferenceImage && (
                      <p className="text-xs text-gray-500">
                        Se mostrará un badge "Imagen referencial" indicando que el producto final puede variar
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-700">
                        ¿Precio aproximado?
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isApproximatePrice: !formData.isApproximatePrice })}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
                          formData.isApproximatePrice ? 'bg-pink-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            formData.isApproximatePrice ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <span className="text-sm text-gray-600">
                        {formData.isApproximatePrice ? 'Sí' : 'No'}
                      </span>
                    </div>
                    {formData.isApproximatePrice && (
                      <p className="text-xs text-gray-500">
                        Se mostrará "Precio referencial" y el precio real se confirmará por WhatsApp
                      </p>
                    )}
                  </div>

                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    folder="productos"
                    label="Imagen del Producto"
                  />

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Save className="w-5 h-5" />
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Confirmación de Eliminación */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-gray-800">
              <h3 className="text-xl font-bold mb-4">¿Estás seguro de eliminar este producto?</h3>
              <p className="text-gray-700 mb-6">Esta acción no se puede deshacer.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Nuevo Producto */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Nuevo Producto
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría
                </label>
                {!showNewCategoryInput ? (
                  <div className="flex gap-2">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewCategoryInput(true)}
                      className="px-4 py-3 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-lg font-semibold transition-all whitespace-nowrap"
                    >
                      + Nueva
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Nombre de la nueva categoría"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewCategoryInput(false);
                        setNewCategory('');
                      }}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg font-semibold transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
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

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio (S/) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Se vende por *
                </label>
                <select
                  value={formData.unitType}
                  onChange={(e) => setFormData({ ...formData, unitType: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="unidad">Unidad</option>
                  <option value="paquete">Paquete</option>
                  <option value="docena">Docena</option>
                  <option value="kilo">Kilo</option>
                  <option value="porcion">Porción</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formData.unitType === 'kilo' ? 'Kilos' : 
                   formData.unitType === 'paquete' ? 'Unidades en paquete' : 
                   formData.unitType === 'porcion' ? 'Porciones' : 'Cantidad'} {formData.unitType !== 'unidad' && '*'}
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  min="1"
                  step="0.5"
                  placeholder={
                    formData.unitType === 'kilo' ? 'ej: 1, 2.5, 5' :
                    formData.unitType === 'paquete' ? 'ej: 6, 12, 24' :
                    formData.unitType === 'porcion' ? 'ej: 8, 12, 16' :
                    'ej: 1'
                  }
                  disabled={formData.unitType === 'unidad'}
                  required={formData.unitType !== 'unidad'}
                />
                {formData.unitType === 'paquete' && formData.quantity > 1 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Paquete de {formData.quantity} unidades
                  </p>
                )}
                {formData.unitType === 'kilo' && formData.quantity > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Producto de {formData.quantity} kg
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Para cuántas personas (opcional)
                </label>
                <input
                  type="number"
                  value={formData.servings || ''}
                  onChange={(e) => setFormData({ ...formData, servings: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  min="1"
                  step="1"
                  placeholder="ej: 8, 12, 20"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Útil para tortas y postres
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Imagen Referencial
                </label>
                <div className="flex items-center gap-3 h-[52px]">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isReferenceImage: !formData.isReferenceImage })}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      formData.isReferenceImage ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        formData.isReferenceImage ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-sm text-gray-600">
                    {formData.isReferenceImage ? 'Sí' : 'No'}
                  </span>
                </div>
                {formData.isReferenceImage && (
                  <p className="text-xs text-gray-500 mt-2">
                    Se mostrará "Imagen referencial" en la esquina
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Precio Aproximado
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isApproximatePrice: !formData.isApproximatePrice })}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
                    formData.isApproximatePrice ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      formData.isApproximatePrice ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600">
                  {formData.isApproximatePrice ? 'Sí' : 'No'}
                </span>
              </div>
              {formData.isApproximatePrice && (
                <p className="text-xs text-gray-500 mt-2">
                  Se mostrará "Precio referencial" y el precio real se confirmará por WhatsApp
                </p>
              )}
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              folder="productos"
              label="Imagen del Producto"
            />

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              {editingProduct ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
            </button>
          </form>
        </div>

        {/* Lista de Productos */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Productos Actuales ({products.length})
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay productos registrados</p>
              <p className="text-gray-400 mt-2">Agrega tu primer producto usando el formulario arriba</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400">Sin imagen</span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{product.name}</h3>
                  {product.category && (
                    <p className="text-sm text-pink-500 mb-2">{product.category}</p>
                  )}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-pink-500">S/ {product.price}</p>
                    {product.unitType && product.unitType !== 'unidad' && product.quantity && (
                      <p className="text-sm text-gray-600">
                        {product.unitType === 'paquete' && `Paquete de ${product.quantity} unidades`}
                        {product.unitType === 'docena' && `Docena (12 unidades)`}
                        {product.unitType === 'kilo' && `${product.quantity} kg`}
                        {product.unitType === 'porcion' && `${product.quantity} porciones`}
                      </p>
                    )}
                    {product.unitType === 'unidad' && (
                      <p className="text-sm text-gray-600">Precio por unidad</p>
                    )}
                    {product.servings && (
                      <p className="text-sm text-pink-600 font-semibold">
                        Para {product.servings} personas
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
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
