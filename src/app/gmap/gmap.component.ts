import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements GoogleMapsModule, OnInit {
  currentLat: number | undefined;
  currentLng!: number | undefined;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 5,
    streetViewControl: false,
    mapTypeControl: false
  };

  
  click(event: google.maps.MapMouseEvent) {
    console.log(event.latLng?.lat());
    this.currentLat = event.latLng?.lat();
    console.log(event.latLng?.lng());
    this.currentLng = event.latLng?.lng();
  }
  
  ngOnInit(): void {
    this.currentPos();
  }

  currentPos(): void{
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.currentLat = this.center.lat;
    this.currentLng = this.center.lng;
  }
 
  zoomIn() {
    if (this.zoom < 15) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > 5) this.zoom--;
  }
}
