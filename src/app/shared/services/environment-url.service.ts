import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {

  public apiUrl: string = environment.apiUrl;

  public cloudinaryCloud: string = environment.cloudinary_cloud;

  public cloudinaryPreset: string = environment.cloudinary_preset;

  constructor() { }
}
