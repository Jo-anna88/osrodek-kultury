import { Injectable } from '@angular/core';
import {SearchType} from "../../shared/models/search-type.model";
import {ObservableInput, of} from "rxjs";
import {mockCulturalEvents} from "../../modules/cultural-events/cultural-events/mock-cultural-events";
import {mockCourses} from "../../modules/courses/courses-list/mock-courses";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl: string = environment.baseUrl + '/api';
  constructor (private http: HttpClient) {}
  search(value: string, searchType: SearchType) {
    console.log(value, searchType);
    let results = [];
    results.push(mockCourses[0])
    return of(results);
  }
}
