import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
        return error.message;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return error.message;
    }

}