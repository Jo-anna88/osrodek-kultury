import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ICourse} from "./courses-list/course";
import {mockCourses} from "./courses-list/mock-courses";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiUrl = "http://localhost:4200/classes";

  constructor(private http: HttpClient) { }

  //TODO:return max 10 events for page and max 30 events from all of them (pagination needed!)
  getCourses() : Observable<Array<ICourse>>{
    //return this.http.get(`${this.apiUrl}`, responseType: );
    return of(mockCourses);
  }
  getCourseById(id: number) : Observable <ICourse> {
    console.log("id: "+id);
    //return this.http.get(...);
    return of(mockCourses[--id]);
  }
}
