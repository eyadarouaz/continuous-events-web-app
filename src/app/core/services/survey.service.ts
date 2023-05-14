import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env} from "src/environment";
import { AuthService } from "./auth.service";


const ENDPOINT_URL = env.apiBaseUrl + 'survey';

@Injectable({providedIn: "root"})
export class SurveyService {
    constructor(private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}


    createSurvey(data: any) {
        return this.http.post(ENDPOINT_URL , data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    updateSurvey(id:any, data: any) {
        return this.http.put(ENDPOINT_URL + `/${id}`, data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    vote(id: any, option: any) {
        return this.http.post(ENDPOINT_URL + `/${id}/vote`, {option}, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    deleteSurvey(id: any) {
        return this.http.delete(ENDPOINT_URL + `/${id}`,  {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    hasVoted(id: any) {
        return this.http.get(ENDPOINT_URL + `/${id}/has-voted`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getSurveys() {
        return this.http.get(ENDPOINT_URL, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getSurveyById(id: any) {
        return this.http.get(ENDPOINT_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getVotes(id: any) {
        return this.http.get(ENDPOINT_URL + `/${id}/votes`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getVotesByOption(id: any, option: any) {
        return this.http.get(ENDPOINT_URL + `/${id}/${option}/votes-by-option`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getOptions(id: any) {
        return this.http.get(ENDPOINT_URL + `/${id}/options`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }
}