import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent implements OnInit {
  @Output() priceEventEmitter = new EventEmitter<any>();

  minValue: number = 0;
  maxValue: number = 99999;
  options: Options = {
    floor: 0,
    ceil: 99999,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '$' + value;
        case LabelType.High:
          return '$' + value;
        default:
          return '$' + value;
      }
    },
  };

  constructor() {}

  ngOnInit(): void {}

  sendPriceFilter() {
    const priceRange = [this.minValue, this.maxValue];
    this.priceEventEmitter.next(priceRange);
  }
}
