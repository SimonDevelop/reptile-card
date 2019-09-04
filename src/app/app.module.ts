import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ReptileListComponent } from './reptile-list/reptile-list.component';
import { TrackFormComponent } from './reptile-list/track-form/track-form.component';
import { TrackListComponent } from './reptile-list/track-list/track-list.component';
import { HeaderComponent } from './header/header.component';

import { ReptilesService } from './services/reptiles.service';

const appRoutes: Routes = [
  
]

@NgModule({
  declarations: [
    AppComponent,
    ReptileListComponent,
    TrackFormComponent,
    TrackListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ReptilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
