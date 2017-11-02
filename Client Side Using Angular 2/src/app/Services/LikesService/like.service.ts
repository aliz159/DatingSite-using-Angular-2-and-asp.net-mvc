import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class LikeService {


    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:64755/api/Like";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }


    Get() {
        return this.http.get(this.url);
    }

    deleteLike(Like:any ) {
        let url = this.url + "/" + Like;
                return this.http.delete(url, this.headers).map((res) => {
            return res.json()
        });
    }


    addLike(IdLiked: number, IdLike: number) {
        
        let url = this.url;
        let body = { CustomerIdLiked:IdLiked, CustomerIdILike:IdLike };

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
    }


    // editInterest(id: number, idInterested: number, idInteresting: number) {

    //     let url = this.url + "/" + id;
    //     let body = { Id: id,  CustomerIdInterested:idInterested, CustomerIdInteresting:idInteresting };

    //     return this.http.put(url, body, this.headers).map((res) => {
    //         return res.json();
    //     });
    // }
    
}