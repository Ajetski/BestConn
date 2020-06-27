import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	login = true;

	constructor() { }

	ngOnInit(): void {
	}

	onLogin(form: NgForm) {
		if(form.form.status === "VALID") {
			const loginData = {
				...form.form.value,
				returnSecureToken: true
			};
			// post data to db
		}
		else {
			console.log("Login Form is Invalid!");
		}
		form.reset();
	}

}
