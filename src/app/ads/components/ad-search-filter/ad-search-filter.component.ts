import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './ad-search-filter.component.html',
  styleUrls: ['./ad-search-filter.component.scss'],
})
export class SearchComponent implements OnDestroy, AfterViewInit {
  @Output() searchEventEmitter = new EventEmitter<string>();

  @ViewChild('search') searchInput: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(debounceTime(400), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((event: any) => {
        this.searchEventEmitter.next(event.target.value);
      });
  }

  ngOnDestroy() {}
}
