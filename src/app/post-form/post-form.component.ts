import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
    @Input('rows') rows: number;
    @Output() emitPost: EventEmitter<Post> = new EventEmitter<Post>();

    file: File;

	constructor(private postService: PostService, private userService: UserService) {}

	ngOnInit(): void {
	}

	onPost(form: NgForm) {
        const post: Post = {
            userUid: this.userService.user.uid,
            username: this.userService.user.username,
            file: !!this.file,
            message: form.form.value.message as string,
            timestamp: new Date().getTime(),
            followers: this.userService.user.followers
        };

        form.reset();

        this.emitPost.emit(post);

        this.postService.create(post, this.file);
    }
    
    onUpload(event){
        this.file = event.target.files[0];
    }

}
