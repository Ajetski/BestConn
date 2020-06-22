import { Component, OnInit } from '@angular/core';

import { PostsService, Post } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    posts: Post[] = [];
    feedErrorMessage: string;
    
    
	constructor(private postsService: PostsService, public userService: UserService) {}

	ngOnInit(): void {
		this.refreshFeed();
	}

	refreshFeed(){
        console.log("refreshing feed...");
		this.posts = [];
		this.postsService.feed().subscribe(posts => {
			for(let postId in posts){
				this.posts.push(posts[postId]);
			}
		}, (errData) => {
            console.log("err", errData);
            this.feedErrorMessage = "Error fetching feed: " + errData.message;
        });
	}

	addLocalPost(post: Post) {
		this.posts.unshift(post);
	}

}
