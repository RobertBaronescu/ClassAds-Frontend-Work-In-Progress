import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() searchEventEmitter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  searchAds(inputValue: string) {
    this.searchEventEmitter.emit(inputValue);
  }
}
