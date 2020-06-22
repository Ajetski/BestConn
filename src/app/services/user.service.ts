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

    private _loggedIn;

    constructor(private apiService: ApiService) { 
        this._loggedIn = false;

        const expireTime = +localStorage.getItem('expireTime');

        if(expireTime) {
            if(expireTime > new Date().getMilliseconds()) {
                this._loggedIn = true;
                apiService.loadFromStorage();
            }
            else {
                this.refreshToken();
            }
        }
    }
    
    get loggedIn(){
        return this._loggedIn;
    }

	logIn(loginData: AuthData) {
		this.apiService.logIn(loginData).subscribe((resData) => {
            this._loggedIn = true;
            console.log("Logged in.");

            const expireTime = new Date().getMilliseconds() + (+resData.expiresIn * 1000);

			localStorage.setItem('jwt', resData.idToken);
			localStorage.setItem('expireTime', expireTime.toString());
			localStorage.setItem('refreshToken', resData.refreshToken);

			setTimeout(() => {
                this.refreshToken();
			}, +resData.expiresIn);
        },
        err => {
            console.error("Login Error: ", err);
        });
    }

	logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('expireTime');
        localStorage.removeItem('refreshToken');
    }
    
    refreshToken() {
        this.apiService.refreshToken(localStorage.getItem('refreshToken')).subscribe((resData) => {
            this._loggedIn = true;
            console.log("REFRESH, Logged in.");

            const expireTime = new Date().getMilliseconds() + (+resData.expiresIn * 1000);

			localStorage.setItem('jwt', resData.idToken);
			localStorage.setItem('expireTime', expireTime.toString());
			localStorage.setItem('refreshToken', resData.refreshToken);

			setTimeout(() => {
                this.refreshToken();
			}, +resData.expiresIn);
        },
        err => {
            console.error("Login Error: ", err);
        });;
    }
    
    signUp(signUpData: AuthData) {
        this.apiService.signUp(signUpData);
    }
}
