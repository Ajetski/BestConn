import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore'

import { Post } from '../datatypes/post';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    posts;
    feedErrorMessage: string;
    
    
	constructor(firestore: AngularFirestore) {
		this.posts = firestore.collection('posts').valueChanges();
	}

	ngOnInit(): void {
	}

	refreshFeed(){
        console.log("refreshing feed...");
		this.posts = [];
	}

	addLocalPost(post: Post) {
		this.posts.unshift(post);
	}

}
