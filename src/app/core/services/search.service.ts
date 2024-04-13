import {Injectable} from '@angular/core';
import {SearchType} from "../../shared/models/search-type.model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {mockCulturalEvents} from "../../modules/cultural-events/cultural-events/mock-cultural-events";
import {Course} from "../../modules/courses/course";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl: string = environment.baseUrl + '/api';
  constructor (private http: HttpClient, private router: Router) {}
  search(value: string, searchType: SearchType): Observable<Array<any>> {
    if(searchType === SearchType.COURSE) {
      return this.searchCourses(value);
    }
    let results = [];
    results.push(mockCulturalEvents[0])
    return of(results)
  }

  searchCourses(name: string): Observable<Course[]> {
    this.router.navigate(['/classes/search'], { queryParams: { name: name } });
    return this.http.get<Array<Course>>(this.apiUrl + '/classes/search', { params: { name: name } });
  }
}
