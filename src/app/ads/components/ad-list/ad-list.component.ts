import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdsResponse } from 'src/app/interfaces/ads-response.interface';
import { Subcategory } from 'src/app/interfaces/subcategory.interface';
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
  initialAds: Ad[];
  currentPage: number = 1;
  subcategories: Subcategory[];
  numberOfAds: number;

  constructor(private adService: AdService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.adService
      .getAdsByCategory(categoryId)
      .subscribe((response: AdsResponse) => {
        this.ads = [...response.ads];
        this.initialAds = [...this.ads];
        this.subcategories = [...response.subcategories];
        this.numberOfAds = response.count;
      });
  }

  searchAds(filterBy: string) {
    let adsToFilter = [...this.ads];
    this.ads = [...this.initialAds];
    if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      adsToFilter = adsToFilter.filter((ad) =>
        ad.title.toLocaleLowerCase().includes(filterBy)
      );
      this.ads = [...adsToFilter];
    } else {
      return this.initialAds;
    }
  }

  changePage(currentPage: number) {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    const pageOffset = (currentPage - 1) * AD_LIMIT;

    this.adService
      .getAdsByCategory(categoryId, pageOffset)
      .subscribe((response: AdsResponse) => {
        this.ads = [...response.ads];
        this.currentPage = currentPage;
      });
  }

  subcategoryChecked(event) {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    const pageOffset = (this.currentPage - 1) * AD_LIMIT;
    const foundSubcategory = this.subcategories.find(
      (category) => category.name === event.target.value
    );

    if (event.target.checked) {
      this.adService.params.subcategories.push(String(foundSubcategory._id));
      this.adService
        .getAdsByCategory(categoryId, pageOffset, this.adService.params)
        .subscribe((response: AdsResponse) => {
          this.ads = [...response.ads];
        });
    } else {
      this.adService.params.subcategories.splice(
        this.adService.params.subcategories.indexOf(foundSubcategory._id),
        1
      );
      this.adService
        .getAdsByCategory(categoryId, pageOffset, this.adService.params)
        .subscribe((response: AdsResponse) => {
          this.ads = [...response.ads];
        });
    }
  }
}
