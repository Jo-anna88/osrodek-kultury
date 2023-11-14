import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, retry} from "rxjs";
import {Course} from "./course";
import {mockCourses} from "./courses-list/mock-courses";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl: string = environment.baseUrl + '/classes';

  constructor(private http: HttpClient) { }

  getCourses() : Observable<Array<Course>>{

    return this.http.get<Array<Course>>(this.apiUrl) //Observable<Object>
      .pipe(
        // retry(3), // to deal with slow connection,
        // catchError(), // then handle the error
        map(courses => courses.map(course => {return {...course}}))
      );

    //return of(mockCourses);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(this.apiUrl + '/' + id)
      .pipe(
        map(course => {return {...course}})
      );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.apiUrl, course);
  }

  deleteCourse(id: string): Observable<Object> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
