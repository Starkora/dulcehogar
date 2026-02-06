// Sistema de configuración del sitio

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  isReferenceImage?: boolean;
  isApproximatePrice?: boolean;
  unitType?: 'unidad' | 'paquete' | 'docena' | 'kilo' | 'porcion';
  quantity?: number;
  servings?: number;
}

export interface EventProduct {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  unitType: 'unidad' | 'paquete' | 'docena' | 'kilo' | 'porcion';
  quantity?: number;
  servings?: number;
  status: 'active' | 'inactive' | 'archived';
  displayOrder?: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface Promotion {
  id: string;
  type: 'discount' | 'seasonal';
  title: string;
  description: string;
  discount?: number;
  code?: string;
  validUntil?: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  postUrl?: string;
}

export interface SpecialEvent {
  id: string;
  name: string;
  isActive: boolean;
  eventDate: string; // Fecha del evento (ej: "2026-02-14")
  orderDeadline: string; // Fecha límite de pedidos (ej: "2026-02-12")
  headerButton: {
    show: boolean;
    text: string;
    url: string;
  };
  banner: {
    show: boolean;
    message: string;
    description: string;
    buttonText: string;
  };
  popup: {
    show: boolean;
    title: string;
    description: string;
    discount: number;
    code: string;
    minAmount: number;
  };
  combos: Array<{
    id: string;
    name: string;
    description: string;
    items: string[];
    originalPrice: number;
    discountedPrice: number;
    servings: string;
    popular?: boolean;
  }>;
}

export interface SiteConfig {
  showHero: boolean;
  showAbout: boolean;
  showProducts: boolean;
  showPromotions: boolean;
  showGallery: boolean;
  showTestimonials: boolean;
  showInstagram: boolean;
  urgencyBanner: {
    show: boolean;
    message: string;
    daysLeft: number;
    hoursLeft: number;
  };
  limitedSlotsAlert: {
    show: boolean;
    slots: number;
    message: string;
  };
  exitPopup: {
    enabled: boolean;
    discount: number;
    code: string;
    minAmount: number;
  };
}

const DEFAULT_PRODUCTS: Product[] = [];

const DEFAULT_GALLERY: GalleryImage[] = [];

const DEFAULT_PROMOTIONS: Promotion[] = [];

const DEFAULT_INSTAGRAM_POSTS: InstagramPost[] = [];

const DEFAULT_CONFIG: SiteConfig = {
  showHero: true,
  showAbout: true,
  showProducts: true,
  showPromotions: true,
  showGallery: true,
  showTestimonials: true,
  showInstagram: true,
  urgencyBanner: {
    show: true,
    message: '¡San Valentín! Pedidos hasta el 12 de Febrero - ¡Sorprende a tu pareja!',
    daysLeft: 7,
    hoursLeft: 0
  },
  limitedSlotsAlert: {
    show: true,
    slots: 5,
    message: '¡Solo 5 espacios disponibles para San Valentín!'
  },
  exitPopup: {
    enabled: true,
    discount: 15,
    code: 'AMOR2026',
    minAmount: 50
  }
};

// Funciones para productos
export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  const saved = localStorage.getItem('dulcehogar_products');
  return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem('dulcehogar_products', JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, 'id'>) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString()
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
};

// Funciones para productos de eventos
export const getEventProducts = (eventId?: string): EventProduct[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('dulcehogar_event_products');
  const allProducts = saved ? JSON.parse(saved) : [];
  
  if (eventId) {
    return allProducts.filter((p: EventProduct) => p.eventId === eventId && p.status === 'active');
  }
  return allProducts;
};

export const saveEventProducts = (products: EventProduct[]) => {
  localStorage.setItem('dulcehogar_event_products', JSON.stringify(products));
};

export const addEventProduct = (product: Omit<EventProduct, 'id'>) => {
  const products = getEventProducts();
  const newProduct: EventProduct = {
    ...product,
    id: `ev-prod-${Date.now()}`,
    status: 'active'
  };
  products.push(newProduct);
  saveEventProducts(products);
  return newProduct;
};

export const updateEventProduct = (id: string, updates: Partial<EventProduct>) => {
  const products = getEventProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveEventProducts(products);
  }
};

export const deleteEventProduct = (id: string) => {
  // No elimina realmente, solo cambia el estado a 'inactive'
  updateEventProduct(id, { status: 'inactive' });
};

export const archiveEventProduct = (id: string) => {
  updateEventProduct(id, { status: 'archived' });
};

export const reactivateEventProduct = (id: string, newEventId: string) => {
  updateEventProduct(id, { status: 'active', eventId: newEventId });
};

// Funciones para galería
export const getGalleryImages = (): GalleryImage[] => {
  if (typeof window === 'undefined') return DEFAULT_GALLERY;
  const saved = localStorage.getItem('dulcehogar_gallery');
  return saved ? JSON.parse(saved) : DEFAULT_GALLERY;
};

export const saveGalleryImages = (images: GalleryImage[]) => {
  localStorage.setItem('dulcehogar_gallery', JSON.stringify(images));
};

export const addGalleryImage = (image: Omit<GalleryImage, 'id'>) => {
  const images = getGalleryImages();
  const newImage = {
    ...image,
    id: Date.now().toString()
  };
  images.push(newImage);
  saveGalleryImages(images);
  return newImage;
};

export const deleteGalleryImage = (id: string) => {
  const images = getGalleryImages().filter(img => img.id !== id);
  saveGalleryImages(images);
};

