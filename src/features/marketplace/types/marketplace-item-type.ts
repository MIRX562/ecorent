export type ItemType = {
  id: number;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  category: string;
  location: string;
  lat: number;
  lng: number;
  distance: number;
  rating: number;
  reviews: number;
  owner: {
    name: string;
    avatar: string;
    rating: number;
  };
  saved: boolean;
};
