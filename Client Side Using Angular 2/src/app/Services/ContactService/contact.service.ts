import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactService {

    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:64755/api/Contact";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }


    Get() {
        return this.http.get(this.url);
    }


    deleteContact(contact: any) {
        let url = this.url + "/" + contact.Id;
        return this.http.delete(url, this.headers).map((res) => {
            return res.json()
        });
    }


    addContact(idCustomer: number, name: string, phone: string, email: string, 
                problem: string, message:string) {

        let url = this.url;
        let body = { CustomerId:idCustomer, Name:name, Phone:phone, Email:email,
                     ProblemType:problem, Message:message};

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
    }


    editContact(Id:number, idCustomer: number, name: string, phone: string, 
                email: string, problem: string, message:string, lastUpdate:string, status:string) {

        let url = this.url + "/" + Id;
        let body = { id: Id, CustomerId:idCustomer, Name:name, Phone:phone, Email:email,
                     ProblemType:problem, Message:message, LastUpdate:lastUpdate, Status: status};

        return this.http.put(url, body, this.headers).map((res) => {
            return res.json();
        });
    }
}