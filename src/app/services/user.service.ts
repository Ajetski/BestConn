import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

export interface AuthData {
	email: string,
	password: string,
	returnSecureToken: true;
}

@Injectable({
	providedIn: 'root'
})
export class UserService {

    private _loggedIn = false;

    constructor(private apiService: ApiService) { }
    
    get loggedIn(){
        return this._loggedIn;
    }

	logIn(loginData: AuthData) {
		this.apiService.logIn(loginData).subscribe(() => {
            this._loggedIn = true;
            console.log("Logged in.");
        },
        err => {
            console.error("Login Error: ", err);
        });
    }
    
    signUp(signUpData: AuthData) {
        this.apiService.signUp(signUpData);
    }
}
