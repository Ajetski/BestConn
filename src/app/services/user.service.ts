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
    private _isInitializing = true;

    constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
        this.init();
    }

    get loggedIn() {
		return this._loggedIn;
	}
	
	get user(): User {
		return this._user;
    }
    
    get isInitializing() {
        return this._isInitializing;
    }
    
    // constructor cannot be async, so use separate method
    async init() {
        try {
            await this.auth.setPersistence('local');
            this._user = JSON.parse(localStorage.getItem('user'));
            const test = await this.firestore.collection('/test').doc('testDoc').get().toPromise();
            console.log(test);
            this._loggedIn = true;
            console.log("logged in as: ", this._user);
        }
        catch(err) {
            this.signOut();
        }
        this._isInitializing = false;
    }

	async login(email: string, password: string) {
        try {            
            const userCreds = await this.auth.signInWithEmailAndPassword(email, password);
                
            this.firestore.collection('/users', ref => ref.where('uid', '==', userCreds.user.uid)).get().forEach(userDocs => {
                console.log(userDocs);
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
                });
                localStorage.setItem('user', JSON.stringify(this._user));
                console.log('Logged In as: ', this.user);
                this._loggedIn = true;
            });
        }
        catch (err) {
            this.error(err);
	    }
	}

	async signUp(user: User, password: string) {
        try {
		    await this.auth.createUserWithEmailAndPassword(user.email, password);
			this._loggedIn = true;
			const newUser = await this.auth.currentUser;
            user.uid = newUser.uid;
            await this.firestore.collection('users').add(user);
            this._user = user;
            localStorage.setItem('user', JSON.stringify(this._user));
            console.log("Signed up and logged in as: ", this._user);
        }
        catch (err) {
            this.error(err);
        }
    }

    async signOut() {
        localStorage.removeItem('user');
        try {
            this.auth.signOut();
        }
        catch (err) {
            console.log("Error signing out: ", err);
        }
        this._loggedIn = false;
    }


	private error(err) {
        console.error("Error Signing up or logging in: ", err);
        this.signOut();
	}
}
