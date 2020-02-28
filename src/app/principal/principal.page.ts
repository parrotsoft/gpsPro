import { Component, NgZone, OnInit } from '@angular/core';
import { Geolocation, Plugins } from '@capacitor/core';
import { GpsProService } from '../services/gps-pro.service';

const { App, BackgroundTask } = Plugins;

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
    App.addListener('appStateChange', (state) => {

      if (!state.isActive) {
        let taskId = BackgroundTask.beforeExit(async () => {
          setInterval(() => {
            console.log('soy yo...')
            Geolocation.getCurrentPosition().then((position) => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              this.sendPosition(this.latitude, this.longitude);
            });
          }, 5000);
          BackgroundTask.finish({
            taskId
          });
        });
      }
    });
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
