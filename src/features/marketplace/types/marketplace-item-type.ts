export interface ItemType {
  id: number;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  category: string;
  location: string;
  distance: number;
  rating: number;
  reviews: number;
  saved: boolean;
  owner: {
    name: string;
    avatar: string;
    rating: number;
  };
}
