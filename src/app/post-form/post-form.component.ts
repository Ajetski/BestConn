import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.css'],
	inputs: ['rows']
})
export class PostFormComponent implements OnInit {

	rows: string;

	constructor() { }

	ngOnInit(): void {
	}

	numRows(): number {
		return parseInt(this.rows);
	}

}
