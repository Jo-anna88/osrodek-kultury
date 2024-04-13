import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";
import {SearchService} from "../../../core/services/search.service";
import {SearchType} from "../../models/search-type.model";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input()
  searchType: SearchType = SearchType.NONE;
  @Output()
  results: EventEmitter<Array<any>> = new EventEmitter<Array<any>>()
  @Output()
  queryRemoved: EventEmitter<void> = new EventEmitter<void>();

  searchTimeout: any; //NodeJS.Timeout;
  valid$: Subject<boolean> = new Subject<boolean>();
  showInvalidMessage: boolean = false;

  ngOnInit() {
    this.valid$.subscribe({
      next: (valid) => {
        if (!valid) {
          this.showInvalidMessage = true;
          setTimeout(() => {
            this.showInvalidMessage = false
          }, 3000); // hide invalid message after 3s
        }
      }
    })
  }

  constructor(private searchService: SearchService) {}

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(value: string) {
    if (value === '') {this.queryRemoved.emit();}
    if (value.length >= 3) {
      this.valid$.next(true);

      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout( () => {
        this.setResults(this.capitalizeFirstLetter(value))
      }, 1000);
    } else {
      this.valid$.next(false);
    }
  }

  clearValue(inputField: HTMLInputElement): void {
    inputField.value = ''; // Clear the value of the input field
    this.queryRemoved.emit();
  }

  setResults(value: string) {
    this.searchService.search(value, this.searchType)
      .subscribe({
        next: (results) => {
          this.results.emit(results);
        }
      })
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
