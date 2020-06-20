import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Post {
    username: string,
    message:string,
    file?: File
}

@Injectable({
	providedIn: 'root'
})
export class PostsService {

	constructor(private http: HttpClient) { }

	create(postData: Post) {
		this.http.post<Post>(environment.apiBase + '/posts.json', {
			...postData
		}).subscribe(resData => {
			console.log(resData);
		});
	}

	feed() {
		return this.http.get<Post[]>(environment.apiBase + '/posts.json');
	}

}
