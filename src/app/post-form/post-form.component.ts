import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Post } from '../datatypes/post';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
    @Input('rows') rows: string;
    @Output() addLocalPost: EventEmitter<Post> = new EventEmitter<Post>();

    fileData: string;
    username = "username";
    postsCollection: AngularFirestoreCollection

	constructor(private firestore: AngularFirestore) {
        this.postsCollection = this.firestore.collection<Post>('posts');
    }

	ngOnInit(): void {
	}

	numRows(): number {
		return parseInt(this.rows);
	}

	onPost(form: NgForm) {
        const postData: Post = {
            username: this.username,
            message: form.form.value.message,
            timestamp: new Date().getTime()
        };
        form.reset();
        this.postsCollection.add(postData).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    }
    
    onUpload(event){
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
            this.fileData = fileReader.result as string;
            console.log("File has been read.");
        }, false);

        fileReader.readAsDataURL(event.target.files[0]);
    }

}
