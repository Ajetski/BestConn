import { Component, OnInit } from '@angular/core';
import { PostsService, Post } from '../services/posts.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	posts: Post[] = [];
	
	constructor(private postsService: PostsService) {}

	ngOnInit(): void {
		this.refreshFeed();
	}

	refreshFeed(){
		this.posts = [];
		this.postsService.feed().subscribe(posts => {
			for(let postId in posts){
				this.posts.push(posts[postId]);
			}
		});
	}

}
