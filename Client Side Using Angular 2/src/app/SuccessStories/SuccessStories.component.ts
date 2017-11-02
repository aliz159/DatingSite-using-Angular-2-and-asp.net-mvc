import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";
import { SuccessStoriesService } from '../Services/SuccessStoriesService/SuccessStories.service';



@Component({
    selector: 'success-stories',
    styleUrls: [`./SuccessStories.component.css`],
    templateUrl: `./SuccessStories.component.html`
})

export class SuccessStoriesComponent implements OnInit {
    loading: boolean = false;
    arStories: any[];
    arUsers: any[];
    Cust2: any[];
    Cust1: any[];


    Enable1 = false;
    ReadMoreOrLess1() {
        this.Enable1 = !this.Enable1;
    }

    constructor(private customerService: CustomerService,
        private storiesService: SuccessStoriesService) {

        let keySession: any = "sessionID";
        let SessionID = this.customerService.getCookie(keySession);
        console.log("The session string is:");
        console.log(SessionID);


        this.storiesService.Get(SessionID).subscribe(rsp => {
            this.arStories = rsp.json();
        },
            (err) => {
                if (err._body == {"Message":"Your session expierd"}) {
                    console.log(err._body);
                    let keyCustId: any = "custID";
                    let keyPrimaryId: any = "sessionPrimaryID";
                    this.customerService.deleteCookie(keySession);
                    this.customerService.deleteCookie(keyCustId);
                    this.customerService.deleteCookie(keyPrimaryId);
                }
            });
    }

    ngOnInit() {

    }
}