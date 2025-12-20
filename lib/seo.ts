import { Metadata } from 'next';

export const siteConfig = {
  name: 'Dulce Hogar',
  description: 'Repostería artesanal en Bogotá. Tortas personalizadas, cupcakes, galletas decoradas y postres para bodas, cumpleaños y eventos especiales.',
  url: 'https://dulcehogar.com',
  ogImage: 'https://dulcehogar.com/og-image.jpg',
  keywords: [
    'repostería Bogotá',
    'tortas personalizadas',
    'cupcakes artesanales',
    'galletas decoradas',
    'postres para eventos',
    'tortas de matrimonio',
    'tortas de cumpleaños',
    'repostería artesanal',
    'dulces Bogotá',
    'pastelería Bogotá'
  ],
  links: {
    instagram: 'https://instagram.com/dulcehogar',
    facebook: 'https://facebook.com/dulcehogar',
    whatsapp: 'https://wa.me/573001234567'
  }
};

export function generateSEOMetadata(page: {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const title = page.title 
    ? `${page.title} | ${siteConfig.name}` 
    : `${siteConfig.name} - Repostería Artesanal en Bogotá`;
  
  const description = page.description || siteConfig.description;
  const keywords = [...siteConfig.keywords, ...(page.keywords || [])];

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      url: siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: page.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [page.ogImage || siteConfig.ogImage],
      creator: '@dulcehogar',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
