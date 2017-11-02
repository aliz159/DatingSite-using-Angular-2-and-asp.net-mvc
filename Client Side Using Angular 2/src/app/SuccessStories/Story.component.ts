import { Component, Input } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";
import { SuccessStoriesService } from '../Services/SuccessStoriesService/SuccessStories.service';

@Component({
    selector: 'story',
    styleUrls: [`./SuccessStories.component.css`],
    template: `  
    <img src="{{img}}" height="150" width="175">
    <span> {{FirstCustomerName}} and  {{SecondCustomerName}}, {{Cities}} : </span>
<br/>
    <span *ngIf="!Enable1">{{Story}}</span>
    <span *ngIf="Enable1">{{ShortStory}}</span>
    <a class="readMore" (click)="Enable1 = !Enable1">{{Enable1 ? 'read more ' : 'read less'}}</a>
    `
})

export class StoryComponent {
    @Input() FirstCustomerName: string;
    @Input() SecondCustomerName: string;
    @Input() Cities: string;
    @Input() Story: string;
    @Input() ShortStory: string;
    @Input() img:string
    constructor() { }

    Enable1 = true;
    ReadMoreOrLess1() {
        this.Enable1 = !this.Enable1;

    }
}
    // constructor(private customerService: CustomerService,
    //     private storiesService: SuccessStoriesService) {
    //     storiesService.Get().subscribe(rsp => {
    //         if (rsp.status == 200) {
    //             this.arStories = rsp.json();
    //         }
    //         else { console.log("server responded error : " + rsp); }
    //     },
    //         (err) => {
    //             console.log("error : " + err);
    //         });



    //     customerService.Get().subscribe(rsp => {
    //     if (rsp.status == 200) 
    //     {
    //             this.arUsers = rsp.json();
    //        for (var i = 0; i < this.arUsers.length; i++) {
    //          if(this.arUsers[i].Id == this.CustomerIdFirst)
    //          {
    //             this.Name1=this.arUsers[i].Id;
    //            if(this.arUsers[i].Id == this.CustomerIdSecond)
    //             {
    //                  this.Name2=this.arUsers[i].Id;
    //             }
    //           }
    //         }

    //     }
    //     else { console.log("server responded error : " + rsp); }
    //     },
    //         (err) => {
    //             console.log("error : " + err);
    //         });




        // storiesService.Get()
        // .subscribe(rsp => {
        //     if (rsp.status == 200) {
        //         this.arStories = rsp.json();
        //         this.arStories.CustomerIdFirst=this.CustomerIdFirst;
        //         this.arStories.CustomerIdSecond=this.CustomerIdSecond;
        //     }
        //     else { console.log("server responded error : " + rsp); }
        // },
        //     (err) => {
        //         console.log("error : " + err);
        //     });



/*
        customerService.Get()
        .subscribe(rsp => {
            if (rsp.status == 200) {
                this.arUsers = rsp.json();
                this.arUsers.Name=this.Name1
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    

        customerService.GetOneCustomer(this.CustomerIdSecond)
        .subscribe(rsp => {
            if (rsp.status == 200) {
                this.arUsers = rsp.json();
                this.arUsers=this.Name2
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    */
// }

