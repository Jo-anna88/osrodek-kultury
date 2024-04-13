import {Component, Input, OnInit} from '@angular/core';
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

  valid$: Subject<boolean> = new Subject<boolean>();
  showInvalidMessage: boolean = false;
  results : any[] = []

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
    if (value.length >= 3) {
      this.valid$.next(true);
      this.searchService.search(value, this.searchType)
        .pipe(
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe({
          next: (results) => {
            this.results = results;
            console.log(this.results);
          }
        })
    } else {
      this.valid$.next(false);
    }
  }

  clearValue(inputField: HTMLInputElement): void {
    inputField.value = ''; // Clear the value of the input field
  }
}
