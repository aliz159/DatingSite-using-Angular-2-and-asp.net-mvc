import { Component } from '@angular/core';
import { CustomerService } from '../Services/CustomerService/customer.service';
import { ContactService } from '../Services/ContactService/contact.service';


@Component({
    selector: 'contact',
    styleUrls: [`./contact.component.css`],
    templateUrl: `./contact.component.html`
})

export class ContactComponent {

    loading: boolean = false;
    currentCustID: any;
    private customerId: number;
    private name: string;
    private phone: string;
    private email: string;
    private problem: string;
    private message: string;
    private errorMsg: string = "";
    //arCustomer: any[];
    arProblems: string[] = ['Login', 'My profile', 'My Pictures', 'My account', 'Complaint about another user', 'Accessibility', 'Technical problems', 'Improvement suggestions', 'Report a bug', 'Other'];
    private FromEmail: string = "theone.datingsite@gmail.com";
    private finalMessage: string;
    currentCustomer: any;


    //constructor-------------------------------------------------------------------------
    constructor(private customerService: CustomerService, private contactService: ContactService) {
        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log(this.currentCustID);

        this.customerService.GetOneCustomer(this.currentCustID).subscribe(rsp => {
            if (rsp.status == 200) {
                this.currentCustomer = rsp.json();
                console.log("this is current customer obj:");
                console.log(this.currentCustomer);
                this.name = this.currentCustomer.Name;
                this.email = this.currentCustomer.Email;
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    }


successCounter=0;
MassageSuccessed:string;
    HandelContact(myNgForm: any) {
        if (myNgForm.valid) {
            this.finalMessage = "customer name : " + this.name + ", contact phone : " +
                this.phone + ", contat email : " + this.email + ", problem type : " + this.problem +
                ", customer message : " + this.message + ".";
            console.log(this.phone)

            //adding Customer's claim to Contacts table in DB 
            this.contactService.addContact(this.currentCustID, this.name,  this.phone, this.email, this.problem, this.message).subscribe(response => {
                console.log('Response from server : ' + response);
                /*window.alert(this.name + ', Your message has been successfully saved, we will handle it quickly!');*/
            this.MassageSuccessed = "Your message has been successfully saved, we will handle it quickly!";
             this.problem=""; 
             this.message="";
            },
                (err) => {
                    console.log(err);
                    window.alert(JSON.stringify(err));
                });
            //Sending an inner email to the company about Customer's claim 
            this.customerService.SendEmail(this.FromEmail, this.FromEmail, this.problem,
                this.finalMessage).subscribe(rsp => {
                    console.log(rsp);
                    console.log("hey, we recived you complain and we are handeling it!");
                    window.alert("hey, we recived you complain and we are handeling it!");
                },
                (err) => {
                    console.log("error : " + err);
                });

            //Sending an email to the customer with status
            let msgToCust = "hey, we recived you complain and we are handeling it!";
            this.customerService.SendEmail(this.FromEmail, this.email, this.problem, msgToCust).subscribe(rsp => {
                console.log(rsp);
                console.log("an email was sent to you");
            },
                (err) => {
                    console.log("error : " + err);
                });
        }
        else {
            window.alert("The information you entered are Invalid");
        }
    }
}
