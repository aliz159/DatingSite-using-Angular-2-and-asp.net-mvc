import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class WatchListService {


    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:64755/api/WatchList";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }


    Get(strSession: string) {
        let url = this.url + "/" + strSession;
        let body = { SessionId: strSession };
        return this.http.put(url, body, this.headers);
    }

    deleteWatch(watch: any) {
        let url = this.url + "/" + watch;
        return this.http.delete(url, this.headers).map((res) => {
            return res.json()
        });
    }


    addWatch(idViewer: number, idViewed: number) {

        let url = this.url;
        let body = { CustomerIdViewer:idViewer, CustomerIdViewed:idViewed };

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
    }


    // editInterest(id: number, idViewer: number, idViewed: number) {

    //     let url = this.url + "/" + id;
    //     let body = { Id: id, CustomerIdViewer:idViewer, CustomerIdViewed:idViewed };

    //     return this.http.put(url, body, this.headers).map((res) => {
    //         return res.json();
    //     });
    // }
}