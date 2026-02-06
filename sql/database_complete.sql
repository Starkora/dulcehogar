-- ============================================
-- CREAR BASE DE DATOS DULCE HOGAR
-- ============================================

CREATE DATABASE IF NOT EXISTS dulcehogar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE dulcehogar_db;

-- ============================================
-- TABLA DE PRODUCTOS REGULARES
-- ============================================
CREATE TABLE products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT NOT NULL,
  category VARCHAR(100),
  isReferenceImage BOOLEAN DEFAULT FALSE,
  isApproximatePrice BOOLEAN DEFAULT FALSE,
  unitType ENUM('unidad', 'paquete', 'docena', 'kilo', 'porcion') DEFAULT 'unidad',
  quantity INT DEFAULT 1,
  servings INT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category)
);

-- ============================================
-- TABLA DE GALERÍA
-- ============================================
CREATE TABLE gallery_images (
  id VARCHAR(36) PRIMARY KEY,
  url TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category)
);

-- ============================================
-- TABLA DE PROMOCIONES
-- ============================================
CREATE TABLE promotions (
  id VARCHAR(36) PRIMARY KEY,
  type ENUM('discount', 'seasonal') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  discount INT,
  code VARCHAR(50),
  validUntil DATE,
  ctaText VARCHAR(255) NOT NULL,
  ctaLink VARCHAR(500) NOT NULL,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (isActive)
);

-- ============================================
-- TABLA DE EVENTOS ESPECIALES
-- ============================================
CREATE TABLE special_events (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  isActive BOOLEAN DEFAULT FALSE,
  eventDate DATE NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  -- Header button
  headerButton_show BOOLEAN DEFAULT TRUE,
  headerButton_text VARCHAR(100),
  headerButton_url VARCHAR(500),
  -- Banner
  banner_title VARCHAR(255),
  banner_description TEXT,
  banner_ctaText VARCHAR(100),
  -- Popup
  popup_enabled BOOLEAN DEFAULT TRUE,
  popup_discount INT,
  popup_code VARCHAR(50),
  popup_minAmount DECIMAL(10, 2),
  -- Urgency timer
  urgencyTimer_show BOOLEAN DEFAULT TRUE,
  urgencyTimer_deadline DATETIME,
  urgencyTimer_hoursLeft INT,
  -- Limited slots
  limitedSlots_show BOOLEAN DEFAULT TRUE,
  limitedSlots_slots INT,
  limitedSlots_message VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (isActive),
  INDEX idx_dates (startDate, endDate)
);

-- ============================================
-- TABLA DE COMBOS DE EVENTOS
-- ============================================
CREATE TABLE event_combos (
  id VARCHAR(36) PRIMARY KEY,
  eventId VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  originalPrice DECIMAL(10, 2),
  items JSON NOT NULL,
  displayOrder INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (eventId) REFERENCES special_events(id) ON DELETE CASCADE,
  INDEX idx_event (eventId)
);

-- ============================================
-- TABLA DE PRODUCTOS DE EVENTOS/TEMPORADA
-- ============================================
CREATE TABLE event_products (
  id VARCHAR(36) PRIMARY KEY,
  eventId VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  originalPrice DECIMAL(10, 2),
  image TEXT NOT NULL,
  unitType ENUM('unidad', 'paquete', 'docena', 'kilo', 'porcion') DEFAULT 'unidad',
  quantity INT DEFAULT 1,
  servings INT,
  status ENUM('active', 'inactive', 'archived') DEFAULT 'active',
  displayOrder INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (eventId) REFERENCES special_events(id) ON DELETE CASCADE,
  INDEX idx_event_status (eventId, status),
  INDEX idx_status (status)
);

-- ============================================
-- TABLA DE POSTS DE INSTAGRAM
-- ============================================
CREATE TABLE instagram_posts (
  id VARCHAR(36) PRIMARY KEY,
  image TEXT NOT NULL,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  caption TEXT,
  postUrl VARCHAR(500),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created (createdAt DESC)
);

-- ============================================
-- TABLA DE CONFIGURACIÓN DEL SITIO
-- ============================================
CREATE TABLE site_config (
  config_key VARCHAR(100) PRIMARY KEY,
  config_value JSON NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- TABLA DE USUARIOS ADMIN
-- ============================================
CREATE TABLE admin_users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastLogin TIMESTAMP NULL
);

