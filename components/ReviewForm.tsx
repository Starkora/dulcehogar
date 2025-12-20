'use client';

import { useState } from 'react';
import { Star, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { addReview, getBrowserFingerprint } from '@/lib/reviewModeration';

interface ReviewFormProps {
  onSubmit: () => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [event, setEvent] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (!name || !comment || !event) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = addReview({
        name: name.trim(),
        rating,
        comment: comment.trim(),
        event,
        date: new Date().toLocaleDateString('es-CO', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        }),
        ipHash: getBrowserFingerprint()
      });
      
      if (result.success) {
        // Reset form
        setName('');
        setRating(5);
        setComment('');
        setEvent('');
        
        setMessage({ 
          type: result.needsModeration ? 'warning' : 'success', 
          text: result.message 
        });
        
        // Notificar al componente padre para refrescar
        setTimeout(() => {
          onSubmit();
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al enviar la reseña. Por favor intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Comparte tu Experiencia
      </h3>
      
      {/* Mensaje de estado */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' :
          message.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
          'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Tu Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            placeholder="Ej: María González"
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="event" className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Evento
          </label>
          <select
            id="event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Selecciona un tipo</option>
            <option value="Boda">Boda</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Aniversario">Aniversario</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Primera Comunión">Primera Comunión</option>
            <option value="Graduación">Graduación</option>
            <option value="Evento Corporativo">Evento Corporativo</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Calificación
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
            Tu Comentario
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
            placeholder="Cuéntanos sobre tu experiencia con nuestros productos... (mín. 10 caracteres)"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {comment.length}/500 caracteres {comment.length < 10 && `(mínimo 10)`}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
        </button>
      </form>
    </div>
  );
}
