import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Category } from 'src/app/interfaces/category.interface';
import { Subcategory } from 'src/app/interfaces/subcategory.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() subcategories: Subcategory[];
  @Output() subcategoryCheckEmitter = new EventEmitter<Event>();

  constructor() {}

  ngOnInit(): void {}

  checkSubcategory(event:Event) {
    this.subcategoryCheckEmitter.emit(event);
  }
}
