import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {


    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:64755/api/Session";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }


    Get() {
        return this.http.get(this.url);
    }


    // deleteSession(id: number) {
    //     let url = this.url + "/" + id;
    //     return this.http.delete(url, this.headers).map((res) => {
    //         return res.json()
    //     });
    // }

        deleteSession(strSession: string) {
        let url = this.url;
        let body = {SessionId: strSession};
        return this.http.put(url,body, this.headers).map((res) => {
            return res.json()
        });
    }


    editSession(id: number, customerId: number, sessionId: string, sessionDate: string, sessionTime:string, firstCustomerName:string, secondCustomerName:string) {

        let url = this.url + "/" + id;
        let body = { Id: id, CustomerId:customerId, SessionId:sessionId, SessionDate:sessionDate,
             SessionTime:sessionTime, FirstCustomerName:firstCustomerName, 
             SecondCustomerName:secondCustomerName};

        return this.http.put(url, body, this.headers).map((res) => {
            return res.json();
        });
    }
}