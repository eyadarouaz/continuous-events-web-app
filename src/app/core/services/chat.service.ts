import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Socket } from "ngx-socket-io";
import { environment as env} from "src/environment";


const ENDPOINT_URL = env.apiBaseUrl;

@Injectable({providedIn: "root"})
export class ChatService {
    constructor(private http: HttpClient,
        private router: Router, private socket: Socket) {}

        getMessages() {
            return this.http.get(ENDPOINT_URL + 'api/chat')
        }

        sendMessage(message: string) {
            this.socket.emit('sendMessage', message)
        }

        recieveMessages(messages: Array<any>) {
            this.socket.on('recMessage', (message: any) => {
                console.log(message)
                messages.push(message)
            })
        }

}