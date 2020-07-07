import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

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
			this.userService.login(form.form.value.email, form.form.value.password);
		}
		else {
			console.log("Login Form is Invalid!");
		}
		form.reset();
	}

	onSignUp(form: NgForm) {
		if(form.form.status === "VALID") {
			console.log(form.form.value)
			this.userService.signUp({
				email: form.form.value.email,
				username: form.form.value.username,
				bio: form.form.value.bio,
				followers: [],
				following: []

			} as User, form.form.value.password);
		}
		else {
			console.log("Login Form is Invalid!");
		}
		form.reset();
	}

}
