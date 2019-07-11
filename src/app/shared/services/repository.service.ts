import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service'; 

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public get(route: string) {
    return this.http.get(this.createFullRoute(route), this.generateHeaders());
  }

  public post(route: string, body) {
    return this.http.post(this.createFullRoute(route), body, this.generateHeaders());
  }

  public put(route: string, body) {
    return this.http.put(this.createFullRoute(route), body, this.generateHeaders());
  }

  public delete(route: string) {
    return this.http.delete(this.createFullRoute(route), this.generateHeaders());
  }

  public patch(route: string, body) {
    return this.http.patch(this.createFullRoute(route), body, this.generateHeaders());
  }

  private createFullRoute(route: string) : string {
    return `${this.envUrl.apiUrl}/${route}`;
  }

  private generateHeaders() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let jwtToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${jwtToken}`);
    return { headers }
  }
}
