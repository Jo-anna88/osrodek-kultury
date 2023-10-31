import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
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
      .pipe(map(courses => courses.map(course => ({
        id: course.id,
        imgSource: course.imgSource,
        name: course.name,
        teacher: course.teacher,
        description: course.description
        })
      )));
    //return of(mockCourses);
  }

  getCourseById(id: number) : Observable <ICourse> {
    console.log("id: "+ id);
    //return this.http.get(...);
    return of(mockCourses[--id]);
  }
}
