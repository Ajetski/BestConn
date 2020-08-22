import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Post } from '../models/post';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostService {

	private postsCollection: AngularFirestoreCollection<Post>;
	private _localPostToHomeFeed = new Subject<Post>();

	constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
		this.postsCollection = this.firestore.collection<Post>('posts', ref => ref.orderBy('timestamp', 'desc'));
	}

	get localPostToHomeFeed() { return this._localPostToHomeFeed; }

	homeFeed() {
		const posts: Post[] = [];
		return this.postsCollection.get();
	}

	async create(post: Post, file?: File) {
        try {
            const docRef = await this.postsCollection.add(post);
            if(!!file) {
                try {
                    await this.storage.upload('posts/' + docRef.id, file);
                    post.fileUrl = this.storage.ref('posts/' + docRef.id ).getDownloadURL();
                    this._localPostToHomeFeed.next(post);
                }
                catch (err) {
                    console.error('Uploading error: ', err);
                }
            }
            else {
                this._localPostToHomeFeed.next(post);
            }
        }
        catch (err) {
            console.error("Error posting message: ", err);
        }
	}
}
