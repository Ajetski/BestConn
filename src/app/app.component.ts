import { Component } from '@angular/core';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'BestConn';

	constructor(public auth: AngularFireAuth) {
		auth.signInWithEmailAndPassword('test@email.com', '12345678').then(() => {
			console.log("Logged in.");
		}).catch((err) => {
			console.error("Error logging in: ", err);
		});
	}
}
