import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GpsProService {

  endPoint: string;

  constructor(private http: HttpClient) {
    this.endPoint = 'https://backgpspro.herokuapp.com/';
  }

  sendLocation(data: any) {
    return this.http.post(this.endPoint, JSON.stringify(data));
  }
}
