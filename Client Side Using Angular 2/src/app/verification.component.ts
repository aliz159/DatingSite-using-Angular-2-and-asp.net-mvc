import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from "./Services/CustomerService/customer.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'verification',
    template: `
    <i class="glyphicon icon glyphicon-heart"></i>
    <h1>{{msg}}<h1>
    <i class="glyphicon glyphicon-heart"></i>`,
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
export class VerificationComponent {
    userId: string;
    userToVerify: any;
    msg = "";

    constructor(private router: ActivatedRoute, private customerService: CustomerService) {
        this.userId = this.router.snapshot.paramMap.get("id");

        this.customerService.GetOneCustomer(Number(this.userId)).subscribe(rsp => {
            if (rsp.status == 200) {
                this.userToVerify = rsp.json();
                console.log(this.userToVerify);
                if (this.userToVerify.IsVerified == true) {
                    this.verifyCustomer();
                }
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });

    }

    verifyCustomer() {
        this.customerService.IsVerifiedUpdate(this.userToVerify).subscribe(rsp => {
            console.log(rsp);
            window.alert("your account is now active");
            this.msg = "Hello, your account is now active!! ";
        },
            (err) => {
                console.log("error : " + err);
            });

    }

}
