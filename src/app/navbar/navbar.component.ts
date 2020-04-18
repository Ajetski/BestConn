import { Component, OnInit } from "@angular/core";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})

export class NavbarComponent implements OnInit {
	public active: string;
	public test:string;

	constructor(location: Location, router: Router, config: NgbModalConfig, private modalService: NgbModal) {
		router.events.subscribe(val => {
			if (location.path().includes('explore')) {
			  this.active = 'explore';
			} else if (location.path().includes('profile')) {
				this.active = 'profile';
			} else {
			  this.active = "home";
			}
		  });
	}

	ngOnInit(): void {}

	open(content) {
		this.modalService.open(content, {
		windowClass: 'post-modal',
		size: 'md'
		});
	}
}
