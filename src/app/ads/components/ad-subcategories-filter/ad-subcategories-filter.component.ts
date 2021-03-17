import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdFilter } from 'src/app/interfaces/ad-filter.interface';

import { Subcategory } from 'src/app/interfaces/subcategory.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './ad-subcategories-filter.component.html',
  styleUrls: ['./ad-subcategories-filter.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() subcategories: Subcategory[];
  @Output() subcategoryCheckEmitter = new EventEmitter<AdFilter>();

  constructor() {}

  ngOnInit(): void {}

  checkSubcategory(event: any, subcategory: Subcategory) {
    const adFilter: AdFilter = {
      checked: event.target.checked,
      value: subcategory,
    };
    this.subcategoryCheckEmitter.emit(adFilter);
  }
}
