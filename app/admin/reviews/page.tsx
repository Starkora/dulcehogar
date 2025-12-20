'use client';

import { useState, useEffect } from 'react';
import { getPendingReviews, approveReview, rejectReview, deleteReview, getApprovedReviews, Review } from '@/lib/reviewModeration';
import { Star, CheckCircle, XCircle, Trash2, AlertTriangle, Shield } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AdminReviews() {
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Contraseña simple (en producción usar autenticación real)
  const ADMIN_PASSWORD = 'dulcehogar2024';

  useEffect(() => {
    if (isAuthenticated) {
      loadReviews();
    }
  }, [isAuthenticated, activeTab]);

  const loadReviews = () => {
    setPendingReviews(getPendingReviews());
    setApprovedReviews(getApprovedReviews());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleApprove = (reviewId: string) => {
    if (approveReview(reviewId)) {
      loadReviews();
    }
  };

  const handleReject = (reviewId: string) => {
    if (confirm('¿Estás seguro de rechazar esta reseña?')) {
      if (rejectReview(reviewId)) {
        loadReviews();
      }
    }
  };

  const handleDelete = (reviewId: string) => {
    if (confirm('¿Estás seguro de eliminar esta reseña permanentemente?')) {
      if (deleteReview(reviewId)) {
        loadReviews();
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center py-12 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Panel de Administración
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Ingresa la contraseña de administrador"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Acceder
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const reviews = activeTab === 'pending' ? pendingReviews : approvedReviews;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Moderación de Reseñas
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'pending'
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Pendientes ({pendingReviews.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'approved'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Aprobadas ({approvedReviews.length})
              </div>
            </button>
          </div>

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">
                No hay reseñas {activeTab === 'pending' ? 'pendientes' : 'aprobadas'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{review.name}</h3>
                      <p className="text-sm text-gray-500">
                        {review.event} • {review.date}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                  <div className="text-xs text-gray-400 mb-4">
                    ID: {review.id} • Timestamp: {new Date(review.timestamp).toLocaleString('es-CO')}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end">
                    {activeTab === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(review.id)}
                          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Aprobar
                        </button>
                        <button
                          onClick={() => handleReject(review.id)}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                          Rechazar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
