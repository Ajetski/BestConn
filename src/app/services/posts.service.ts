import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

export interface Post {
    username: string,
    message:string,
    file?: string,
    timestamp: Date
}

@Injectable({
	providedIn: 'root'
})
export class PostsService {

	constructor(private apiService: ApiService) { }

	create(postData: Post) {
        return this.apiService.post('/posts', postData);
	}

	feed() {
		return this.apiService.get('/posts');
	}

}
