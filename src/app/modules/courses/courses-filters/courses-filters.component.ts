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
  selectedTeacher: UserSimpleData = {};
  teachersSubscription = new Subscription();
  categories: string[] = Object.values(Category); // e.g., 0:"ART"
  locations: AppLocation[] = [];
  selectedLocation: AppLocation = {};
  locationsSubscription = new Subscription();
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

  ngOnInit() {
    this.isFilters$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (isFilters) => {
        if (isFilters) {
          this.loadData();
          this.trackTeacherControlValue();
          this.trackLocationControlValue();
        } else {
          this.removeTrackers();
        }
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

  trackTeacherControlValue() {
    this.teachersSubscription = this.filters.controls['teacher'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((index: number | null) => {
        if (index !== null) {
          this.selectedTeacher = this.teachers[index];
        }
      });
  }

  trackLocationControlValue() {
    this.locationsSubscription = this.filters.controls['location'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((index: number | null) => {
        if (index !== null) {
          this.selectedLocation = this.locations[index];
        }
      });
  }

  removeTrackers() {
    this.teachersSubscription?.unsubscribe();
    this.locationsSubscription?.unsubscribe();
  }

  submitFilters() {
    let courseCriteria: CourseCriteria = this.filters.value;
    let params = this.convertToParams(courseCriteria);
    //this.filtersSubmitEvent.emit(courseCriteria);
    this.searchService.searchCoursesByParams(params);
  }

  convertToParams(courseCriteria: CourseCriteria) {
    let params: any = courseCriteria;
    console.log(params);
    if(!courseCriteria.teacher) {params.teacher = ''} else {params.teacher = this.selectedTeacher.id}
    if(!courseCriteria.category) {params.category = ''}
    if(!courseCriteria.location) {params.location = ''} else {params.location = this.selectedLocation.id}
    console.log(params);
    return params;
  }

  ngOnDestroy() {
    this.filters.reset();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
