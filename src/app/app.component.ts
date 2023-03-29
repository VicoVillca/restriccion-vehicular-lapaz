import { Component } from '@angular/core';
import { Icon, Map, Marker, Polygon, tileLayer } from 'leaflet';
Icon.Default.imagePath = 'assets/';
import { RestriccionService } from './restriccion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  map!: Map;
  puntos: { lat: number; lng: number }[] = [];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 13,
    center: { lat: -16.505537926777112, lng: -68.13373365668494 },
  };
  constructor(private restriccion: RestriccionService) {}
  initMarkers() {
    for (let index = 0; index < this.puntos.length; index++) {
      const data = this.puntos[index];
      const marker = this.generateMarker(
        { lat: data.lat, lng: data.lng },
        index
      );
      marker.addTo(this.map).bindPopup(`<b>${data.lat},  ${data.lng}</b>`);
    }
    //this.initpolyline();
  }
  initpolyline() {
    for (let i = 0; i < 3; i++) {
      let a = new Polygon(this.restriccion.getRuta(i));
      a.addTo(this.map);
    }
  }
  generateMarker(data: any, index: number) {
    return new Marker(data);
  }
  onMapReady(map: Map) {
    this.map = map;
    this.map.addEventListener('click', (ev) => {
      var latlng = ev.latlng;
      this.puntos.push({ lat: latlng.lat, lng: latlng.lng });
      //this.initMarkers();
    });
    //this.initMarkers();
    this.initpolyline();
  }
}

/**
 https://vicovillca.github.io/restriccion-vehicular-lapaz/
 <div  >
  <img src="https://px.cdn.reduno.com.bo/reduno/032023/1679670871797.jpg" class="img-fluid" alt="sd">
</div>
 */
