// Sample images from Unsplash for different scenes
export const availableImages = [
  {
    id: 'city-1',
    label: 'City Street',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
  },
  {
    id: 'nature-1',
    label: 'Forest Path',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
  },
  {
    id: 'urban-1',
    label: 'Urban Architecture',
    url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop',
  },
  {
    id: 'landscape-1',
    label: 'Mountain View',
    url: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?w=400&h=300&fit=crop',
  },
] as const;

export type ImageId = typeof availableImages[number]['id'];

export const getImageById = (id: string) => 
  availableImages.find(img => img.id === id);