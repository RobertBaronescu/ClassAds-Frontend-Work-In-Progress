export interface Ad {
  _id?: string;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  photos: string[];
  userId?: string;
  categoryId?: string;
  subcategoryId?: string;
  sponsored?: boolean;
  views?: number;
}
