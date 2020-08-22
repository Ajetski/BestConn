import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoggingService {

	constructor(private http: HttpClient) { }

	log(message: string) {
        console.log("Logging message: ", message);
		this.http.post(environment.loggingURL, { content: message }).subscribe(() => {
            console.log("Message logged.");
        }, (err) => {
            console.log("Error logging message: ", err);
        });
	}
}
