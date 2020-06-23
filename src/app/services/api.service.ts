import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError as throwObservableError } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
	kind: string,
	localId: string,
	email: string,
	displayName: string,
	idToken: string,
	registered: boolean,
	refreshToken: string,
	expiresIn: string
}

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private jwt: string;
    private urlSuffix: string;
    private apiBase = "";

	constructor(private http: HttpClient) {
        if(environment.useFirestore){
            this.urlSuffix = "";
            this.apiBase = environment.firestoreApiBase;
        }
        else {
            this.urlSuffix = ".json";
            this.apiBase = environment.defaultApiBase;
        }
    }

	get(url: string) {
		return this.http.get<any>(this.apiBase + url + this.urlSuffix, {
			params: new HttpParams().set("auth", this.jwt)
		});
	}

	post(url: string, body) {
		return this.http.post<any>(this.apiBase + url + this.urlSuffix, body, {
			params: new HttpParams().set("auth", this.jwt)
		});
	}

	logIn(loginData) {
		return this.http.post<LoginResponse>(environment.signInURL, loginData).pipe(tap((resData) => {
			this.jwt = resData.idToken;
		}, (err) => {
			const resErr = err.error;
			console.error(resErr.message);
		}))
	}

	signUp(signUpData) {
		this.http.post<LoginResponse>(environment.signInURL, signUpData).pipe(
			tap((resData) => {
				this.jwt = resData.idToken;
			}, (err) => {
				console.error(err);
			})
		);
	}

	refreshToken(token: string) {
		return this.http.post<any>(environment.refreshURL, {
			grant_type: "refresh_token",
			refresh_token: token
		}).pipe(
			tap((resData) => {
				this.jwt = resData.idToken;
			}, (err) => {
				console.error(err);
			})
		);
	}

	loadFromStorage() {
		this.jwt = localStorage.getItem('jwt');
	}

}
