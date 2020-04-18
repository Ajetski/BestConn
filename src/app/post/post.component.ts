import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css'],
	inputs: ['username', 'name', 'textcontent']
})
export class PostComponent implements OnInit {
	private username:String;
	private name:String;
	private textcontent:String;

	constructor() { }

	ngOnInit(): void {
	}

}
