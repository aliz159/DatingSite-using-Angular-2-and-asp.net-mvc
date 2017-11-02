import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class SuccessStoriesService {


    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:64755/api/SuccessStories";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }

    GetForAdmin() {
        return this.http.get(this.url);
    }

    Get(strSession: string) {
        let url = this.url + "/" + strSession;
        let body = { SessionId: strSession };
        return this.http.patch(url, body, this.headers);
    }


    deleteSuccessStory(story: any) {
        let url = this.url + "/" + story.Id;
        return this.http.delete(url, this.headers).map((res) => {
            return res.json()
        });
    }


    addSuccessStory(idFirstCustomer: number, idSecondCustomer: number, nameFirst: string,
        nameSecond: string, cities: string, story: string, shortStory: string, image: string) {

        let url = this.url;
        let body = {
            CustomerIdFirst: idFirstCustomer, CustomerIdSecond: idSecondCustomer,
            FirstCustomerName: nameFirst, SecondCustomerName: nameSecond, ShortStory: shortStory,
            Story: story, Cities: cities, Image: image
        };

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
    }


    editSuccessStory(id: number, idFirstCustomer: number, idSecondCustomer: number, nameFirst: string,
        nameSecond: string, cities: string, story: string, shortStory: string, image: string) {

        let url = this.url + "/" + id;
        let body = {
            Id: id, CustomerIdFirst: idFirstCustomer, CustomerIdSecond: idSecondCustomer,
            FirstCustomerName: nameFirst, SecondCustomerName: nameSecond, ShortStory: shortStory,
            Story: story, Cities: cities, Image: image
        };

        return this.http.put(url, body, this.headers).map((res) => {

            // If request fails, throw an Error that will be caught
            if (res.status != 204) {
                let msg: any;
                window.alert('This request has failed ' + res.status);
                msg = 'This request has failed';
                return msg;
            }
            // If everything went fine, return the response
            else {
                return res.json();
            }
        });
    }
}