import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        // Your error handling logic goes here
        console.error('Custom error handling:', error);
    }
}
