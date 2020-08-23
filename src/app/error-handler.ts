import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './services/logging.service';
import { UserService } from './services/user.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private logger: LoggingService, private userService: UserService) { }

	handleError(error: Error) {
        // pick either the JSON or error.message
        const errMessage = JSON.stringify(error) === "{}" ? error.message : JSON.stringify(error);
        
        // log error to discord
        this.logger.log("Error: ```" + errMessage  + "```User: ```" + localStorage.getItem('user') + "```");

        // sign out to avoid repeat issues. this resets login state for the user
        this.userService.signOut().then(() => {
            throw error;
        })
	}

}