-- ============================================
-- DATOS INICIALES - PRODUCTOS REGULARES
-- ============================================
INSERT INTO products (id, name, description, price, image, category, isReferenceImage, isApproximatePrice, unitType, servings) VALUES
('prod-1', 'Queque Marmoleado', 'Suave y esponjoso queque casero, elaborado con una mezcla perfecta de vainilla y chocolate. Ideal para acompañar tu café o té.', 20.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/queque-marmoleado.jpg', 'Clásicos del hogar', TRUE, TRUE, 'unidad', 8),
('prod-2', 'Pie de Manzana', 'Pie de manzana artesanal, preparado con manzanas frescas, sutilmente especiado y cubierto con un enrejado dorado y crujiente.', 30.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/pie-manzana.jpg', 'Clásicos del hogar', TRUE, TRUE, 'unidad', 6),
('prod-3', 'Chocolejas', 'Chocolejas elaboradas con chocolate de cobertura y rellenos tradicionales como manjar blanco y nueces, envueltas individualmente.', 10.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/chocolejas.jpg', 'Pequeños Antojos', TRUE, TRUE, 'paquete', NULL),
('prod-4', 'Brazo de Reina', 'Delicioso brazo de reina relleno de manjar blanco y espolvoreado con azúcar glas.', 25.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/brazo-reina.jpg', 'Clásicos del hogar', TRUE, TRUE, 'unidad', 6),
('prod-5', 'Torta de Tres Leches', 'Esponjosa torta bañada en una mezcla de tres leches, coronada con merengue italiano.', 45.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/tres-leches.jpg', 'Tortas', TRUE, TRUE, 'unidad', 8),
('prod-6', 'Torta de Durazno', 'Torta con capas de bizcochuelo, crema pastelera y duraznos en almíbar.', 50.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/torta-durazno.jpg', 'Tortas', TRUE, TRUE, 'unidad', 10);

-- ============================================
-- DATOS INICIALES - EVENTO SAN VALENTÍN 2026
-- ============================================
INSERT INTO special_events (
  id, name, isActive, eventDate, startDate, endDate,
  headerButton_show, headerButton_text, headerButton_url,
  banner_title, banner_description, banner_ctaText,
  popup_enabled, popup_discount, popup_code, popup_minAmount,
  urgencyTimer_show, urgencyTimer_deadline, urgencyTimer_hoursLeft,
  limitedSlots_show, limitedSlots_slots, limitedSlots_message
) VALUES (
  'san-valentin-2026', 'San Valentín 2026', TRUE, '2026-02-14', '2026-02-05', '2026-02-14',
  TRUE, '💕 San Valentín', '/san-valentin',
  '💝 Celebra el Amor este 14 de Febrero', 'Combos especiales con descuentos increíbles. ¡Sorprende a tu pareja con algo dulce!', 'Ver Combos Románticos',
  TRUE, 15, 'AMOR2026', 50.00,
  TRUE, '2026-02-12 23:59:59', 0,
  TRUE, 5, '¡Solo 5 espacios disponibles para San Valentín!'
);

-- ============================================
-- PRODUCTOS EXCLUSIVOS DE SAN VALENTÍN
-- ============================================
INSERT INTO event_products (id, eventId, name, description, price, originalPrice, image, unitType, servings, status, displayOrder) VALUES
('ev-prod-1', 'san-valentin-2026', 'Torta Corazón Rojo', 'Hermosa torta en forma de corazón con decoración romántica, sabor red velvet con crema cheese.', 85.00, 95.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/torta-corazon.jpg', 'unidad', 8, 'active', 1),
('ev-prod-2', 'san-valentin-2026', 'Caja de Trufas Premium', 'Exquisitas trufas de chocolate belga con diferentes rellenos: maracuyá, café, menta y frambuesa.', 45.00, 55.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/trufas-premium.jpg', 'paquete', NULL, 'active', 2),
('ev-prod-3', 'san-valentin-2026', 'Cupcakes Románticos', 'Set de 6 cupcakes decorados con corazones y flores comestibles, sabores variados.', 35.00, 42.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/cupcakes-romanticos.jpg', 'paquete', 6, 'active', 3),
('ev-prod-4', 'san-valentin-2026', 'Macarons del Amor', 'Delicados macarons franceses en tonos rosados y rojos: fresa, rosa, chocolate ruby.', 40.00, 50.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/macarons-amor.jpg', 'paquete', NULL, 'active', 4),
('ev-prod-5', 'san-valentin-2026', 'Galletas Corazón Decoradas', 'Galletas de mantequilla decoradas artesanalmente con glasa real y mensajes románticos.', 28.00, 35.00, 'https://res.cloudinary.com/demo/image/upload/v1234567890/galletas-corazon.jpg', 'paquete', NULL, 'active', 5);

-- ============================================
-- COMBOS DE SAN VALENTÍN
-- ============================================
INSERT INTO event_combos (id, eventId, name, description, price, originalPrice, items, displayOrder) VALUES
('combo-1', 'san-valentin-2026', 'Combo Clásico', 'Perfecto para una celebración íntima', 75.00, 95.00, '["Queque de Chocolate", "6 Cupcakes Decorados", "Tarjeta Personalizada"]', 1),
('combo-2', 'san-valentin-2026', 'Combo Premium', 'Para una celebración especial', 145.00, 180.00, '["Torta Corazón (1kg)", "12 Trufas de Chocolate", "Caja de Chocolates Premium", "Rosa Decorativa"]', 2),
('combo-3', 'san-valentin-2026', 'Combo Deluxe', 'La experiencia completa del amor', 225.00, 290.00, '["Torta de 2 Pisos", "24 Cupcakes Gourmet", "Caja de Macarons", "Arreglo de Flores", "Globos Personalizados"]', 3);

-- ============================================
-- CONFIGURACIÓN INICIAL
-- ============================================
INSERT INTO site_config (config_key, config_value) VALUES
('social_links', '{"instagram": "https://www.instagram.com/reposteriadulcehogarvmt_/", "tiktok": "https://www.tiktok.com/@dulcehogarvmt?lang=es-419", "whatsapp": "+51957076760"}'),
('contact_info', '{"phone": "+51 957076760", "email": "contacto@dulcehogar.com", "address": "Villa María del Triunfo, Lima, Perú"}'),
('business_hours', '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 6:00 PM", "saturday": "10:00 AM - 4:00 PM", "sunday": "Cerrado"}');
