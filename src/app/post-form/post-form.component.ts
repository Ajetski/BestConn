import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.css'],
	inputs: ['rows']
})
export class PostFormComponent implements OnInit {

	rows: string;

	constructor(private http: HttpClient, private postsService:PostsService) { }

	ngOnInit(): void {
	}

	numRows(): number {
		return parseInt(this.rows);
	}

	onPost(form: NgForm) {
		this.postsService.create(form.form.value)
	}

}
