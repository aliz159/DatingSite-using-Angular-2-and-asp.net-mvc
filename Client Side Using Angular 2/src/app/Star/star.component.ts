import { Component, Input } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";
import { InterestService } from "../Services/InterestService/Interest.service";


@Component({
    selector: 'Star',

    template: `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <i class="glyphicon glyphicon-star btn btn-secondary" data-toggle="tooltip" 
      data-placement="bottom" title="click if you interested" (click)="IsIntrested()" 
      [style.color]="IntrestColor? 'gold': '#797979'"></i>`,

    styles: [`
    i{ font-size:30px;
       cursor:pointer;
       margin-left:20px;
    }
    i:hover{
     
        color: #986514;
    }
    span{
        font-size:29px;
        margin-left:2px;
    }
    `],
    providers: [InterestService]

})

export class StarComponent {
    star: number = 0;
    Intrest = false;
    IntrestColor = false;
    @Input() InterestingCust: any;
    currentCustID: any;
    currentCustomer: any[];
    InterestObj: any[];
    allInterest: any = [];
    IntrestedInMe: any = [];
    currentCustObj: any;
    private FromEmail: string = "theone.datingsite@gmail.com";

    constructor(private customerService: CustomerService, private interestService: InterestService) {
        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);

        this.interestService.Get().subscribe(rsp => {
            this.allInterest = rsp.json();
            console.log(this.InterestingCust)
            console.log(this.InterestObj);
            this.allInterest = this.allInterest.filter((id: any) => id.CustomerIdInterested == Number(this.currentCustID) && id.CustomerIdInteresting == Number(this.InterestingCust.Id));

            console.log("=>>>>>>>>>>>>>>>")
            console.log(this.allInterest);

            if (this.allInterest.length != 0) {
                this.IntrestColor = true;
            }
        });



        this.customerService.GetOneCustomer(this.currentCustID).subscribe(rsp => {
            if (rsp.status == 200) {
                this.currentCustObj = rsp.json();
                console.log(this.currentCustObj);
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    }

    IsIntrested() {
        this.Intrest = !this.Intrest;
        this.Intrest ? this.star++ : this.star--;

        this.interestService.Get().subscribe(rsp => {
            this.allInterest = rsp.json();
            this.IntrestedInMe = this.allInterest.filter((id: any) => id.CustomerIdInterested == Number(this.InterestingCust.Id) && id.CustomerIdInteresting == Number(this.currentCustID));
            console.log(this.IntrestedInMe)

            this.allInterest = this.allInterest.filter((id: any) => id.CustomerIdInterested == Number(this.currentCustID) && id.CustomerIdInteresting == Number(this.InterestingCust.Id));

            this.SendEmailToBoth();

            console.log("=>>>>>>>>>>>>>>>")
            console.log(this.allInterest);

            if (this.Intrest && this.allInterest.length == 0 ||
                !this.Intrest && this.allInterest.length == 0) {
                this.IntrestColor = !this.IntrestColor;
                //adding to the Interest table who was interested in whom
                this.interestService.addInterest(this.currentCustID, this.InterestingCust.Id)
                    .subscribe(rsp => {
                        this.IntrestColor = true;
                        this.InterestObj = rsp;
                        console.log("this.InterestObj");
                        console.log(this.InterestObj);
                        window.alert("You are Interested in " + this.InterestingCust.Name);

                    },
                    (err) => {
                        console.log("error : " + err);
                        window.alert("Error");
                    });

                //Do not forget to return  --------------------------------------------------------------------------------------------------------     
                // Sending an email to the interesting customer
                let msgToCust = "hey, Someone was interested in you! Log in to the site and view its profile and decide whether to return interest.";
                this.customerService.SendEmail(this.FromEmail, this.InterestingCust.Email, "New Interest In you", msgToCust)
                    .subscribe(rsp => {
                        console.log(rsp);
                        console.log("an email was sent");
                    },
                    (err) => {
                        console.log("error : " + err);
                    });
            }
            else if (this.Intrest && this.allInterest.length != 0) {
                this.IntrestColor = false;
                this.interestService.deleteInterest(this.allInterest[0].Id)
                    .subscribe(rsp => {
                        console.log(rsp);
                        window.alert("You removed Interested from " + this.InterestingCust.Name);
                    },
                    (err) => {
                        console.log("error : " + err);
                    });
            }
        });
    }

    SendEmailToBoth() {
        if (this.IntrestedInMe.length != 0) {
            let subject = "You and another person are interested in each other!!";

            let link = "http://localhost:3000/#/SharePhone/" + this.currentCustID + "/" + this.InterestingCust.Id;
            let msgToCust = "hey, you and " + this.InterestingCust.Name + " are both interested " +
                "in each other. if you want to share you phone number click this link : " + link;

            this.customerService.SendEmail(this.FromEmail, this.currentCustObj.Email, subject, msgToCust)
                .subscribe(rsp => {
                    console.log(rsp);
                    console.log("an email was sent");
                },
                (err) => {
                    console.log("error : " + err);
                });

            let link2 = "http://localhost:3000/#/SharePhone/" + this.InterestingCust.Id + "/" + this.currentCustID;
            let msgToCust2 = "hey, you and " + this.currentCustObj.Name + " are both interested " +
                "in each other. if you want to share you phone number click this link : " + link2;

            this.customerService.SendEmail(this.FromEmail, this.InterestingCust.Email, subject, msgToCust2)
                .subscribe(rsp => {
                    console.log(rsp);
                    console.log("an email was sent");
                },
                (err) => {
                    console.log("error : " + err);
                });
        }
    }
}
