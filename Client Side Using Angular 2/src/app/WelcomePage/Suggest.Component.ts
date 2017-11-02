import { Component, Input } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";

@Component({
    selector: 'Suggest',
    styleUrls:['./welcome.component.css'],
    template: `

<img src="img/{{Img}}" class="imgCard img-rounded">
    Name: <span>{{Name}} ({{Age}})</span><br>
    City: <span>{{City}}</span><br>
    Looking For: <span>{{InterestedInGender}}</span><br>
    About me: <div class="aboutMe">{{AboutYou}}</div><br>
    Last logged in : <span>{{LastSeenDate}} , {{LastSeenTime}}</span>
    
<br/>
    `,

})

export class SuggestComponent {
@Input() Name:string;
@Input() Age:number;
@Input() City:string
@Input() InterestedInGender:string;
@Input() AboutYou:string;
@Input() LastSeenTime:string;
@Input() LastSeenDate:string;
@Input() Img:string;


    allUsers:any;

        constructor(private customerService: CustomerService){
          this.customerService.Get().subscribe(rsp => {
            if (rsp.status == 200) {
                this.allUsers = rsp.json(); 
                console.log()    
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
        }



        
}