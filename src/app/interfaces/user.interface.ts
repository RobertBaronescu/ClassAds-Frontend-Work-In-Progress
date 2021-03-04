import { Ad } from './ad.interface';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  picture?: string;
  phone: string;
  wishlist: string[];
}
