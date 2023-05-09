import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment as env} from "src/environment";
import { Router } from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import { BehaviorSubject, Observable } from "rxjs";

const ENDPOINT_URL = env.apiBaseUrl + 'auth';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient,
     private router: Router,
     private toast: ToastrService) {
        this.validateToken();
    }
    
    get userRole() {
        return localStorage.getItem('role');
    }

    get userToken() {
        return localStorage.getItem('token');
    }

    validateToken() {
        const fetchedToken = localStorage.getItem('token');
        if (fetchedToken) {
            try {
                const decryptedToken = (fetchedToken);
                this.verifyToken(decryptedToken).toPromise().then((res: any) => {
                if (res.statusCode) {
                    localStorage.setItem('token', fetchedToken);
                    // localStorage.setItem('role', res.data.user.role);
                    
                }
                }).catch((err: HttpErrorResponse) => {
                if (err) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    this.router.navigateByUrl('/login').then();
                }
                });
            }
                // @ts-ignore
            catch (err: DOMException) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                console.log('Authentication failed');
            }
        }
    }

    verifyToken(token: any) {
        return this.http.post(ENDPOINT_URL + '/verify-token', {token});
    }

    login(login: string, password: string) {
        this.http.post(ENDPOINT_URL + '/login', {login, password})
        .subscribe((res: any) => {
            const token = res.data.access_token;
            const encryptedToken = (token);
            localStorage.setItem('token', encryptedToken);
            localStorage.setItem('activeRoute', 'Home');
            this.verifyToken(encryptedToken)
            .subscribe((res: any) => {
                if(res.statusCode) {
                    localStorage.setItem('role', res.data.user.role)
                }
            })
            this.toast.success('Logged in successfully!')
            setTimeout(() => this.router.navigateByUrl('/home').then(), 1000)
            
        },
        (err: any) => {
            this.toast.error('Invalid credentials')
        }
        )
        
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigateByUrl('/login').then();
    }

    forgotPassword(email: string) {
        this.http.post(ENDPOINT_URL + '/forgot', {email}).subscribe((res: any) => {
            if(res.statusCode) {
            this.toast.success('Email sent', '')
            localStorage.setItem('reset_token', res.data.token);
            localStorage.setItem('reset_code', res.data.verif_code);
            localStorage.setItem('email', email);
            }
            (err: HttpErrorResponse) => {
                this.toast.error('Account not found, try again', '');
            }
        })
    }

    resetPassword(password: any, verifCode: any, token: any) {
        this.http.put(ENDPOINT_URL + '/reset-password', {password}, {params: {verifCode: verifCode, token: token}})
        .subscribe((res: any) => {
            if(res.statusCode) {
                this.toast.success('Password changed successfully', '');
                localStorage.removeItem('reset_code');
                localStorage.removeItem('reset_token');
                this.router.navigateByUrl('/login').then()
            }
        })
    }

    

}