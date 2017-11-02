import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {

    arTransferID: number;
    private url: string;
    headers: any;

    constructor( @Inject(Http) private http: Http) {
        this.url = "http://localhost:64755/api/Customer";
        this.headers = new Headers({ 'Accept': 'application/json' })
    }

    setCoockie(key:string, coockie: any) {
        document.cookie = key+"=" + coockie;
    }

    getCookie(name: string) {
        let arrCookie: Array<string> = document.cookie.split(';');
        console.log(arrCookie);
        let arrLen: number = arrCookie.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < arrLen; i += 1) {
            c = arrCookie[i].replace(/^\s+/g, '');
            console.log(c)
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }
     deleteCookie(name: string){
     document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 }



    CustomerConfirmation(email: string, password: string) {
        let url = this.url + "?Email=" + email + "&Password=" + password;
        return this.http.get(url, this.headers).map((res) => {
            return res.json()
        });
    }

    UpdateNumberOfLikes(likedUser:any,UpOrDown:boolean){
        let url = this.url + "/" + likedUser.Id+"?UpOrDown="+UpOrDown;
        likedUser.UpOrDown
        return this.http.patch(url,likedUser,this.headers).map((res) => {
            return res.json()
        });
    }
     IsVerifiedUpdate(UserToVerify:any){
        let url = "http://localhost:64755/api/UploadFile/" + UserToVerify.Id;
       
        return this.http.patch(url,UserToVerify,this.headers).map((res) => {
            return res.json()
        });
    }


    Get() {
        return this.http.get(this.url);
    }

    GetOneCustomer(id: number) {
        let url = this.url + "/" + id;
        return this.http.get(url);
    }


    deleteCustomer(customer: any) {
        let url = this.url + "/" + customer.Id;
        return this.http.delete(url, this.headers).map((res) => {
            return res.json()
        });
    }


    addCustomer(name:string ,age:number, birthday:string, gender:string, interestedInGender:string, 
                city:string, email:string, password:string, phone:string, workField:string, 
                area:string, minAgeRangeInterest:number,maxAgeRangeInterest:number, workFieldInterest:string, education:string, 
                educationInterest:string, hobbies:string, music:string, movies:string, religion:string, 
                politicalView:string, aboutYou:string, quotes:string,sport:string,smoking:string,
                likes:number,image:string) {

        let url = this.url;
        let body = { Name:name, Age:age, Birthday:birthday, Gender:gender, InterestedInGender:interestedInGender,
                     City:city, Area:area, Email:email, Password:password, Phone:phone, WorkField:workField,
                     MinAgeRangeInterest:minAgeRangeInterest,MaxAgeRangeInterest:maxAgeRangeInterest , WorkFieldInterest:workFieldInterest, Education:education,
                     EducationInterest:educationInterest, Hobbies:hobbies, Music:music, Movies:movies,
                     Religion:religion, PoliticalView:politicalView, AboutYou:aboutYou, Quotes:quotes,
                     Sport:sport,Smoking:smoking,Likes:likes,Image:image
                     };

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
    }


    editCustomer(id: number, name:string ,age:number, birthday:string, gender:string, interestedInGender:string, 
                city:string, email:string, password:string, phone:string, workField:string, 
                area:string,minAgeRangeInterest:number,maxAgeRangeInterest:number, workFieldInterest:string, education:string, 
                educationInterest:string, hobbies:string, music:string, movies:string, religion:string, 
                politicalView:string, aboutYou:string, quotes:string,sport:string,smoking:string,image:string) {

        let url = this.url + "/" + id;
        let body = { Id: id, Name:name, Age:age, Birthday:birthday, Gender:gender, InterestedInGender:interestedInGender,
                     City:city, Area:area, Email:email, Password:password, Phone:phone, WorkField:workField,
                     MinAgeRangeInterest:minAgeRangeInterest,MaxAgeRangeInterest:maxAgeRangeInterest, WorkFieldInterest:workFieldInterest, Education:education,
                     EducationInterest:educationInterest, Hobbies:hobbies, Music:music, Movies:movies,
                     Religion:religion, PoliticalView:politicalView, AboutYou:aboutYou, Quotes:quotes,
                      Sport:sport,Smoking:smoking,Image:image};

        return this.http.put(url, body, this.headers).map((res) => {

            // If request fails, throw an Error that will be caught
            if (res.status != 204) {
                let msg:any;
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



       SendEmail(from:string ,recipientEmail:string, title:string, message:string) {

        let url = "http://localhost:64755/api/Mail";
        let body = { From:from, RecipientEmail:recipientEmail, Title:title, Body:message};

        return this.http.post(url, body, this.headers).map((res) => {
            return res.json();
        });
       }
}