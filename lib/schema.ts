export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Dulce Hogar',
    description: 'Repostería artesanal especializada en tortas personalizadas, cupcakes y postres para eventos',
    image: 'https://dulcehogar.com/logo.jpg',
    '@id': 'https://dulcehogar.com',
    url: 'https://dulcehogar.com',
    telephone: '+573001234567',
    email: 'info@dulcehogar.com',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle 123 #45-67',
      addressLocality: 'Bogotá',
      addressRegion: 'DC',
      postalCode: '110111',
      addressCountry: 'CO'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.7110,
      longitude: -74.0721
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00'
      }
    ],
    sameAs: [
      'https://instagram.com/dulcehogar',
      'https://facebook.com/dulcehogar'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '127'
    }
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  price: number;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'PEN',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Dulce Hogar'
      }
    }
  };
}
