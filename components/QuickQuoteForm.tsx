'use client';

import { useState } from 'react';
import { Send, Calendar, User, MessageSquare, PartyPopper, Phone, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export function QuickQuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    event: '',
    date: '',
    description: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    if (!formData.name || !formData.phone || !formData.event || !formData.date || !formData.description) {
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    
    setIsSubmitting(true);

    const message = encodeURIComponent(
      `Hola! Me gustaria solicitar una cotizacion:\n\n` +
      `Nombre: ${formData.name}\n` +
      `Telefono: ${formData.phone}\n` +
      `Tipo de evento: ${formData.event}\n` +
      `Fecha del evento: ${formData.date}\n` +
      `Descripcion: ${formData.description}\n\n` +
      `Podrian enviarme una cotizacion?`
    );

    window.open(`https://api.whatsapp.com/send/?phone=51957076760&text=${message}&type=phone_number&app_absent=0`, '_blank');
    
    // Mostrar alerta de éxito
    setAlertType('success');
    setShowAlert(true);
    
    setTimeout(() => {
      setFormData({ name: '', event: '', date: '', description: '', phone: '' });
      setIsSubmitting(false);
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <MessageSquare className="w-12 h-12 text-pink-500 mx-auto mb-3" />
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Cotización Rápida
        </h3>
        <p className="text-gray-600">
          Cuéntanos sobre tu evento y te contactaremos de inmediato
        </p>
      </div>

      {/* Alerta moderna */}
      {showAlert && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-slideDown ${
          alertType === 'success' 
            ? 'bg-green-50 border-2 border-green-200' 
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          {alertType === 'success' ? (
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
          )}
          <div>
            <p className={`font-bold ${
              alertType === 'success' ? 'text-green-900' : 'text-red-900'
            }`}>
              {alertType === 'success' ? '¡Mensaje enviado!' : '¡Campos incompletos!'}
            </p>
            <p className={`text-sm ${
              alertType === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {alertType === 'success' 
                ? 'Redirigiendo a WhatsApp...' 
                : 'Por favor completa todos los campos requeridos'}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Tu Nombre *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Ej: María González"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Ej: +51 912 345 678"
          />
        </div>

        {/* Tipo de Evento */}
        <div>
          <label htmlFor="event" className="block text-sm font-semibold text-gray-700 mb-2">
            <PartyPopper className="w-4 h-4 inline mr-2" />
            Tipo de Evento *
          </label>
          <select
            id="event"
            value={formData.event}
            onChange={(e) => setFormData({ ...formData, event: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Selecciona un tipo</option>
            <option value="Boda">Boda</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Aniversario">Aniversario</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Primera Comunión">Primera Comunión</option>
            <option value="Graduación">Graduación</option>
            <option value="Evento Corporativo">Evento Corporativo</option>
            <option value="Quinceañera">Quinceañera</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Fecha del Evento */}
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Fecha del Evento *
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Descripción del Pedido *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            placeholder="Ej: Necesito una torta de chocolate para 50 personas, con decoración de flores y tema elegante..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-5 h-5" />
          {isSubmitting ? 'Enviando...' : 'Enviar por WhatsApp'}
        </button>

        <p className="text-xs text-center text-gray-500">
          Al enviar, serás redirigido a WhatsApp donde podrás completar tu solicitud
        </p>
      </form>
    </div>
  );
}
