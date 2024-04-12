import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User, UserSimpleData} from "../../shared/models/user.model";
import {StorageService} from "./storage.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../authorization/auth.service";
import {Course} from "../../modules/courses/course";
import {CulturalEvent} from "../../modules/cultural-events/cultural-events/cultural-event";
import {mockCulturalEvents} from "../../modules/cultural-events/cultural-events/mock-cultural-events";
import {mockCourses} from "../../modules/courses/courses-list/mock-courses";
import {mockChildren} from "../../modules/mocks/mock-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.baseUrl + '/api/user';
  // inital _value: undefined (it means we are not fetching the user yet)
  user$ = new BehaviorSubject<User | null | undefined>(undefined);
  constructor(private http: HttpClient) {
    // this.user$.next(null); // to test a situation when user or password are incorrect (user = null)

    // this.user$.next({ // to test a situation when there is a user
    //   firstName: "firstName",
    //   id: 0,
    //   lastName: "lastName",
    //   password: "pswd",
    //   phone: "123",
    //   token: "fake-token",
    //   username: "a@o2.pl",
    //   role: Role.Client
    // })
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl +'/profile', {withCredentials: true});
  }

  updateUserProfile(client: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, client);
  }

  getChildren(): Observable<Array<User>> {
    //return of(mockChildren);
    return this.http.get<Array<User>>(this.apiUrl + '/children', {withCredentials: true});
  }

  getUserSimpleData(): Observable<UserSimpleData> {
    return this.http.get<UserSimpleData>(this.apiUrl + '/user-simple', {withCredentials: true});
  }

  getChildrenSimpleData(): Observable<Array<UserSimpleData>> {
    return this.http.get<Array<UserSimpleData>>(this.apiUrl + '/children-simple', {withCredentials: true});
  }

  addChild(child: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/child', child);
  }

  updateChild(child: User): Observable<User> {
    return this.http.put<User>(this.apiUrl + '/child', child);
  }

  deleteChild(childId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/child/' + childId);
  }

  getUserCourses(): Observable<Array<Course>> {
    //return of(mockCourses);
    return this.http.get<Array<Course>>(this.apiUrl + '/courses', {withCredentials: true});
  }

  getCoursesByUserId(id: string): Observable<Array<Course>> {
    return this.http.get<Array<Course>>(this.apiUrl + '/courses/' + id, {withCredentials: true});
  }

  getUserEvents(): Observable<Array<CulturalEvent>> {
    return of(mockCulturalEvents);
  }

  joinCourse(courseId: string, userId: string) { // user or child id
    return this.http.get(this.apiUrl + '/join-course/' + courseId + '/' + userId, {withCredentials: true});
  }

  removeCourse(courseId: string, userId: string) {
    return this.http.delete(this.apiUrl + '/withdraw-from-course/' + courseId + '/' + userId);
  }

  removeAccount(): Observable<HttpResponse<void>> {
    return this.http.delete<HttpResponse<void>>(this.apiUrl);
  }

}
