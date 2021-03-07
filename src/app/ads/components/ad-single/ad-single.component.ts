import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ad-single',
  templateUrl: './ad-single.component.html',
  styleUrls: ['./ad-single.component.scss'],
})
export class AdSingleComponent implements OnInit {
  ad: Ad;

  constructor(private adService: AdService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.adService.getAd(id).subscribe((ad) => {
      this.ad = ad;
    });
  }
}
