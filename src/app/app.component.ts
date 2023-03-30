import { Component, OnInit } from '@angular/core';
import { Icon, Map, Marker, Polygon, tileLayer } from 'leaflet';
Icon.Default.imagePath = 'assets/';
import { RestriccionService } from './restriccion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dia: string = 'Lunes';
  r1: number = 0;
  r2: number = 0;
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
  ngOnInit(): void {
    var d = new Date(); // Por ejemplo 1
    var n = this.getDia(d.getDay());
    //var n = this.getDia(6);
    this.dia = n;
  }
  getDia(index: any) {
    var dia = new Array(7);
    dia[0] = 'Domingo';
    dia[1] = 'Lunes'; //1 2
    dia[2] = 'Martes'; //3 4
    dia[3] = 'Miércoles'; // 5 6
    dia[4] = 'Jueves'; //7 8
    dia[5] = 'Viernes'; //9 0
    dia[6] = 'Sábado';

    if (index > 0 && index < 6) {
      //colocamos los dias
      this.r1 = (index * 2 - 1) % 10;
      this.r2 = (index * 2) % 10;
    }
    return dia[index];
  }

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
