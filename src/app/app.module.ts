import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';

import { ReptileListComponent } from './reptile-list/reptile-list.component';
import { ReptileFormComponent } from './reptile-list/reptile-form/reptile-form.component';
import { ReptileShowComponent } from './reptile-list/reptile-show/reptile-show.component';

import { TrackListComponent } from './reptile-list/track-list/track-list.component';
import { TrackFormComponent } from './reptile-list/track-form/track-form.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './services/auth.service';
import { ReptilesService } from './services/reptiles.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'reptiles', component: ReptileListComponent },
  { path: 'reptiles/new', component: ReptileFormComponent },
  { path: 'reptiles/view/:id', component: ReptileShowComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ReptileListComponent,
    ReptileFormComponent,
    ReptileShowComponent,
    TrackListComponent,
    TrackFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    ReptilesService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
