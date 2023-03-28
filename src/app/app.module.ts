import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { RestriccionService } from './restriccion.service';
import { AppBarComponent } from './app-bar/app-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LeafletModule,
    NgbModule
  ],
  providers: [RestriccionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
