import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdService } from 'src/app/services/ad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlistAds: Ad[];

  constructor(
    private adService: AdService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adService
      .getAdsByUserWishlist(this.userService.currentUser$.getValue()?._id)
      .subscribe((ads) => {
        this.wishlistAds = [...ads];
      });
  }

  closeCard(ad: Ad) {
    const adToRemove = { adId: ad._id };
    this.adService
      .addItemToWishlist(
        this.userService.currentUser$.getValue()?._id,
        adToRemove
      )
      .subscribe(() => {
        this.userService.currentUser$
          .getValue()
          .wishlist.splice(
            this.userService.currentUser$.getValue().wishlist.indexOf(ad._id),
            1
          );
        this.wishlistAds.splice(this.wishlistAds.indexOf(ad), 1);
      });
  }

  redirectToSingleProduct(adId: string) {
    this.router.navigate([`/ads/${adId}`]);
  }
}
