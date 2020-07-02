import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { PostFormComponent } from './post-form/post-form.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';



@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		SearchComponent,
		PostFormComponent,
		HomeComponent,
		ExploreComponent,
		ProfileComponent,
		PostComponent,
		LoginComponent
	],
	imports: [
		BrowserModule, NgbModule, HttpClientModule, FormsModule, RouterModule.forRoot([
			{ path: '', redirectTo: '/home', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent },
			{ path: 'explore', component: ExploreComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'login', component: LoginComponent }
		],
			{ enableTracing: true }),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireStorageModule,
		AngularFireAuthModule,
		BrowserAnimationsModule,
		MatProgressSpinnerModule
	],
	providers: [{ provide: BUCKET, useValue: 'bestconn-wcsu.appspot.com' }],
	bootstrap: [AppComponent]
})
export class AppModule { }