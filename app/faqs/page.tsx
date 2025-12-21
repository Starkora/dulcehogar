import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HelpCircle, Truck, CreditCard, XCircle, Clock, Shield, ChefHat, MessageCircle, Check } from 'lucide-react';

export const metadata = {
  title: 'Preguntas Frecuentes y Políticas - Dulce Hogar',
  description: 'Encuentra respuestas a las preguntas más frecuentes sobre pedidos, entregas, pagos y políticas de Dulce Hogar.',
};

const faqs = [
  {
    icon: Clock,
    question: '¿Con cuánta anticipación debo hacer mi pedido?',
    answer: 'Recomendamos hacer pedidos con mínimo 5-7 días de anticipación para diseños estándar. Para eventos especiales (bodas, quinceañeros) solicitamos al menos 2-3 semanas. Para pedidos urgentes, contáctanos y haremos nuestro mejor esfuerzo por ayudarte.'
  },
  {
    icon: Truck,
    question: '¿Hacen entregas? ¿Cuál es el costo?',
    answer: 'Sí, realizamos entregas en Bogotá y municipios cercanos. El costo de envío varía según la distancia: dentro de Bogotá $15.000-$25.000. Envíos gratuitos en pedidos superiores a $200.000. También puedes recoger tu pedido en nuestro local sin costo adicional.'
  },
  {
    icon: CreditCard,
    question: '¿Qué formas de pago aceptan?',
    answer: 'Aceptamos múltiples formas de pago: Efectivo, transferencia bancaria (Bancolombia, Nequi, Daviplata), tarjetas de crédito/débito, y pago contraentrega (aplican condiciones). Requerimos un anticipo del 50% para confirmar tu pedido.'
  },
  {
    icon: XCircle,
    question: '¿Cuál es su política de cancelaciones?',
    answer: 'Puedes cancelar tu pedido hasta 72 horas antes de la fecha de entrega con reembolso del 80% del anticipo. Cancelaciones con menos de 72 horas no son reembolsables debido a que los ingredientes ya fueron adquiridos y el proceso de elaboración iniciado.'
  },
  {
    icon: Shield,
    question: '¿Qué pasa si hay un problema con mi pedido?',
    answer: 'Tu satisfacción es nuestra prioridad. Si hay algún problema con tu pedido, contáctanos inmediatamente. Ofrecemos soluciones como reemplazo, reembolso parcial o total según el caso. Tomamos fotos de todos nuestros productos antes de la entrega como respaldo de calidad.'
  },
  {
    icon: ChefHat,
    question: '¿Trabajan con ingredientes especiales o dietas restrictivas?',
    answer: 'Sí, podemos preparar productos sin gluten, sin azúcar (con edulcorantes), veganos, y sin lactosa. Por favor indícalo al hacer tu pedido para ajustar la receta. Estos productos pueden tener un costo adicional del 15-20% por ingredientes especializados.'
  },
  {
    icon: MessageCircle,
    question: '¿Puedo solicitar diseños personalizados?',
    answer: '¡Por supuesto! Nos encanta crear diseños únicos. Envíanos fotos de referencia, colores, tema del evento, y trabajaremos contigo para crear algo especial. Para diseños complejos, realizamos bocetos previos para tu aprobación.'
  },
  {
    icon: HelpCircle,
    question: '¿Cómo debo conservar el producto?',
    answer: 'Tortas y cupcakes: refrigerar y consumir en 3-5 días. Sacar del refrigerador 30 minutos antes de servir para mejor sabor. Galletas: guardar en recipiente hermético hasta 10 días a temperatura ambiente. No refrigerar galletas decoradas con royal icing.'
  }
];

const policies = [
  {
    title: 'Política de Pedidos',
    items: [
      'Todos los pedidos requieren confirmación por WhatsApp o teléfono',
      'Anticipo del 50% para reservar fecha y confirmar pedido',
      'Saldo restante se cancela al momento de la entrega',
      'Pedidos especiales requieren más tiempo de elaboración',
      'Cambios en el pedido deben hacerse mínimo 48 horas antes'
    ]
  },
  {
    title: 'Política de Entregas',
    items: [
      'Horarios de entrega: Lunes a Sábado 9:00 AM - 7:00 PM',
      'Domingos y festivos con recargo del 30%',
      'Ventana de entrega de 2 horas',
      'Cliente debe confirmar recepción del producto',
      'No nos hacemos responsables por daños después de la entrega'
    ]
  },
  {
    title: 'Política de Calidad',
    items: [
      'Usamos solo ingredientes frescos y de alta calidad',
      'Elaboración el mismo día o un día antes de la entrega',
      'Documentamos fotográficamente cada producto antes de entregar',
      'Garantizamos sabor y frescura',
      'Certificados en manipulación de alimentos'
    ]
  },
  {
    title: 'Información de Alérgenos',
    items: [
      'Nuestros productos pueden contener: gluten, huevos, lácteos, frutos secos',
      'Elaboramos en cocina compartida - riesgo de contaminación cruzada',
      'Informar alergias SIEMPRE al momento del pedido',
      'No garantizamos 100% libre de alérgenos excepto en productos especiales',
      'Ingredientes detallados disponibles a solicitud'
    ]
  }
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl text-gray-600">
              Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-pink-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Políticas */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Nuestras Políticas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {policies.map((policy, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-6 border-2 border-pink-200"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {policy.title}
                  </h3>
                  <ul className="space-y-3">
                    {policy.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-pink-500 mr-2 flex-shrink-0 w-5 h-5 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl shadow-xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Tienes más preguntas?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Estamos aquí para ayudarte. Contáctanos directamente y resolveremos todas tus dudas.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href="/contacto"
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold transition-all inline-block"
              >
                Formulario de Contacto
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
