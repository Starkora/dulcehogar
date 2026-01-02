// Sistema de configuración del sitio

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  isReferenceImage?: boolean;
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
    message: '¡Última oportunidad! Pedidos para Año Nuevo hasta el 28 de Diciembre',
    daysLeft: 363,
    hoursLeft: 23
  },
  exitPopup: {
    enabled: true,
    discount: 10,
    code: 'DULCE10',
    minAmount: 80
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
