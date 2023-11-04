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

  constructor(private http: HttpClient) { }

  //TODO:return max 10 events for page and max 30 events from all of them (pagination needed!)
  getCourses() : Observable<Array<ICourse>>{
    return this.http.get<Array<ICourse>>(environment.baseUrl+'/classes') //Observable<Object>
      .pipe(
        // retry(3), // to deal with slow connection,
        // catchError(), // then handle the error
        map(courses => courses.map(course => {return {...course}}))
      );
    //return of(mockCourses);
  }

  getCourseByIdTest(id: number) : Observable <ICourse> {
    console.log("id: "+ id);
    //return this.http.get(...);
    return of(mockCourses[--id]);
  }
  getCourseById(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(environment.baseUrl+'/classes/'+id)
      .pipe(
        map(course => {return {...course}})
      );
  }
}
