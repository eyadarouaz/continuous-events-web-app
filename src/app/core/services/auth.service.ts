import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env } from "src/environment";
import { NotificationService } from "./notification.service";

const ENDPOINT_URL = env.apiBaseUrl + 'auth';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient,
     private router: Router, private notificationService: NotificationService) {}
    
    get userRole() {
        return localStorage.getItem('role');
    }

    get userToken() {
        return localStorage.getItem('token');
    }

    // validateToken() {
    //     const fetchedToken = localStorage.getItem('token');
    //     if (fetchedToken) {
    //         try {
    //             const decryptedToken = (fetchedToken);
    //             this.verifyToken(decryptedToken).toPromise().then((res: any) => {
    //             if (res.statusCode) {
    //                 localStorage.setItem('token', fetchedToken);
    //             }
    //             }).catch((err: HttpErrorResponse) => {
    //             if (err) {
    //                 localStorage.removeItem('token');
    //                 localStorage.removeItem('role');
    //                 this.router.navigateByUrl('/login').then();
    //             }
    //             });
    //         }
    //             // @ts-ignore
    //         catch (err: DOMException) {
    //             localStorage.removeItem('token');
    //             localStorage.removeItem('role');
    //             console.log('Authentication failed');
    //         }
    //     }
    // }

    currentUser(token: any) {
        return this.http.post(ENDPOINT_URL + '/verify-token', {token});
    }

    login(login: string, password: string) {
        this.http.post(ENDPOINT_URL + '/login', {login, password})
        .subscribe(
            {next: (res: any) => {
                const token = res.data.access_token;
                localStorage.setItem('token', token);
                localStorage.setItem('activeRoute', '1');
                this.currentUser(token)
                .subscribe({ 
                    next: (res: any) => localStorage.setItem('role', res.data.user.role)
                })
                this.notificationService.showSuccess('Logged in successfully')
                setTimeout(() => this.router.navigateByUrl('/home').then(), 1000) 
            },
            error: () => this.notificationService.showError('Invalid credentials')}
        ) 
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigateByUrl('/login').then();
    }

    forgotPassword(email: string) {
        this.http.post(ENDPOINT_URL + '/forgot', {email})
        .subscribe((res: any) => {
            this.notificationService.showSuccess('Email sent')
            localStorage.setItem('reset_token', res.data.token);
            localStorage.setItem('reset_code', res.data.verif_code);
            localStorage.setItem('email', email); 
        })
    }

    resetPassword(password: any, verifCode: any, token: any) {
        this.http.put(ENDPOINT_URL + '/reset-password', {password}, {params: {verifCode: verifCode, token: token}})
        .subscribe(() => {
            this.notificationService.showSuccess('Password changed successfully')
            localStorage.removeItem('reset_code');
            localStorage.removeItem('reset_token');
            this.router.navigateByUrl('/login').then()
        })
    }

    

}