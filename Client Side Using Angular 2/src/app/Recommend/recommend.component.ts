

import { Component } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";
import { Router } from "@angular/router";


@Component({
    selector: 'recommend',
    styleUrls: [`./recommend.component.css`],
    templateUrl: `./recommend.component.html`
})

export class RecommendComponent {
    /*loading: boolean = false;*/

    loading: boolean = false;
    currentCustID: any;
    private SenderName: string;
    private FromEmail: string = "theone.datingsite@gmail.com";
    private RecipientName: string;
    private RecipientEmail: string;
    getRecommendation: any[];
    private messageTitle: string = "Recomendation on TheOne dating site";
    private message: string;
    private finalMessage: string;
    currentCustomer: any;
    MassageSuccessed:string;

    //constructor-------------------------------------------------------------------------
    constructor(private customerService: CustomerService,
     private router: Router) {
        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log(this.currentCustID);

        this.customerService.GetOneCustomer(this.currentCustID).subscribe(rsp => {
            if (rsp.status == 200) {
                this.currentCustomer = rsp.json();
                console.log("this is current customer obj:");
                console.log(this.currentCustomer);
                this.SenderName = this.currentCustomer.Name;
 
   
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    }




    

    SendToEmail(myNgForm: any) {
        this.finalMessage = "Hey " + this.RecipientName + ",your friend " + this.SenderName +
            "recommend our dating website 'TheOne' for you and says : '" + this.message +
            "'. Here is our link http://localhost:3000/ We are waiting for you to check out our website!! Have a nice day";

        this.customerService.SendEmail(this.FromEmail, this.RecipientEmail, this.messageTitle,
            this.finalMessage)
            .subscribe(rsp => {
                 if (rsp.status == 200) {
                   console.log(rsp);
                window.alert("Your recommandation was send successfully");
                this.MassageSuccessed = "Your recommandation was send successfully";
                this.messageTitle="";
                this.finalMessage="";
                console.log("Your recommandation was send successfully");
                this.router.navigate(['/WelcomeUser']);
            }
            else { console.log("server responded error : " + rsp); }
            },
            (err) => {
                console.log("error : " + err);
            });
    }
}
