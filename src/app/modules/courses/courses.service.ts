import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, retry} from "rxjs";
import {Course, CourseBasicInfo, CourseDetails} from "./course.model";
import {mockCourses} from "./mock-courses";
import {environment} from "../../../environments/environment";
import {UserSimpleData} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl: string = environment.baseUrl + '/api/classes';

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

  getCourseDetailsById(id: string): Observable<CourseDetails> {
    return this.http.get<CourseDetails>(this.apiUrl + '/' + id + '/details')
      .pipe(
        map (courseDetails => {return {...courseDetails}})
      );
  }

  addCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, newCourse);
  }

  addCourseDetails(newCourseDetails: CourseDetails): Observable<CourseDetails> {
    return this.http.post<CourseDetails>(this.apiUrl + '/' + newCourseDetails.id + '/details', newCourseDetails);
  }

  updateCourse(updatedCourse: Course): Observable<Course> {
    return this.http.put<Course>(this.apiUrl, updatedCourse);
  }

  updateCourseDetails(updatedCourseDetails: CourseDetails): Observable<CourseDetails> {
    return this.http.put<CourseDetails>(this.apiUrl + '/' + updatedCourseDetails.id + '/details', updatedCourseDetails);
  }

  deleteCourse(id: string): Observable<Object> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  deleteCourseDetails(id: string) {
    return this.http.delete(this.apiUrl + '/' + id + '/details');
  }

  getTeachers(): Observable<Array<UserSimpleData>> {
    return this.http.get<Array<UserSimpleData>>(environment.baseUrl + '/api/user/teachers')
      .pipe(
        map(teachers => teachers.map(teacher => {return {...teacher}}))
      );
  }

  getCoursesLedByTeacher(teacherId: string): Observable<Array<CourseBasicInfo>> {
    return this.http.get<Array<CourseBasicInfo>>(this.apiUrl + /led-by/ + teacherId);
  }
}
