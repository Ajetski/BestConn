import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post';

@Injectable({
	providedIn: 'root'
})
export class PostsService {

	constructor(private http: HttpClient) { }

	create(postData: Post) {
		this.http.post<Post>('https://ajet-test.firebaseio.com/posts.json', {
			...postData
		}).subscribe(resData => {
			console.log(resData);
		});
	}

	feed() {
		return this.http.get('https://ajet-test.firebaseio.com/posts.json');
	}

}
