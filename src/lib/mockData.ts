export interface Property {
  id: string;
  title: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  type: 'apartment' | 'house' | 'villa' | 'condo';
  bedrooms: number;
  bathrooms: number;
  guests: number;
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
  };
  description: string;
}

export interface PropertyPin {
  id: string;
  coordinates: [number, number];
  location: string;
  properties: Property[];
}

export interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

export const mockProperties: Property[] = [
  // North America
  {
    id: '1',
    title: 'Cozy Downtown Apartment',
    location: 'Manhattan, New York',
    coordinates: [-74.006, 40.7128],
    price: 150,
    rating: 4.8,
    reviewCount: 127,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Air conditioning'],
    host: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Beautiful apartment in the heart of Manhattan with stunning city views.'
  },
  {
    id: '1a',
    title: 'Luxury Manhattan Penthouse',
    location: 'Manhattan, New York',
    coordinates: [-74.006, 40.7128], // Same coordinates as property 1
    price: 450,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['WiFi', 'Kitchen', 'City views', 'Concierge', 'Gym', 'Rooftop'],
    host: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Stunning penthouse with panoramic Manhattan skyline views and luxury amenities.'
  },
  {
    id: '1b',
    title: 'Manhattan Studio Loft',
    location: 'Manhattan, New York',
    coordinates: [-74.006, 40.7128], // Same coordinates as property 1
    price: 95,
    rating: 4.6,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['WiFi', 'Kitchen', 'Modern design', 'City views'],
    host: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Stylish studio loft perfect for solo travelers or couples exploring NYC.'
  },
  {
    id: '2',
    title: 'Modern Beach House',
    location: 'Malibu, California',
    coordinates: [-118.7798, 34.0259],
    price: 350,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Beach access', 'Parking', 'Hot tub'],
    host: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Stunning beachfront property with panoramic ocean views and private beach access.'
  },
  {
    id: '3',
    title: 'Luxury Mountain Villa',
    location: 'Aspen, Colorado',
    coordinates: [-106.8231, 39.1911],
    price: 500,
    rating: 4.9,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    guests: 12,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Ski access', 'Hot tub', 'Garage'],
    host: {
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Exclusive mountain retreat with ski-in/ski-out access and breathtaking views.'
  },
  {
    id: '4',
    title: 'Rustic Cabin Retreat',
    location: 'Lake Tahoe, California',
    coordinates: [-120.0324, 39.0968],
    price: 200,
    rating: 4.8,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Lake access', 'Hiking trails', 'BBQ'],
    host: {
      name: 'Lisa Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Cozy cabin perfect for a peaceful retreat by the lake with hiking trails nearby.'
  },
  {
    id: '5',
    title: 'Historic Brownstone',
    location: 'Brooklyn, New York',
    coordinates: [-73.9442, 40.6782],
    price: 180,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['WiFi', 'Kitchen', 'Historic building', 'Garden', 'Parking'],
    host: {
      name: 'Emma Williams',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Charming historic brownstone in trendy Brooklyn with original architectural details.'
  },
  {
    id: '6',
    title: 'Modern Condo with City Views',
    location: 'Toronto, Canada',
    coordinates: [-79.3832, 43.6532],
    price: 120,
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'City views', 'Gym', 'Pool', 'Concierge'],
    host: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Sleek modern condo in downtown Toronto with panoramic city skyline views.'
  },
  {
    id: '7',
    title: 'Coastal Cottage',
    location: 'Vancouver, Canada',
    coordinates: [-123.1216, 49.2827],
    price: 160,
    rating: 4.8,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Ocean views', 'Garden', 'BBQ'],
    host: {
      name: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Charming coastal cottage with stunning ocean views and easy beach access.'
  },

  // Europe
  {
    id: '8',
    title: 'Charming Parisian Loft',
    location: 'Le Marais, Paris',
    coordinates: [2.3522, 48.8566],
    price: 180,
    rating: 4.7,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Historic building'],
    host: {
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Authentic Parisian experience in the historic Le Marais district.'
  },
  {
    id: '8a',
    title: 'Elegant Parisian Suite',
    location: 'Le Marais, Paris',
    coordinates: [2.3522, 48.8566], // Same coordinates as property 8
    price: 280,
    rating: 4.8,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'Historic building', 'Luxury furnishing'],
    host: {
      name: 'Pierre Laurent',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Luxurious suite in a beautifully restored 17th-century building in Le Marais.'
  },
  {
    id: '9',
    title: 'Historic London Townhouse',
    location: 'Covent Garden, London',
    coordinates: [-0.1276, 51.5074],
    price: 220,
    rating: 4.6,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1529408632839-a54952c491e5?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['WiFi', 'Kitchen', 'Historic building', 'Garden', 'Fireplace'],
    host: {
      name: 'James Thompson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Elegant Georgian townhouse in the heart of Covent Garden with period features.'
  },
  {
    id: '10',
    title: 'Modern Berlin Apartment',
    location: 'Mitte, Berlin',
    coordinates: [13.4050, 52.5200],
    price: 85,
    rating: 4.5,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'City views', 'Historic building'],
    host: {
      name: 'Klaus Weber',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Stylish apartment in Berlin\'s trendy Mitte district with modern amenities.'
  },
  {
    id: '11',
    title: 'Venetian Palazzo',
    location: 'Venice, Italy',
    coordinates: [12.3155, 45.4408],
    price: 280,
    rating: 4.9,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Canal views', 'Historic building', 'Gondola access'],
    host: {
      name: 'Marco Rossi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Magnificent Venetian palazzo with stunning canal views and authentic Italian charm.'
  },
  {
    id: '12',
    title: 'Barcelona Modern Loft',
    location: 'Eixample, Barcelona',
    coordinates: [2.1734, 41.3851],
    price: 140,
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    guests: 3,
    amenities: ['WiFi', 'Kitchen', 'Balcony', 'City views', 'Historic building'],
    host: {
      name: 'Carmen Garcia',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Beautiful modernist loft in Barcelona\'s Eixample district with Gaudí influences.'
  },
  {
    id: '13',
    title: 'Amsterdam Canal House',
    location: 'Jordaan, Amsterdam',
    coordinates: [4.9041, 52.3676],
    price: 190,
    rating: 4.8,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['WiFi', 'Kitchen', 'Canal views', 'Historic building', 'Bike rental'],
    host: {
      name: 'Pieter van der Berg',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Charming 17th-century canal house in Amsterdam\'s historic Jordaan neighborhood.'
  },
  {
    id: '14',
    title: 'Prague Castle View Apartment',
    location: 'Prague, Czech Republic',
    coordinates: [14.4378, 50.0755],
    price: 95,
    rating: 4.6,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Castle views', 'Historic building'],
    host: {
      name: 'Petr Novák',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Cozy apartment with stunning views of Prague Castle in the heart of the old town.'
  },

  // Asia
  {
    id: '15',
    title: 'Modern Tokyo Condo',
    location: 'Shibuya, Tokyo',
    coordinates: [139.6917, 35.6895],
    price: 95,
    rating: 4.7,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
    type: 'condo',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['WiFi', 'Kitchen', 'City views', 'Concierge', 'Gym'],
    host: {
      name: 'Yuki Tanaka',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Contemporary condo with stunning city views in the heart of Shibuya.'
  },
  {
    id: '16',
    title: 'Tropical Island Bungalow',
    location: 'Bali, Indonesia',
    coordinates: [115.1889, -8.4095],
    price: 120,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Beach access', 'Garden', 'Outdoor shower'],
    host: {
      name: 'Putu Sari',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Traditional Balinese bungalow surrounded by lush tropical gardens.'
  },
  {
    id: '17',
    title: 'Seoul Modern Apartment',
    location: 'Gangnam, Seoul',
    coordinates: [127.0276, 37.4979],
    price: 110,
    rating: 4.6,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'City views', 'Gym', 'Concierge'],
    host: {
      name: 'Min-jun Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Sleek modern apartment in Seoul\'s trendy Gangnam district with city skyline views.'
  },
  {
    id: '18',
    title: 'Singapore Marina Bay Suite',
    location: 'Marina Bay, Singapore',
    coordinates: [103.8198, 1.2966],
    price: 250,
    rating: 4.9,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Marina views', 'Pool', 'Gym', 'Concierge'],
    host: {
      name: 'Wei Ming',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Luxury suite with panoramic Marina Bay views in Singapore\'s financial district.'
  },
  {
    id: '19',
    title: 'Bangkok Sky Villa',
    location: 'Sukhumvit, Bangkok',
    coordinates: [100.5018, 13.7563],
    price: 80,
    rating: 4.5,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['WiFi', 'Kitchen', 'City views', 'Pool', 'Gym'],
    host: {
      name: 'Somchai Wong',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Modern high-rise apartment with stunning Bangkok skyline views.'
  },
  {
    id: '20',
    title: 'Hong Kong Peak Villa',
    location: 'The Peak, Hong Kong',
    coordinates: [114.1694, 22.2783],
    price: 320,
    rating: 4.8,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['WiFi', 'Kitchen', 'Harbor views', 'Pool', 'Garden', 'Parking'],
    host: {
      name: 'David Chan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Exclusive villa on The Peak with breathtaking Hong Kong harbor views.'
  },

  // Australia & Oceania
  {
    id: '21',
    title: 'Sydney Harbor Apartment',
    location: 'Circular Quay, Sydney',
    coordinates: [151.2093, -33.8688],
    price: 200,
    rating: 4.7,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Harbor views', 'Pool', 'Gym'],
    host: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Stunning apartment with iconic Sydney Opera House and Harbor Bridge views.'
  },
  {
    id: '22',
    title: 'Melbourne Arts District Loft',
    location: 'Fitzroy, Melbourne',
    coordinates: [144.9631, -37.8136],
    price: 150,
    rating: 4.6,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    guests: 3,
    amenities: ['WiFi', 'Kitchen', 'City views', 'Historic building'],
    host: {
      name: 'Jack Thompson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Trendy loft in Melbourne\'s vibrant Fitzroy arts district with street art views.'
  },
  {
    id: '23',
    title: 'Auckland Waterfront House',
    location: 'Auckland, New Zealand',
    coordinates: [174.7633, -36.8485],
    price: 180,
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['WiFi', 'Kitchen', 'Waterfront views', 'Garden', 'BBQ'],
    host: {
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Beautiful waterfront house with stunning Auckland harbor views.'
  },

  // South America
  {
    id: '24',
    title: 'Rio Beachfront Apartment',
    location: 'Copacabana, Rio de Janeiro',
    coordinates: [-43.1729, -22.9068],
    price: 130,
    rating: 4.7,
    reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Beach access', 'Pool', 'City views'],
    host: {
      name: 'Carlos Silva',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Vibrant apartment steps from Copacabana Beach with ocean and city views.'
  },
  {
    id: '25',
    title: 'Buenos Aires Historic Loft',
    location: 'San Telmo, Buenos Aires',
    coordinates: [-58.3816, -34.6037],
    price: 90,
    rating: 4.5,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ['WiFi', 'Kitchen', 'Historic building', 'City views'],
    host: {
      name: 'María Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Charming historic loft in Buenos Aires\' bohemian San Telmo neighborhood.'
  },
  {
    id: '26',
    title: 'Lima Modern Condo',
    location: 'Miraflores, Lima',
    coordinates: [-77.0428, -12.0464],
    price: 75,
    rating: 4.4,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Ocean views', 'Pool', 'Gym'],
    host: {
      name: 'Diego Vargas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Modern condo in Lima\'s upscale Miraflores district with Pacific Ocean views.'
  },

  // Africa & Middle East
  {
    id: '27',
    title: 'Cape Town Mountain Villa',
    location: 'Camps Bay, Cape Town',
    coordinates: [18.4241, -33.9249],
    price: 220,
    rating: 4.8,
    reviewCount: 67,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: ['WiFi', 'Kitchen', 'Mountain views', 'Pool', 'Garden', 'BBQ'],
    host: {
      name: 'Thabo Mthembu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Luxury villa with stunning Table Mountain views in Cape Town\'s Camps Bay.'
  },
  {
    id: '28',
    title: 'Dubai Marina Apartment',
    location: 'Marina, Dubai',
    coordinates: [55.1353, 25.0769],
    price: 180,
    rating: 4.7,
    reviewCount: 123,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Marina views', 'Pool', 'Gym', 'Concierge'],
    host: {
      name: 'Ahmed Al-Rashid',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Luxury apartment in Dubai Marina with stunning waterfront and city views.'
  },
  {
    id: '29',
    title: 'Marrakech Riad',
    location: 'Medina, Marrakech',
    coordinates: [-7.9811, 31.6295],
    price: 110,
    rating: 4.6,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400&h=300&fit=crop',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ['WiFi', 'Kitchen', 'Courtyard', 'Historic building', 'Rooftop terrace'],
    host: {
      name: 'Fatima Benali',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isSuperhost: false
    },
    description: 'Authentic Moroccan riad in the heart of Marrakech\'s historic medina.'
  },
  {
    id: '30',
    title: 'Tel Aviv Beach Apartment',
    location: 'Tel Aviv, Israel',
    coordinates: [34.7818, 32.0853],
    price: 140,
    rating: 4.5,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ['WiFi', 'Kitchen', 'Beach access', 'City views', 'Balcony'],
    host: {
      name: 'Yael Cohen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isSuperhost: true
    },
    description: 'Modern apartment steps from Tel Aviv\'s beautiful Mediterranean beaches.'
  }
];
