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

    getLikes(id: any) {
        return this.http.get(ENDPOINT_URL + `${id}/likes`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }
}