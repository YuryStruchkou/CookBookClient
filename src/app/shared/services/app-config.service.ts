import { Injectable } from '@angular/core';
import { IAppConfig } from './../models/app-config.model'
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    static settings: IAppConfig;
    private http: HttpClient

    constructor(handler: HttpBackend) {
        this.http = new HttpClient(handler);
    }

    load() {
        const jsonFile = `./../../assets/config/app.config.json?timestamp=${Date.now()}`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfigService.settings = <IAppConfig>response;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
