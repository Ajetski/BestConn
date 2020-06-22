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
    private refreshToken: string;
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
		if(!this.jwt){
			return throwObservableError({
				message: "Not authenticated. Please sign in."
			});
        }
		return this.http.get<any>(this.apiBase + url + this.urlSuffix, {
			params: new HttpParams().set("auth", this.jwt)
		});
	}

	post(url: string, body) {
		if(!this.jwt){
			return throwObservableError({
				message: "Not authenticated. Please sign in."
			});
		}
		return this.http.post<any>(this.apiBase + url + this.urlSuffix, body, {
			params: new HttpParams().set("auth", this.jwt)
		});
	}

	logIn(loginData) {
		return this.http.post<LoginResponse>(environment.signInURL, loginData).pipe(tap((resData) => {
            console.log("login Res data: ", resData);
			this.jwt = resData.idToken;
			this.refreshToken = resData.refreshToken;
		}))
	}

	signUp(signUpData) {
		this.http.post<LoginResponse>(environment.signInURL, signUpData).subscribe((resData) => {
			this.jwt = resData.idToken;
			this.refreshToken = resData.refreshToken;
		}, (err) => {
			const resErr = err.error;
			console.error(resErr.message);
		});
	}

}
