import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	public test: string;

	constructor() { }

	ngOnInit(): void {
	}
}
