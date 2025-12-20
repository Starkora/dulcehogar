// Sistema de moderación de reseñas

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  event: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  ipHash?: string;
  timestamp: number;
  photoUrl?: string;
}

// Palabras prohibidas (puedes agregar más)
const bannedWords = [
  'spam', 'basura', 'estafa', 'malo', 'pésimo', 'horrible',
  // Agrega palabras específicas que quieras bloquear
];

// Detectar spam por contenido repetitivo
function detectRepetitiveContent(text: string): boolean {
  const words = text.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(words);
  
  // Si hay menos del 30% de palabras únicas, probablemente es spam
  return uniqueWords.size / words.length < 0.3;
}

// Detectar palabras prohibidas
function containsBannedWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return bannedWords.some(word => lowerText.includes(word));
}

// Detectar si el comentario es muy corto o genérico
function isTooShortOrGeneric(text: string): boolean {
  const trimmed = text.trim();
  const genericPhrases = [
    'muy bueno',
    'excelente',
    'malo',
    'no me gustó',
    'ok',
    'bien'
  ];
  
  return trimmed.length < 15 || genericPhrases.includes(trimmed.toLowerCase());
}

// Detectar URLs o información de contacto (posible spam)
function containsUrlOrContact(text: string): boolean {
  const urlPattern = /(https?:\/\/|www\.)/i;
  const phonePattern = /\d{10,}/;
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  
  return urlPattern.test(text) || phonePattern.test(text) || emailPattern.test(text);
}

// Verificar si hay demasiadas reseñas del mismo IP en poco tiempo
export function checkRateLimit(ipHash: string): boolean {
  const reviews = getReviewsFromStorage();
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  
  const recentReviewsFromIP = reviews.filter(
    review => review.ipHash === ipHash && review.timestamp > oneHourAgo
  );
  
  // Máximo 2 reseñas por hora desde la misma IP
  return recentReviewsFromIP.length < 2;
}

// Generar hash simple del navegador (no es IP real, pero sirve para rate limiting)
export function getBrowserFingerprint(): string {
  const nav = window.navigator;
  const screen = window.screen;
  
  const fingerprint = [
    nav.userAgent,
    nav.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset()
  ].join('|');
  
  // Hash simple (en producción usa una librería como crypto-js)
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(36);
}

// Validación automática completa
export function validateReview(review: Omit<Review, 'id' | 'status' | 'timestamp'>): {
  isValid: boolean;
  needsModeration: boolean;
  reason?: string;
} {
  const { name, comment, rating } = review;
  
  // Validaciones básicas
  if (!name || name.trim().length < 2) {
    return { isValid: false, needsModeration: false, reason: 'Nombre muy corto' };
  }
  
  if (name.length > 50) {
    return { isValid: false, needsModeration: false, reason: 'Nombre muy largo' };
  }
  
  if (!comment || comment.trim().length < 10) {
    return { isValid: false, needsModeration: false, reason: 'Comentario muy corto' };
  }
  
  if (comment.length > 500) {
    return { isValid: false, needsModeration: false, reason: 'Comentario muy largo (máx. 500 caracteres)' };
  }
  
  if (rating < 1 || rating > 5) {
    return { isValid: false, needsModeration: false, reason: 'Calificación inválida' };
  }
  
  // Detectar contenido sospechoso
  if (containsUrlOrContact(comment) || containsUrlOrContact(name)) {
    return { isValid: true, needsModeration: true, reason: 'Contiene URL o información de contacto' };
  }
  
  if (containsBannedWords(comment) || containsBannedWords(name)) {
    return { isValid: true, needsModeration: true, reason: 'Contiene palabras prohibidas' };
  }
  
  if (detectRepetitiveContent(comment)) {
    return { isValid: true, needsModeration: true, reason: 'Contenido repetitivo detectado' };
  }
  
  if (isTooShortOrGeneric(comment)) {
    return { isValid: true, needsModeration: true, reason: 'Comentario muy genérico' };
  }
  
  // Calificaciones extremadamente bajas necesitan moderación
  if (rating <= 2) {
    return { isValid: true, needsModeration: true, reason: 'Calificación baja - requiere revisión' };
  }
  
  // Si pasa todas las validaciones, se aprueba automáticamente
  return { isValid: true, needsModeration: false };
}

// Obtener reseñas del storage
function getReviewsFromStorage(): Review[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('dulcehogar-all-reviews');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Guardar reseñas en storage
function saveReviewsToStorage(reviews: Review[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('dulcehogar-all-reviews', JSON.stringify(reviews));
  } catch (error) {
    console.error('Error saving reviews:', error);
  }
}

// Obtener solo reseñas aprobadas
export function getApprovedReviews(): Review[] {
  return getReviewsFromStorage().filter(review => review.status === 'approved');
}

// Obtener reseñas pendientes (para el admin)
export function getPendingReviews(): Review[] {
  return getReviewsFromStorage().filter(review => review.status === 'pending');
}

// Agregar nueva reseña
export function addReview(
  reviewData: Omit<Review, 'id' | 'status' | 'timestamp'>
): { success: boolean; message: string; needsModeration: boolean } {
  
  // Validar rate limit
  if (!checkRateLimit(reviewData.ipHash || '')) {
    return {
      success: false,
      message: 'Has enviado muchas reseñas recientemente. Por favor espera un momento.',
      needsModeration: false
    };
  }
  
  // Validar contenido
  const validation = validateReview(reviewData);
  
  if (!validation.isValid) {
    return {
      success: false,
      message: validation.reason || 'Reseña inválida',
      needsModeration: false
    };
  }
  
  // Crear nueva reseña
  const newReview: Review = {
    ...reviewData,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    status: validation.needsModeration ? 'pending' : 'approved',
    timestamp: Date.now()
  };
  
  // Guardar
  const allReviews = getReviewsFromStorage();
  allReviews.unshift(newReview);
  saveReviewsToStorage(allReviews);
  
  return {
    success: true,
    message: validation.needsModeration 
      ? 'Tu reseña está en revisión. Será publicada una vez aprobada por nuestro equipo.'
      : '¡Gracias por tu reseña!',
    needsModeration: validation.needsModeration
  };
}

// Aprobar reseña (para el admin)
export function approveReview(reviewId: string): boolean {
  const reviews = getReviewsFromStorage();
  const review = reviews.find(r => r.id === reviewId);
  
  if (review) {
    review.status = 'approved';
    saveReviewsToStorage(reviews);
    return true;
  }
  
  return false;
}

// Rechazar reseña (para el admin)
export function rejectReview(reviewId: string): boolean {
  const reviews = getReviewsFromStorage();
  const review = reviews.find(r => r.id === reviewId);
  
  if (review) {
    review.status = 'rejected';
    saveReviewsToStorage(reviews);
    return true;
  }
  
  return false;
}

// Eliminar reseña (para el admin)
export function deleteReview(reviewId: string): boolean {
  const reviews = getReviewsFromStorage();
  const filtered = reviews.filter(r => r.id !== reviewId);
  
  if (filtered.length < reviews.length) {
    saveReviewsToStorage(filtered);
    return true;
  }
  
  return false;
}
