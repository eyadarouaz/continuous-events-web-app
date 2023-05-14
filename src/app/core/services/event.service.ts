import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment as env} from "src/environment";
import { AuthService } from "./auth.service";


const ENDPOINT_URL = env.apiBaseUrl + 'event';

@Injectable({providedIn: "root"})
export class EventService {
    constructor(private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}


    addEvent(data: any) {
        return this.http.post(ENDPOINT_URL , data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    updateEvent(id: any, data: any) {
        return this.http.put(ENDPOINT_URL + `/${id}`, data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    updateStatus() {
        return this.http.put(ENDPOINT_URL + '/0/update-status', {},{
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    registerEvent(id: any) {
        return this.http.post(ENDPOINT_URL + `/${id}/register`, {},{
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    deleteEvent(id: any) {
        return this.http.delete(ENDPOINT_URL + `/${id}` , {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    uploadPhoto(id:any, data: any) {
        return this.http.put(ENDPOINT_URL + `/${id}` + '/upload', data, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            },
        })
    }

    getEvents() {
        return this.http.get(ENDPOINT_URL, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getAttendees(id: any) {
        return this.http.get(ENDPOINT_URL + `/${id}/registrations`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }

    getEventById(id: any) {
        return this.http.get(ENDPOINT_URL + `/${id}`, {
            headers: {
                Authorization: `Bearer ${this.authService.userToken}`
            }
        })
    }
}