import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env} from "src/environment";

const ENDPOINT_URL = env.apiBaseUrl;

@Injectable({providedIn: "root"})
export class UserService {

    constructor(private http: HttpClient,) {}

    
}