import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, retry} from "rxjs";
import {ICourse} from "./courses-list/course";
import {mockCourses} from "./courses-list/mock-courses";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl: string = environment.baseUrl + '/classes';

  constructor(private http: HttpClient) { }

  getCourses() : Observable<Array<ICourse>>{

    return this.http.get<Array<ICourse>>(this.apiUrl) //Observable<Object>
      .pipe(
        // retry(3), // to deal with slow connection,
        // catchError(), // then handle the error
        map(courses => courses.map(course => {return {...course}}))
      );

    //return of(mockCourses);
  }

  getCourseById(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(this.apiUrl + '/' + id)
      .pipe(
        map(course => {return {...course}})
      );
  }

  addCourse(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.apiUrl, course);
  }

  updateCourse(course: ICourse): Observable<ICourse> {
    return this.http.put<ICourse>(this.apiUrl, course);
  }

  deleteCourse(id: string): Observable<Object> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
