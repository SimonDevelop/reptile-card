import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';

import { ReptileListComponent } from './reptile-list/reptile-list.component';
import { ShowReptileComponent } from './reptile-list/show-reptile/show-reptile.component';
import { ReptileFormComponent } from './reptile-list/reptile-form/reptile-form.component';
import { ReptileEditComponent } from './reptile-list/reptile-edit/reptile-edit.component';
import { ReptileEndComponent } from './reptile-list/reptile-end/reptile-end.component';

import { ReptilesService } from './services/reptiles.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SuiviListComponent } from './suivi-list/suivi-list.component';
import { SuiviFormComponent } from './suivi-list/suivi-form/suivi-form.component';

const appRoutes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'reptiles', canActivate: [AuthGuardService], component: ReptileListComponent },
  { path: 'reptiles/new', canActivate: [AuthGuardService], component: ReptileFormComponent },
  { path: 'reptiles/edit/:id', canActivate: [AuthGuardService], component: ReptileEditComponent },
  { path: 'reptiles/end/:id', canActivate: [AuthGuardService], component: ReptileEndComponent },
  { path: 'reptiles/view/:id', canActivate: [AuthGuardService], component: ShowReptileComponent },
  { path: 'reptiles/:id/suivis/new', canActivate: [AuthGuardService], component: SuiviFormComponent },
  { path: 'reptiles/:id/suivis/:year', canActivate: [AuthGuardService], component: SuiviListComponent },
  { path: '', redirectTo: 'reptiles', pathMatch: 'full' },
  { path: '**', redirectTo: 'reptiles' }
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    ReptileListComponent,
    ShowReptileComponent,
    ReptileFormComponent,
    ReptileEditComponent,
    ReptileEndComponent,
    SuiviListComponent,
    SuiviFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [
    AuthService,
    ReptilesService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
