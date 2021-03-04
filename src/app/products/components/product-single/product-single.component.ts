import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss'],
})
export class ProductSingleComponent implements OnInit {
  ad: Ad;

  constructor(private adService: AdService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adService.getAd(id).subscribe((ad) => {
      this.ad = ad;
    });
  }
}
