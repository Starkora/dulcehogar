'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Product, getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/siteConfig';
import { isAuthenticated } from '@/lib/auth';
import { ImageUpload } from '@/components/ImageUpload';

export default function AdminProductos() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
    isReferenceImage: false
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      const loadedProducts = getProducts();
      setProducts(loadedProducts);
      
      // Extraer categorías únicas
      const uniqueCategories = Array.from(
        new Set(loadedProducts.map(p => p.category).filter(Boolean))
      ) as string[];
      setCategories(uniqueCategories.sort());
      
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
    
    // Si hay nueva categoría, usarla
    const finalCategory = showNewCategoryInput && newCategory.trim() 
      ? newCategory.trim() 
      : formData.category;
    
    const productData = { ...formData, category: finalCategory };
    
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    
    // Actualizar categorías
    const uniqueCategories = Array.from(
      new Set(loadedProducts.map(p => p.category).filter(Boolean))
    ) as string[];
    setCategories(uniqueCategories.sort());
    
    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category || '',
      isReferenceImage: product.isReferenceImage || false
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: 0, image: '', category: '', isReferenceImage: false });
    setEditingProduct(null);
    setIsEditing(false);
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

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
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

            <div className="grid md:grid-cols-2 gap-4">
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
                  <p className="text-2xl font-bold text-pink-500 mb-4">S/ {product.price}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
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
