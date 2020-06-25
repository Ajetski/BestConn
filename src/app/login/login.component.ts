import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService, AuthData } from '../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	login = true;

	constructor(private userService: UserService) { }

	ngOnInit(): void {
	}

	onLogin(form: NgForm) {
		if(form.form.status === "VALID") {
			const loginData: AuthData = {
				...form.form.value,
				returnSecureToken: true
			};
			this.userService.logIn(loginData);

		}
		else {
			console.log("Login Form is Invalid!");
		}
		form.reset();
	}

}
