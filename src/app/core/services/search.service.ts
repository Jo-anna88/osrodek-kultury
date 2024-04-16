import {Injectable} from '@angular/core';
import {SearchType} from "../../shared/models/search-type.model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {mockCulturalEvents} from "../../modules/cultural-events/mock-cultural-events";
import {Course} from "../../modules/courses/course";
import {Params, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl: string = environment.baseUrl + '/api';
  constructor (private http: HttpClient, private router: Router) {}
  search(value: string, searchType: SearchType) {
    if(searchType === SearchType.COURSE) {
      this.searchCourses(this.capitalizeFirstLetter(value));
    }
    let results = [];
    results.push(mockCulturalEvents[0])
    //return of(results)
  }

  searchCourses(name: string) {
    this.router.navigate(['/classes/search'], { queryParams: { name: name } });
  }

  searchCoursesByParams(params: Params): Observable<Array<Course>> {
    this.router.navigate(['/classes/search'], { queryParams: params})
    return this.http.get<Array<Course>>(this.apiUrl + '/classes/search', {params: params});
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
