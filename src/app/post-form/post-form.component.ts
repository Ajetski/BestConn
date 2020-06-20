import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';

import { Post, PostsService } from '../posts.service';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.css'],
	inputs: ['rows']
})
export class PostFormComponent implements OnInit {

    rows: string;
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
            ...form.form.value,
            file: this.fileData,
            timestamp: new Date()
        };
		this.postsService.create(postData);
    }
    
    onUpload(event){
        const fileReader = new FileReader();

        fileReader.addEventListener("load", () => {
            this.fileData = fileReader.result as string;
            console.log(this.fileData);
        }, false);

        fileReader.readAsDataURL(event.target.files[0]);
    }

}
