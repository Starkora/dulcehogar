import Link from 'next/link';
import { Cake, Instagram, Facebook, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cake className="w-8 h-8 text-pink-400" />
              <span className="text-xl font-bold">Dulce Hogar</span>
            </div>
            <p className="text-gray-300 mb-4">
              Endulzando momentos especiales desde 2024
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                <MessageCircle className="w-6 h-6" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4">Productos</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Tortas Personalizadas</li>
              <li>Cupcakes</li>
              <li>Galletas Decoradas</li>
              <li>Postres Artesanales</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Av Jose Olaya, VMT</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>+51 904065007</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>info@dulcehogar.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Lun-Vie: 8AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dulce Hogar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
