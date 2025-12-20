'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    eventType: ''
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setAlertType('error');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    
    const phoneNumber = '51904065007';
    
    // Construir el mensaje
    const text = `Hola! Soy ${formData.name}. Email: ${formData.email}, Telefono: ${formData.phone}${formData.eventType ? `, Evento: ${formData.eventType}` : ''}. Mensaje: ${formData.message}`;
    
    // Usar api.whatsapp.com para mejor compatibilidad con chats nuevos
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;
    
    // Mostrar alerta de éxito
    setAlertType('success');
    setShowAlert(true);
    
    // Abrir en nueva ventana
    window.open(whatsappUrl, '_blank');
    
    // Limpiar formulario después de un momento
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '', eventType: '' });
      setShowAlert(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header />
      <WhatsAppButton />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para hacer realidad tus sueños más dulces
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Envíanos un mensaje
              </h2>
              
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
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="+51 923232323"
                  />
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-gray-700 font-semibold mb-2">
                    Tipo de evento
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="cumpleaños">Cumpleaños</option>
                    <option value="boda">Boda</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="corporativo">Evento Corporativo</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors resize-none"
                    placeholder="Cuéntanos sobre tu pedido..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar por WhatsApp
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Cards */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Información de Contacto
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Ubicación</h3>
                      <p className="text-gray-600">
                        Av Jose Olaya<br />
                        Villa María del Triunfo, Peru
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Teléfono</h3>
                      <p className="text-gray-600">
                        +51 904065007
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">
                        info@dulcehogar.com<br />
                        pedidos@dulcehogar.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Horario</h3>
                      <p className="text-gray-600">
                        Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                        Sábados: 9:00 AM - 4:00 PM<br />
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Síguenos en Redes
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-600 py-3 rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-600 py-3 rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=51904065007&text=¡Hola!%20Me%20gustaría%20hacer%20un%20pedido%20de%20Dulce%20Hogar&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 py-3 rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl p-4 shadow-xl overflow-hidden">
                <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-orange-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-20 h-20 text-pink-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
