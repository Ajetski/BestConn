import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	public test: string;

	constructor(private api: ApiService) { }

	ngOnInit(): void {
		this.api.request('https://jsonplaceholder.typicode.com/posts2', 'get', {}).then( (res) => {
			if(res.data.error){
				this.test = res.data.error;
			}
			else {
				this.test = res.data.title;
			}
		});
	}

}
