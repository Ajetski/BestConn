import { Component, OnInit } from '@angular/core';
import { HomeFeedService } from '../home-feed.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	posts: Object[];
	
	constructor(feed: HomeFeedService) {
		this.posts = feed.getPosts();
	}

	ngOnInit(): void {
	}

}
