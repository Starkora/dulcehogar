-- Agregar esta tabla a tu base de datos TiDB Cloud

-- Tabla de reseñas/testimoniales
CREATE TABLE reviews (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  event VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  ipHash VARCHAR(64),
  photoUrl TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (createdAt DESC)
);

-- Insertar algunas reseñas de ejemplo
INSERT INTO reviews (id, name, rating, comment, event, status) VALUES
('review-1', 'María González', 5, 'Excelente servicio y productos de alta calidad. Las tortas son deliciosas y el diseño impecable. ¡Muy recomendado!', 'Cumpleaños', 'approved'),
('review-2', 'Carlos Mendoza', 5, 'Pedí una torta para el cumpleaños de mi hija y quedó hermosa. Todos quedaron encantados con el sabor. Gracias por hacer su día especial.', 'Cumpleaños', 'approved'),
('review-3', 'Ana Torres', 5, 'Los cupcakes son increíbles! Perfectos para mi evento de trabajo. Presentación impecable y sabor delicioso.', 'Evento Corporativo', 'approved');
