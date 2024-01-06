import { ErrorHandler, Injectable, Inject, InjectionToken, Injector } from '@angular/core';

export const MY_ERROR_HANDLER_TOKEN = new InjectionToken<ErrorHandler>('MyErrorHandlerToken');

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    private handler!: ErrorHandler;

    constructor(@Inject(MY_ERROR_HANDLER_TOKEN) private errorHandlerToken: ErrorHandler) {}

    handleError(error: any): void {
        try {
            // Your custom error handling logic goes here
            console.error('Custom error handling:', error);

            // Delegate to the injected ErrorHandler
            this.handler = this.errorHandlerToken;
            if (this.handler && typeof this.handler.handleError === 'function') {
                this.handler.handleError(error);
            } else {
                console.error('ErrorHandler not available or does not have a handleError method.');
            }
        } catch (innerError) {
            // Handle errors that might occur within the error handler
            console.error('Error within custom error handler:', innerError);
        }
    }
}
export function customErrorHandlerFactory(handler: ErrorHandler): CustomErrorHandler {
    return new CustomErrorHandler(handler);
}
