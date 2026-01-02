'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Instagram, Trash2, Edit2, Save, X } from 'lucide-react';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { getInstagramPosts, addInstagramPost, updateInstagramPost, deleteInstagramPost, type InstagramPost } from '@/lib/siteConfig';
import { ImageUpload } from '@/components/ImageUpload';

export default function AdminInstagramPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image: '',
    likes: 0,
    comments: 0,
    caption: '',
    postUrl: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadPosts();
    setLoading(false);
  }, [router]);

  const loadPosts = () => {
    setPosts(getInstagramPosts());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateInstagramPost(editingId, formData);
    } else {
      addInstagramPost(formData);
    }

    setFormData({
      image: '',
      likes: 0,
      comments: 0,
      caption: '',
      postUrl: ''
    });
    setEditingId(null);
    loadPosts();
  };

  const handleEdit = (post: InstagramPost) => {
    setEditingId(post.id);
    setFormData({
      image: post.image,
      likes: post.likes,
      comments: post.comments,
      caption: post.caption,
      postUrl: post.postUrl || ''
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este post?')) {
      deleteInstagramPost(id);
      loadPosts();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      image: '',
      likes: 0,
      comments: 0,
      caption: '',
      postUrl: ''
    });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Posts de Instagram</h1>
            <p className="text-gray-600">Gestiona los posts que aparecen en tu feed de Instagram</p>
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
            {editingId ? 'Editar Post' : 'Agregar Nuevo Post'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              folder="galeria"
              label="Imagen del Post"
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Caption / Descripción *
              </label>
              <textarea
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Torta de chocolate con fresas frescas..."
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Likes
                </label>
                <input
                  type="number"
                  value={formData.likes}
                  onChange={(e) => setFormData({ ...formData, likes: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="234"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Comentarios
                </label>
                <input
                  type="number"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="12"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL del Post (opcional)
                </label>
                <input
                  type="url"
                  value={formData.postUrl}
                  onChange={(e) => setFormData({ ...formData, postUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="https://instagram.com/p/..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Actualizar Post' : 'Agregar Post'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
                >
                  <X className="w-5 h-5" />
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Posts */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <Instagram className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-bold text-gray-800">
              Posts Publicados ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Instagram className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg">No hay posts todavía</p>
              <p className="text-sm">Agrega tu primer post de Instagram arriba</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{post.caption}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comentarios</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
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
