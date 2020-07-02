import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../models/post';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	@Input('post') post: Post;

	imageLoaded = false;

	constructor() { }

	ngOnInit(): void {
		if(!!this.post.fileUrl)
			this.post.fileUrl.subscribe(() => this.imageLoaded = true);
	}

}
