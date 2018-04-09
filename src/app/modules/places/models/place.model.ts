import { Location } from './location.model';

export interface Place {
  id: string;
  name: string;
  location: Location;
  rating: number;
  reviews: number;
  categories: string[];
  imageUrl: string;
  url: string;
}
