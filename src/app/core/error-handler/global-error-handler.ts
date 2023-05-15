import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../services/notification.service';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../services/auth.service';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);
        const notifier = this.injector.get(NotificationService);
        const authService = this.injector.get(AuthService);

        let message;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            if(error.status === 401 ) {
                notifier.showError('Your session is over!');
                return authService.logout()
            }
            message = errorService.getServerMessage(error);
            notifier.showError(message);
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            notifier.showError(message);
        }

        // Always log errors
        console.log(message);

    }
}