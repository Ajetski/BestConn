import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})

export class NavbarComponent implements OnInit {
	active: string;

	constructor(router: Router, private modalService: NgbModal) {
		const base = router.url.split('/');
		if(!base || base.length < 2) {
			this.active = "home";
		} else {
			this.active = base[1];
		}
	}

	ngOnInit(): void { }

	open(content) {
		this.modalService.open(content, {
			windowClass: 'post-modal',
			size: 'md'
		});
	}

	onNavChange(changeEvent: NgbNavChangeEvent) {
		if (changeEvent.nextId === "post") {
			changeEvent.preventDefault();
		}
	}
}
