import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Ad } from '../interfaces/ad.interface';
import { AdsResponse } from '../interfaces/ads-response.interface';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  currentAdId$ = new BehaviorSubject<string>(null);
  params = { offset: '', ids: [], subcategories: [] };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private http: HttpClient) {}

  getAdsByCategory(
    categoryId: string,
    pageOffset: number = 0,
    params?: any
  ): Observable<AdsResponse> {
    this.params.offset = String(pageOffset);
    this.params.ids = ['1', '2'];

    return this.http.get<AdsResponse>(
      `http://localhost:3000/ads/${categoryId}`,
      { params: this.params }
    );
  }

  getAdsByUser(userId: string): Observable<Ad[]> {
    return this.http.get<Ad[]>(`http://localhost:3000/user/ads/${userId}`);
  }

  getAd(id: string): Observable<Ad> {
    return this.http.get<Ad>(`http://localhost:3000/ads/ad/${id}`);
  }

  deleteAd(adId: string) {
    return this.http.delete(`http://localhost:3000/ads/delete/${adId}`);
  }

  createAd(ad: Ad) {
    return this.http.post(
      'http://localhost:3000/ads/post',
      ad,
      this.httpOptions
    );
  }

  editAd(ad: Ad) {
    return this.http.put(
      `http://localhost:3000/ads/edit/${ad._id}`,
      ad,
      this.httpOptions
    );
  }

  addItemToWishlist(userId: string, ad: { adId: string }) {
    return this.http.put(
      `http://localhost:3000/user/wishlist/${userId}`,
      ad,
      this.httpOptions
    );
  }

  getAdsByUserWishlist(userId: string): Observable<Ad[]> {
    return this.http.get<Ad[]>(
      `http://localhost:3000/user/getWishlist/${userId}`
    );
  }
}
