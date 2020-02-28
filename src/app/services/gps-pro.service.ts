import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GpsProService {

  endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = 'http://7e2c3d2c.ngrok.io';
  }

  sendLocation(data: any) {
    return this.http.post(this.endPoint, JSON.stringify(data));
  }
}
