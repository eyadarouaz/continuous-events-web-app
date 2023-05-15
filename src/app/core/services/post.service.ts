import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "src/environment";
import { AuthService } from "./auth.service";


const ENDPOINT_URL = env.apiBaseUrl;

@Injectable({providedIn: "root"})
export class PostService {
    constructor(private http: HttpClient,
        private authService: AuthService) {}

    getPosts() {
        return this.http.get(ENDPOINT_URL + 'post', {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    likePost(id: any) {
        return this.http.post(ENDPOINT_URL + `${id}/like`, '', {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    canLike(id: any) {
        return this.http.get(ENDPOINT_URL + `${id}/getLike`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    unlikePost(id: any) {
        return this.http.delete(ENDPOINT_URL + `${id}/dislike`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getLikes(id: any) {
        return this.http.get(ENDPOINT_URL + `${id}/likes`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }
}