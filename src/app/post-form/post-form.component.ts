import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';

import { Post, PostsService } from '../services/posts.service';

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

	constructor(private http: HttpClient, private postsService:PostsService) { }

	ngOnInit(): void {
	}

	numRows(): number {
		return parseInt(this.rows);
	}

	onPost(form: NgForm) {
        const postData: Post = {
            username: this.username,
            message: form.form.value.message,
            file: this.fileData,
            timestamp: new Date()
        };
        form.reset();
		this.postsService.create(postData).subscribe((resData) => {
            console.log("message posted: ", resData);
            this.addLocalPost.emit(postData);
        }, (err) => {
            console.error(err);
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
