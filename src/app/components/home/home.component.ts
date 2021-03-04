import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { AdService } from 'src/app/services/ad.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private adService: AdService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = [...categories];
    });
  }

  redirectToCategoryAds(categoryId: string) {
    this.route.navigate([`/product/list/${categoryId}`]);

  }
}
