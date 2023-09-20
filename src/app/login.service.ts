import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://assignment.leadtracker.cied.dev/v1';

  constructor(private http: HttpClient) { }

  // for login service
  login(username: string, password: string): Observable<any> {
    const device_id = 'fgdg';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('device_id', device_id);

    return this.http.post(this.baseUrl + '/accounts/login/', body.toString(), { headers });
  }

  // Function to save token and id in session storage
  saveTokenAndId(token: string, id: string) {
    sessionStorage.setItem('bearerToken', token);
    sessionStorage.setItem('userId', id);
    console.log(sessionStorage.getItem(''));
  }

  // fetching user details
  getUserData(bearerToken: string, userId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('BEARER', bearerToken)
      .set('USER-ID', userId)
      .set('Authorization', `Bearer ${bearerToken}`);

    return this.http.get(`${this.baseUrl}/accounts/user/${userId}/`, { headers });
  }

  // fetching active status
  getLeadStatuses(bearerToken: string, userId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('BEARER', bearerToken)
      .set('USER-ID', userId)
      .set('Authorization', `Bearer ${bearerToken}`);

    return this.http.get(`${this.baseUrl}/leads/stage/`, { headers });
  }

  // fetching graph information
  getGraphData(bearerToken: string, userId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('BEARER', bearerToken)
      .set('USER-ID', userId)
      .set('Authorization', `Bearer ${bearerToken}`);

    return this.http.get(`${this.baseUrl}/leads/dashboard/graph/?stage_type=active`, { headers });
  }

  // fetch lead table details
  getLeadList(bearerToken: string, userId: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('BEARER', bearerToken)
      .set('USER-ID', userId)
      .set('Authorization', `Bearer ${bearerToken}`);

    return this.http.get(`${this.baseUrl}/leads/?stage_type=active&limit=10&offset=0&search=&ordering=-probability`, { headers });
  }
}
