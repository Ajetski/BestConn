import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from './services/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private logger: LoggingService) { }

	handleError(error: Error) {
        // pick either the JSON or error.message
        const errMessage = JSON.stringify(error) === "{}" ? error.message : JSON.stringify(error);
        
        // log error to discord
        this.logger.log("Error: ```" + errMessage  + "```");

        // prevent error from being burried
		throw error;
	}

}