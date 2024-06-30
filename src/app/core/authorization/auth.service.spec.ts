import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {Credentials, Role, User, UserSimpleData} from "../../shared/models/user.model";

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let apiUrl: string = environment.baseUrl + '/api/auth';

  const mockCredentials: Credentials = { username: 'test@example.com', password: 'password' };
  const mockUserData: UserSimpleData = { id: "1", firstName: 'Anna', lastName: 'Kowalska' };
  const mockUser: User = { id: "1", username: 'test@example.com', role: Role.Client };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('logIn', () => {
    it('should send login request and return user simple data', () => {
      service.logIn(mockCredentials).subscribe(data => {
        expect(data).toEqual(mockUserData);
      });

      const mockReq: TestRequest = httpMock.expectOne(`${apiUrl}/login`);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toBe('POST');
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body).toEqual(mockCredentials);
      mockReq.flush(mockUserData);
    });
  });

  describe('signUp', () => {
    it('should send signup request', () => {
      const pswd: string = 'password';

      service.signUp(mockUser, pswd).subscribe(response => {});

      const mockReq: TestRequest = httpMock.expectOne(`${apiUrl}/signup`);
      expect(mockReq.request.method).toBe('POST');
      expect(mockReq.request.body).toEqual({ ...mockUser, password: pswd });
    });
  });

  describe('logOut', () => {
    it('should send logout request', () => {
      service.logOut().subscribe(response => {});

      const mockReq: TestRequest = httpMock.expectOne(`${apiUrl}/logout`);
      expect(mockReq.request.method).toBe('POST');
      expect(mockReq.request.body).toEqual({});
    });
  });

  describe('setAuthenticated', () => {
    it('should set isAuthenticated$ to true', () => {
      service.setAuthenticated();
      service.isAuthenticated$.subscribe(value => {
        expect(value).toBe(true);
      });
    });
  });

  describe('setNotAuthenticated', () => {
    it('should set isAuthenticated$ to false', () => {
      service.setNotAuthenticated();
      service.isAuthenticated$.subscribe(value => {
        expect(value).toBe(false);
      });
    });
  });

  describe('setRole and getRole', () => {
    it('should set role$ to the role returned by getRole()', () => {
      const mockRole = { role: Role.Employee };

      service.setRole();

      const mockReq: TestRequest = httpMock.expectOne(`${apiUrl}/role`);
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(mockRole);

      service.role$.subscribe(role => {
        expect(role).toBe(mockRole.role);
      });
    });
  });

  describe('setRoleToNull', () => {
    it('should set role$ to null', () => {
      service.setRoleToNull();
      service.role$.subscribe(value => {
        expect(value).toBeNull();
      });
    });
  });

  describe('initAuthStatus', () => {
    it('should set isAuthenticated$ based on the response and set role$ if response is {result: true}', () => {
      const mockResponse = {result: true};

      service.initAuthStatus();

      const mockReq: TestRequest = httpMock.expectOne(`${apiUrl}/status`);
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(mockResponse);

      service.isAuthenticated$.subscribe(isAuthenticated => {
        expect(isAuthenticated).toBe(mockResponse.result);
      });

      httpMock.expectOne(`${apiUrl}/role`).flush({role: Role.Client});

      service.role$.subscribe(role => {
        expect(role).toBe(Role.Client);
      });
    });

    it('should set isAuthenticated$ based on the response and leave role$ as null if response is {result: false}', () => {
      const mockResponse = {result: false};

      service.initAuthStatus();

      const mockReq: TestRequest = httpMock.expectOne(`${apiUrl}/status`);
      expect(mockReq.request.method).toBe('GET');
      mockReq.flush(mockResponse);

      service.isAuthenticated$.subscribe(isAuthenticated => {
        expect(isAuthenticated).toBe(mockResponse.result);
      });

      service.role$.subscribe(role => {
        expect(role).toBeNull();
      });
    });
  });
});
