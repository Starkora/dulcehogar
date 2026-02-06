'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, CheckCircle, XCircle, Trash2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { isAuthenticated } from '@/lib/auth';
import Link from 'next/link';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  event: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminReviews() {
  const router = useRouter();
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push('/admin/login');
      } else {
        loadReviews();
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router, activeTab]);

  const loadReviews = async () => {
    try {
      // Cargar reseñas pendientes
      const pendingResponse = await fetch('/api/reviews?status=pending');
      const pendingData = await pendingResponse.json();
      setPendingReviews(Array.isArray(pendingData) ? pendingData : []);

      // Cargar reseñas aprobadas
      const approvedResponse = await fetch('/api/reviews?status=approved');
      const approvedData = await approvedResponse.json();
      setApprovedReviews(Array.isArray(approvedData) ? approvedData : []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const handleApprove = async (reviewId: string) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reviewId, status: 'approved' }),
      });
      
      if (response.ok) {
        loadReviews();
      }
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (reviewId: string) => {
    if (confirm('¿Estás seguro de rechazar esta reseña?')) {
      try {
        const response = await fetch('/api/reviews', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: reviewId, status: 'rejected' }),
        });
        
        if (response.ok) {
          loadReviews();
        }
      } catch (error) {
        console.error('Error rejecting review:', error);
      }
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (confirm('¿Estás seguro de eliminar esta reseña permanentemente?')) {
      try {
        const response = await fetch(`/api/reviews?id=${reviewId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          loadReviews();
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const reviews = activeTab === 'pending' ? pendingReviews : approvedReviews;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header con botón de regreso */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Admin
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Moderación de Reseñas
          </h1>
          <div className="w-32"></div> {/* Spacer para centrar el título */}
        </div>

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
                      {review.event} • {new Date(review.createdAt).toLocaleDateString('es-PE')}
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
                  ID: {review.id} • {new Date(review.createdAt).toLocaleString('es-PE')}
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
  );
}
