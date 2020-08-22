import { Component, OnInit, OnDestroy } from '@angular/core';

import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    posts: Post[];
	updatesAvailable = false;
	private subs: Subscription[] = [];

	constructor(private postService: PostService, private storage: AngularFireStorage) {}

	ngOnInit(): void {
		this.refreshFeed();
		this.subs.push(this.postService.localPostToHomeFeed.subscribe(post => {
			this.posts.unshift(post);
		}));
	}

	ngOnDestroy(): void {
		this.subs.forEach(sub => sub.unsubscribe());
	}

	refreshFeed(): void {
        if(!!this.posts)
            this.posts = [];
		this.postService.homeFeed().forEach(data => {
			data.docs.forEach(doc => {
				let post = doc.data() as Post;
				if(post.file) {
					post.fileUrl = this.storage.ref('posts/' + doc.id).getDownloadURL();
                }
                if(!this.posts)
                    this.posts = [];
				this.posts.push(post);
            })
            if(!this.posts)
                this.posts = [];
		});
	}

}
