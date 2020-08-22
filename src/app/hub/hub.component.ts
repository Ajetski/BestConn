import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-hub',
	templateUrl: './hub.component.html',
	styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {

	constructor(private userService: UserService) { }

	ngOnInit(): void {
	}

	signOut() {
		this.userService.signOut();
	}

}
