import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "./../../../environment";
import { AuthService } from "./auth.service";


const ENDPOINT_URL = env.apiBaseUrl;

@Injectable({providedIn: "root"})
export class PostService {
    constructor(private http: HttpClient,
        private authService: AuthService) {}


    likePost(id: any) {
        return this.http.post(ENDPOINT_URL + `like/${id}/like`, '', {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    canLike(id: any) {
        return this.http.get(ENDPOINT_URL + `like/${id}/getLike`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    unlikePost(id: any) {
        return this.http.delete(ENDPOINT_URL + `like/${id}/dislike`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    addComment(id: any, body: any) {
        return this.http.post(ENDPOINT_URL + `comment/${id}`, body, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getLikesPerPost(id: any) {
        return this.http.get(ENDPOINT_URL + `like/${id}/likes`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getPosts() {
        return this.http.get(ENDPOINT_URL + 'post', {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getLikes() {
        return this.http.get(ENDPOINT_URL + 'like', {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getCommentsPerPost(id: any) {
        return this.http.get(ENDPOINT_URL + `comment/${id}`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

}