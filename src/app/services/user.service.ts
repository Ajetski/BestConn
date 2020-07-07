import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../models/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private _loggedIn = false;
	private _user: User = null;

	constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

	get loggedIn() {
		return this._loggedIn;
	}
	
	get user(): User {
		return this._user;
	}

	login(email: string, password: string) {
		console.log("sign in data: ", email, password);
		this.auth.signInWithEmailAndPassword(email, password).then(() => {
			this.auth.currentUser.then((authUser) => {
				this.firestore.collection('/users', ref => ref.where('uid', '==', authUser.uid)).get().forEach(userDocs => {
					userDocs.docs.forEach(userDoc => {
						const user = userDoc.data();
						this._user = {
							uid: user.uid,
							username: user.username,
							email: user.email,
							bio: user.bio,
							following: user.following,
							followers: user.followers
						} as User
					})
					console.log('Logged In as: ', this.user);
					this._loggedIn = true;
				})
			}).catch(err => this.error(err));
		}).catch((err) => {
			this.error(err);
		});
	}

	signUp(user: User, password: string) {
		this.auth.createUserWithEmailAndPassword(user.email, password).then(() => {
			this._loggedIn = true;
			this.auth.currentUser.then(newUser => {
				user.uid = newUser.uid;
				this.firestore.collection('users').add(user).then(() => {
					console.log("Signed up and logged in.");
					this._user = user;
				}).catch(err => this.error(err));
			})
		}).catch((err) => this.error(err));
	}

	private error(err) {
		console.error("Error Signing up or logging in: ", err);
		this._loggedIn = false;
	}
}
