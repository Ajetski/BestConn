import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

import { Post } from '../post';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	posts: Post[] = [];
	
	constructor(private postsService: PostsService) {}

	ngOnInit(): void {
		this.getFeed();
	}

	getFeed(){
		this.postsService.feed().subscribe(posts => {
			for(let postId in posts){
				this.posts.push(posts[postId]);
			}
		});
	}

}
