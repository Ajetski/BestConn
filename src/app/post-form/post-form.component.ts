import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.css'],
	inputs: ['rows']
})
export class PostFormComponent implements OnInit {

	rows: string;

	constructor(private http: HttpClient) { }

	ngOnInit(): void {
	}

	numRows(): number {
		return parseInt(this.rows);
	}

	onPost(form: NgForm) {
		console.log(form.form.value);
		this.http.post<{message:string}>('https://ajet-test.firebaseio.com/posts.json', {
			message: form.form.value.message
		}).subscribe(resData => {
			console.log(resData);
		});
	}

}
