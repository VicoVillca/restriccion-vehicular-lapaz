import { Component } from '@angular/core';
import {
  circle,
  Icon,
  LatLng,
  LeafletMouseEvent,
  Map,
  Marker,
  Polygon,
  polygon,
  tileLayer,
} from 'leaflet';
Icon.Default.imagePath = 'assets/';
import { RestriccionService } from './restriccion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  titulo: string = 'saludo';
  map!: Map;
  puntos: { lat: number; lng: number }[] = [
    { lat: -16.5207124, lng: -68.1240775 },
  ];
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 13,
    center: { lat
      :
      -16.505537926777112,
      lng
      :
      -68.13373365668494 },
  };
  constructor(private restriccion: RestriccionService) {
    console.log(this.puntos);
  }
  initMarkers() {
    console.log('puntos');
    console.log(this.puntos);
    for (let index = 0; index < this.puntos.length; index++) {
      const data = this.puntos[index];
      console.log(data);
      const marker = this.generateMarker(
        { lat: data.lat, lng: data.lng },
        index
      );
      marker.addTo(this.map).bindPopup(`<b>${data.lat},  ${data.lng}</b>`);
      //this.map.panTo(data);
      //this.markers.push(marker);
    }
    this.initpolyline();
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
      this.initMarkers();
      //this.initpolyline();
      console.log('Link has been "clicked"');
    });
    this.initMarkers();
  }

  mapClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }
  click(ev: any) {
    console.log(ev);
    console.log('titulo = ' + this.titulo);
    var latlng = ev.latlng;
    console.log(latlng.lat + ', ' + latlng.lng);

    //colocamos marker

    const newMarker = new Marker([46.879966, -121.726909]);
    //this.initialMarkers.push(latlng);
    //console.log(this.puntos);
    //agregar();
    //this.puntos.push({ lat: latlng.lat, lng: latlng.lng });
    //console.log(this.puntos);
    //agregar(newMarker);
  }
  agregar() {
    console.log('Agregamos peee');
  }
}
