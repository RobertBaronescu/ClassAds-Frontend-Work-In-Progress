import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
})
export class ProductListItemComponent implements OnInit {
  @Input() ad: Ad;

  constructor(
    private router: Router,
    public userService: UserService,
    private adService: AdService
  ) {}

  ngOnInit(): void {
    if (this.userService.currentUser$.getValue()) {
    }
  }

  redirectToAd(adId: string) {
    this.router.navigate([`/product/${adId}`]);
  }

  addToWishlist() {
    const ad = { adId: this.ad._id };
    this.adService
      .addItemToWishlist(
        String(this.userService.currentUser$.getValue()._id),
        ad
      )
      .subscribe(() => {
        const wishlist = this.userService.currentUser$.getValue().wishlist;
        const wishlistedAd = wishlist.find((listItem) => {
          return listItem === this.ad._id;
        });

        if (wishlistedAd) {
          wishlist.splice(wishlist.indexOf(this.ad._id), 1);
        } else {
          wishlist.push(this.ad._id);
        }

        this.userService.currentUser$.getValue().wishlist = wishlist;

        this.userService.currentUser$.next(
          this.userService.currentUser$.getValue()
        );
      });
  }
}
