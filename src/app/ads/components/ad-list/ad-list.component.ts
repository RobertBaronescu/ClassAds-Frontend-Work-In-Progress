import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, startWith, tap } from 'rxjs/operators';

import { AdFilter } from 'src/app/interfaces/ad-filter.interface';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdsResponse } from 'src/app/interfaces/ads-response.interface';
import { Subcategory } from 'src/app/interfaces/subcategory.interface';
import { AdFilterQuery } from 'src/app/models/ad-filter-query.model';
import { AdService } from 'src/app/services/ad.service';

const AD_LIMIT = 3;

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {
  ads: Ad[];
  inputValue: string;
  currentPage: number = 1;
  subcategories: Subcategory[];
  numberOfAds: number;
  currentFilters: AdFilterQuery = new AdFilterQuery();
  loader$: Observable<boolean> = this.adService.adsLoader$
    .asObservable()
    .pipe(startWith(true));

  constructor(private adService: AdService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.adService
      .getAdsByCategory(categoryId, this.currentFilters)
      .subscribe((response: AdsResponse) => {
        this.ads = [...response.ads];
        this.subcategories = [...response.subcategories];
        this.numberOfAds = response.count;
      });
  }

  searchAds(searchValue: string) {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.currentFilters = { ...this.currentFilters, search: searchValue };
    this.adService
      .getAdsByCategory(categoryId, this.currentFilters)

      .subscribe((repsonse: AdsResponse) => {
        this.ads = [...repsonse.ads];
        this.numberOfAds = repsonse.count;
      });
  }

  changePage(currentPage: number) {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    const pageOffset = (currentPage - 1) * AD_LIMIT;
    this.currentFilters = {
      ...this.currentFilters,
      offset: String(pageOffset),
    };

    this.adService
      .getAdsByCategory(categoryId, this.currentFilters)
      .subscribe((response: AdsResponse) => {
        this.ads = [...response.ads];
        this.currentPage = currentPage;
      });
  }

  subcategoryChecked(filter: AdFilter) {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    const { checked, value: subcategory } = filter;

    if (checked) {
      this.currentFilters.subcategories.push(subcategory._id);

      this.adService
        .getAdsByCategory(categoryId, this.currentFilters)
        .subscribe((response: AdsResponse) => {
          this.ads = [...response.ads];
          this.numberOfAds = response.count;
        });
    } else {
      this.currentFilters.subcategories.splice(
        this.currentFilters.subcategories.indexOf(subcategory._id),
        1
      );
      this.adService
        .getAdsByCategory(categoryId, this.currentFilters)
        .subscribe((response: AdsResponse) => {
          this.ads = [...response.ads];
          this.numberOfAds = response.count;
        });
    }
  }

  priceRangeChanged(price) {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.currentFilters = { ...this.currentFilters, price: price };
    this.adService
      .getAdsByCategory(categoryId, this.currentFilters)

      .subscribe((response) => {
        this.ads = [...response.ads];
        this.numberOfAds = response.count;
      });
  }
}
