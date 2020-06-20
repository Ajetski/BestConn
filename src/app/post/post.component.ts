import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../services/posts.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	@Input('post') post: Post;

	constructor() { }

	ngOnInit(): void {
	}

}
