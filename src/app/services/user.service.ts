import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env} from "src/environment";

const ENDPOINT_URL = env.apiBaseUrl + 'user';

@Injectable({providedIn: "root"})
export class UserService {
    
    constructor(private http: HttpClient,
        private router: Router) {}

    get userToken() {
        return localStorage.getItem('token');
    }

    getProfile() {
        return this.http.get(ENDPOINT_URL + '/my-profile', {
            headers: {
                Authorization: `Bearer ${this.userToken}`
            }
        })
    }

    updateProfile(data: any) {
        return this.http.put(ENDPOINT_URL + '/edit-profile', data, {
            headers: {
                Authorization: `Bearer ${this.userToken}`
            },
        })
    }
}