import { Ad } from './ad.interface';
import { Subcategory } from './subcategory.interface';

export interface AdsResponse {
  ads: Ad[];
  subcategories: Subcategory[];
  count: number;
}