// Funciones para promociones
export const getPromotions = (): Promotion[] => {
  if (typeof window === 'undefined') return DEFAULT_PROMOTIONS;
  const saved = localStorage.getItem('dulcehogar_promotions');
  return saved ? JSON.parse(saved) : DEFAULT_PROMOTIONS;
};

export const savePromotions = (promotions: Promotion[]) => {
  localStorage.setItem('dulcehogar_promotions', JSON.stringify(promotions));
};

export const addPromotion = (promotion: Omit<Promotion, 'id'>) => {
  const promotions = getPromotions();
  const newPromotion = {
    ...promotion,
    id: Date.now().toString()
  };
  promotions.push(newPromotion);
  savePromotions(promotions);
  return newPromotion;
};

export const updatePromotion = (id: string, updates: Partial<Promotion>) => {
  const promotions = getPromotions();
  const index = promotions.findIndex(p => p.id === id);
  if (index !== -1) {
    promotions[index] = { ...promotions[index], ...updates };
    savePromotions(promotions);
  }
};

export const deletePromotion = (id: string) => {
  const promotions = getPromotions().filter(p => p.id !== id);
  savePromotions(promotions);
};

// Funciones para configuración del sitio
export const getSiteConfig = (): SiteConfig => {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  const saved = localStorage.getItem('dulcehogar_config');
  return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
};

export const saveSiteConfig = (config: SiteConfig) => {
  localStorage.setItem('dulcehogar_config', JSON.stringify(config));
};

export const updateSiteConfig = (updates: Partial<SiteConfig>) => {
  const config = getSiteConfig();
  const newConfig = { ...config, ...updates };
  saveSiteConfig(newConfig);
};

// Funciones para eventos especiales
const DEFAULT_SPECIAL_EVENT: SpecialEvent = {
  id: 'san-valentin-2026',
  name: 'San Valentín 2026',
  isActive: true,
  eventDate: '2026-02-14',
  orderDeadline: '2026-02-12',
  headerButton: {
    show: true,
    text: 'San Valentín',
    url: '/san-valentin'
  },
  banner: {
    show: true,
    message: 'SAN VALENTÍN 2026',
    description: 'Sorprende a tu pareja con nuestras creaciones especiales. ¡Solo hasta el 12 de Febrero!',
    buttonText: 'Ver Ofertas Especiales'
  },
  popup: {
    show: true,
    title: '¡San Valentín se acerca!',
    description: 'Para tu pedido de San Valentín',
    discount: 15,
    code: 'AMOR2026',
    minAmount: 50
  },
  combos: [
    {
      id: 'combo-clasico',
      name: 'Amor Clásico',
      description: 'Perfecto para comenzar',
      items: ['6 Cupcakes decorados', '12 Galletas con mensaje', 'Tarjeta personalizada'],
      originalPrice: 95,
      discountedPrice: 75,
      servings: 'Para 2 personas'
    },
    {
      id: 'combo-premium',
      name: 'Amor Premium',
      description: '¡El más completo!',
      items: ['Torta personalizada 1kg', '12 Cupcakes temáticos', '24 Galletas decoradas', 'Caja regalo premium'],
      originalPrice: 180,
      discountedPrice: 145,
      servings: 'Para 4-6 personas',
      popular: true
    },
    {
      id: 'combo-deluxe',
      name: 'Amor Deluxe',
      description: 'Para una ocasión especial',
      items: ['Torta personalizada 2kg', '18 Cupcakes premium', '36 Galletas artesanales', 'Caja premium + flores'],
      originalPrice: 280,
      discountedPrice: 225,
      servings: 'Para 8-10 personas'
    }
  ]
};

export const getSpecialEvent = (): SpecialEvent | null => {
  if (typeof window === 'undefined') return DEFAULT_SPECIAL_EVENT;
  const saved = localStorage.getItem('dulcehogar_special_event');
  if (!saved) return DEFAULT_SPECIAL_EVENT;
  const event = JSON.parse(saved);
  return event.isActive ? event : null;
};

export const saveSpecialEvent = (event: SpecialEvent) => {
  localStorage.setItem('dulcehogar_special_event', JSON.stringify(event));
};

export const updateSpecialEvent = (updates: Partial<SpecialEvent>) => {
  const event = getSpecialEvent();
  if (event) {
    const newEvent = { ...event, ...updates };
    saveSpecialEvent(newEvent);
    return newEvent;
  }
  return null;
};

export const deactivateSpecialEvent = () => {
  const event = getSpecialEvent();
  if (event) {
    event.isActive = false;
    saveSpecialEvent(event);
  }
};

// Funciones para posts de Instagram
export const getInstagramPosts = (): InstagramPost[] => {
  if (typeof window === 'undefined') return DEFAULT_INSTAGRAM_POSTS;
  const saved = localStorage.getItem('dulcehogar_instagram');
  return saved ? JSON.parse(saved) : DEFAULT_INSTAGRAM_POSTS;
};

export const saveInstagramPosts = (posts: InstagramPost[]) => {
  localStorage.setItem('dulcehogar_instagram', JSON.stringify(posts));
};

export const addInstagramPost = (post: Omit<InstagramPost, 'id'>) => {
  const posts = getInstagramPosts();
  const newPost = {
    ...post,
    id: Date.now().toString()
  };
  posts.unshift(newPost); // Agregar al inicio
  saveInstagramPosts(posts);
  return newPost;
};

export const updateInstagramPost = (id: string, updates: Partial<InstagramPost>) => {
  const posts = getInstagramPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...updates };
    saveInstagramPosts(posts);
  }
};

export const deleteInstagramPost = (id: string) => {
  const posts = getInstagramPosts().filter(p => p.id !== id);
  saveInstagramPosts(posts);
};
