import { Injectable } from '@angular/core';
const crypto = require('crypto');


@Injectable({
	providedIn: 'root'
})
export class EncryptionService {
	private key:String;

	constructor() {
		this.key = "temp_key. need to implement config"
	}

	encrtypt(data:String):String {
		const key = this.key;
		const cipher = crypto.createCipher('aes192', key);
		let crypted = cipher.update(data, 'utf8', 'hex');
		crypted += cipher.final('hex');
		return crypted;
	}

	decrypt(encrypted:String):String {
		const key = this.key;
		const decipher = crypto.createDecipher('aes192', key);
		var decrypted = decipher.update(encrypted, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	}
}
