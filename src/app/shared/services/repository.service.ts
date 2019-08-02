import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { AuthService } from './auth.service';
import { HttpRequestOptions, HttpRequestOptionsDefaults } from '../utils/http-request-options';

@Injectable({
    providedIn: 'root'
})
export class RepositoryService {

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private authService: AuthService) { }

    public get(route: string, options: HttpRequestOptions = new HttpRequestOptionsDefaults()) {
        return this.http.get(this.createFullRoute(route), this.generateOptions(options.withCredentials, options.params));
    }

    public post(route: string, body: any = undefined, options: HttpRequestOptions = new HttpRequestOptionsDefaults()) {
        return this.http.post(this.createFullRoute(route), body, this.generateOptions(options.withCredentials, options.params));
    }

    public put(route: string, body: any = undefined, options: HttpRequestOptions = new HttpRequestOptionsDefaults()) {
        return this.http.put(this.createFullRoute(route), body, this.generateOptions(options.withCredentials, options.params));
    }

    public delete(route: string, options: HttpRequestOptions = new HttpRequestOptionsDefaults()) {
        return this.http.delete(this.createFullRoute(route), this.generateOptions(options.withCredentials, options.params));
    }

    public patch(route: string, body, options: HttpRequestOptions = new HttpRequestOptionsDefaults()) {
        return this.http.patch(this.createFullRoute(route), body, this.generateOptions(options.withCredentials, options.params));
    }

    private createFullRoute(route: string): string {
        return `${this.envUrl.apiUrl}/${route}`;
    }

    private generateOptions(withCredentials: boolean, params: object) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        if (this.authService.currentUserValue != null){
            let jwtToken = this.authService.currentUserValue.jwtToken;
            headers = headers.append('Authorization', `Bearer ${jwtToken}`);
        }
        return { headers, withCredentials, params: new HttpParams({fromObject: <any>params}) };
    }
}
