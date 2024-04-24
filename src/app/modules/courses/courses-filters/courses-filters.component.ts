import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Category, Course, CourseCriteria} from "../course";
import {ButtonAction} from "../../../shared/components/modal/modal";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserSimpleData} from "../../../shared/models/user.model";
import {AppLocation} from "../../../shared/models/address.model";
import {AddressService} from "../../../core/services/address.service";
import {CoursesService} from "../courses.service";
import {BehaviorSubject, Subject, Subscription, takeUntil} from "rxjs";
import {SearchService} from "../../../core/services/search.service";
import {Params} from "@angular/router";

@Component({
  selector: 'app-courses-filters',
  templateUrl: './courses-filters.component.html',
  styleUrls: ['./courses-filters.component.scss']
})
export class CoursesFiltersComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  isFilters$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  protected readonly ButtonAction = ButtonAction;
  filters: FormGroup;
  teachers: UserSimpleData[] = [];
  categories: string[] = Object.values(Category); // e.g., 0:"ART"
  locations: AppLocation[] = [];
  @Output()
  filtersSubmitEvent: EventEmitter<CourseCriteria> = new EventEmitter<CourseCriteria>();
  @Output()
  filterResults: EventEmitter<Array<Course>> = new EventEmitter<Array<Course>>()

  constructor(private fb: FormBuilder,
              private courseService: CoursesService,
              private addressService: AddressService,
              private searchService: SearchService) {
    this.filters = this.fb.group({
      minAge: [''],
      maxAge: [''],
      price: [''],
      teacher: [null],
      category: [null],
      location: [null]
    });
  }

  get teacher() {
    return this.filters.get('teacher')!;
  }
  get location() {
    return this.filters.get('location')!;
  }

  ngOnInit() {
    this.isFilters$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: (isFilters) => {
            if (isFilters) { this.loadData(); }
          }
    });
  }

  toggleFilters() {
    this.isFilters$.next(!this.isFilters$.getValue());
  }

  loadData() {
    // fetch teachers data
    this.courseService.getTeachers().subscribe({
      next: teachers => {this.teachers = teachers}
    });

    // fetch locations data
    this.addressService.getLocations().subscribe({
      next: locations => {this.locations = locations}
    });
  }

  submitFilters() {
    let courseCriteria: CourseCriteria = this.filters.value;
    let params = this.convertToParams(courseCriteria);
    this.searchService.searchCoursesByParams(params);
  }

  convertToParams(courseCriteria: CourseCriteria) {
    let params: any = courseCriteria;
    if(!courseCriteria.teacher) {params.teacher = ''} else {params.teacher = this.teachers[this.teacher.value].id}
    if(!courseCriteria.category) {params.category = ''}
    if(!courseCriteria.location) {params.location = ''} else {params.location = this.locations[this.location.value].id}
    return params;
  }

  ngOnDestroy() {
    this.filters.reset();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
