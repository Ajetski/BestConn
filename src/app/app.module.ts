import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { PostFormComponent } from './post-form/post-form.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './user-form/login.component';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    PostFormComponent,
    HomeComponent,
    ExploreComponent,
    ProfileComponent,
    LoginComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule, NgbModule, RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'explore', component: ExploreComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'login', component: LoginComponent }
    ],
    { enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }