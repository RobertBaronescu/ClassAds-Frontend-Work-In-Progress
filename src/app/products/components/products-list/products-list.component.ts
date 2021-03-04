import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  ads: Ad[];

  constructor(private adService: AdService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.adService.getAdsByCategory(categoryId).subscribe((ads) => {
      this.ads = ads;
    });

  }
}
