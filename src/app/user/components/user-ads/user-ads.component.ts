import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.scss'],
})
export class UserAdsComponent implements OnInit {
  userAds: Ad[];

  constructor(
    private adService: AdService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.adService.getAdsByUser(userId).subscribe((ads) => {
      this.userAds = ads;
    });
  }

  redirectToAd(id: string) {
    this.router.navigate([`/product/${id}`]);
  }

  deleteAd(adId: string) {
    this.adService.deleteAd(adId).subscribe(() => {
      const foundAd = this.userAds.find((ad) => ad._id === adId);
      this.userAds.splice(this.userAds.indexOf(foundAd), 1);
    });
  }

  redirectToEditAdd(adId: string) {
    this.adService.currentAdId$.next(adId);
    this.router.navigate([`/product/add-edit-ad/edit/${adId}`]);
  }
}
