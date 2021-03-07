import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdService } from 'src/app/services/ad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ad-list-item',
  templateUrl: './ad-list-item.component.html',
  styleUrls: ['./ad-list-item.component.scss'],
})
export class AdListItemComponent implements OnInit {
  @Input() ad: Ad;

  wishlist: string[];

  constructor(
    private router: Router,
    public userService: UserService,
    private adService: AdService
  ) {}

  ngOnInit(): void {
    if (this.userService.currentUser$.getValue()) {
      this.wishlist = this.userService.currentUser$.getValue().wishlist;
    }
  }

  redirectToAd(adId: string) {
    this.router.navigate([`/ads/${adId}`]);
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
