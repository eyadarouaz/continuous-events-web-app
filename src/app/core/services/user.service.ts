import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env} from "src/environment";
import { AuthService } from "./auth.service";

const ENDPOINT_URL = env.apiBaseUrl + 'user';

@Injectable({providedIn: "root"})
export class UserService {
    
    constructor(private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}

    getUsers() {
        return this.http.get(ENDPOINT_URL, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }    

    getProfilePicture() {
        return this.http.get(ENDPOINT_URL + '/my-profile-photo', {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

    addUser(data: any) {
        return this.http.post(ENDPOINT_URL, data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

    updateUser(id: number, data: any) {
        return this.http.put(ENDPOINT_URL+ `/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

    deleteUser(id: number) {
        return this.http.delete(ENDPOINT_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

    updateProfile(data: any) {
        return this.http.put(ENDPOINT_URL + `/edit-profile`, data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

    getProfile() {
        return this.http.get(ENDPOINT_URL + '/my-profile', {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getMemberProfile(id: number) {
        return this.http.get(ENDPOINT_URL + `/${id}/profile`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getByUsername(username: any) {
        return this.http.get(ENDPOINT_URL + `/${username}`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    updatePhoto(data: any) {
        return this.http.put(ENDPOINT_URL + '/edit-photo', data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }
    

    changePassword(currentPassword: string, newPassword: string) {
        return this.http.put(ENDPOINT_URL + '/change-password', {currentPassword, newPassword}, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }
}