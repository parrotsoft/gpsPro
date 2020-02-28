import { Component, NgZone, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/core';
import { GpsProService } from '../services/gps-pro.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  latitude: number;
  longitude: number;
  wait: any;

  constructor(public ngZone: NgZone, private gpsProService: GpsProService) {

  }

  ngOnInit() {
  }

  onStart() {
    try {
      this.wait = Geolocation.watchPosition({}, (position, err) => {
        this.ngZone.run(() => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.sendPosition(this.latitude, this.longitude);
        });
      });
    } catch(error) {
      console.log('Error GEO ', error);
    }
  }

  async onStop() {
    Geolocation.clearWatch({ id: this.wait });
  }

  sendPosition(latitude: number, longitude: number) {
    const data = {
      latitude,
      longitude
    };
    try {
      this.gpsProService.sendLocation(data).toPromise().then((resp: any) => {
        console.log(resp);
      });
    } catch(error) {
      console.log('Exection ', error);
    }
  }

}
