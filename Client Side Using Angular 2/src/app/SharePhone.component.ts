import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from "./Services/CustomerService/customer.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'sharePhone',
    template: `
        <h1>{{msg}}<h1>`,
    styles: [`h1{
font-size: 36px;
    text-align: center;
    font-weight: bold;
    display:inline;
    }
.icon{
    font-size: 38px;
    margin-left: 23%;
}   `],
})
export class SharePhoneComponent {
    userToShareId: string;
    userWhoShareId: string;
    userToShare: any;
    userWhoShare: any;
    msg = "";
    private FromEmail: string = "theone.datingsite@gmail.com";

    constructor(private router: ActivatedRoute, private customerService: CustomerService) {

        this.userWhoShareId = this.router.snapshot.paramMap.get("id1");
        this.userToShareId = this.router.snapshot.paramMap.get("id2");


        this.customerService.GetOneCustomer(Number(this.userToShareId)).subscribe(rsp => {
            this.userToShare = rsp.json();
            console.log(this.userToShare);
            this.GetUserAndSharePhone();
        },
            (err) => {
                console.log("error : " + err);
            });
    }

    
    GetUserAndSharePhone() {
        this.customerService.GetOneCustomer(Number(this.userWhoShareId)).subscribe(rsp => {
            this.userWhoShare = rsp.json();
            console.log(this.userWhoShare);
            this.sendPhoneEmail(this.userWhoShare, this.userToShare.Email);
        },
            (err) => {
                console.log("error : " + err);
            });
    }



    sendPhoneEmail(userObj: any, recipientEmail: string) {
        let subject = "You got a phone number from another person!";
        let msgToCust = "hey, " + userObj.Name + " decieded to share with your phone number : " + userObj.Phone;

        this.customerService.SendEmail(this.FromEmail, recipientEmail, subject, msgToCust)
            .subscribe(rsp => {
                console.log(rsp);
                console.log("an email was sent");
            },
            (err) => {
                console.log("error : " + err);
            });

    }
}
