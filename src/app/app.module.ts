import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';

import { ReptileListComponent } from './reptile-list/reptile-list.component';
import { ShowReptileComponent } from './reptile-list/show-reptile/show-reptile.component';
import { ReptileFormComponent } from './reptile-list/reptile-form/reptile-form.component';
import { HeaderComponent } from './header/header.component';

import { ReptilesService } from './services/reptiles.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'reptiles', canActivate: [AuthGuardService], component: ReptileListComponent },
  { path: 'reptiles/new', canActivate: [AuthGuardService], component: ReptileFormComponent },
  { path: 'reptiles/view/:id', canActivate: [AuthGuardService], component: ShowReptileComponent },
  { path: '', redirectTo: 'reptiles', pathMatch: 'full' },
  { path: '**', redirectTo: 'reptiles' }
]

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ReptileListComponent,
    ShowReptileComponent,
    ReptileFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
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
