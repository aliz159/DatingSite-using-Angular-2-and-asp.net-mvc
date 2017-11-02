import { Component, Input } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";
import { LikeService } from "../Services/LikesService/like.service";

@Component({

    selector: 'Like',

    template: `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <i class="glyphicon glyphicon-heart btn btn-secondary"
       data-toggle="tooltip" data-placement="bottom" 
       title="click if you like" (click)="IsLiked()" 
       [style.color]="Like? '#c5296a': '#797979'"></i>
      <span>{{likes}}</span>`,

    styles: [`
    i{ font-size:30px;
       cursor:pointer;
       margin-left:0px;
    }
    i:hover{
        color: #986514;
    }
    span{
            font-size: 29px;
    margin-left: -13px;
           }
    `],

})


export class LikeComponent {
    @Input() likes: number;
    Like = false;
    currentCustID: any;
    currentCustomer: any[];
    @Input() likedCustomer: any;
    allLikes: any;
    LikedObj: any;
    UpOrDown:boolean;
    constructor(private customerService: CustomerService,
        private likeService: LikeService) {
        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);

        this.likeService.Get().subscribe(rsp => {
            this.allLikes = rsp.json();
            this.allLikes = this.allLikes.filter((id: any) => id.CustomerIdLiked == Number(this.currentCustID) && id.CustomerIdILike == Number(this.likedCustomer.Id));

            console.log("=>>>>>>>>>>>>>>>")
            console.log(this.allLikes);

            if (this.allLikes.length != 0) {
                /*window.alert("you've already put like to this person");*/
                this.Like = true;
            }
        });
    }

    IsLiked() {
        this.likeService.Get().subscribe(rsp => {
            this.allLikes = rsp.json();
            this.allLikes = this.allLikes.filter((id: any) => id.CustomerIdLiked == Number(this.currentCustID) && id.CustomerIdILike == Number(this.likedCustomer.Id));
            console.log("=>>>>>>>>>>>>>>>")
            console.log(this.allLikes);

            if (this.Like && this.allLikes.length == 0 ||
                !this.Like && this.allLikes.length == 0) {
                //adding to the like table who was interested in whom
                this.likeService.addLike(this.currentCustID, this.likedCustomer.Id)
                    .subscribe(rsp => {
                        this.Like = true;                      
                        this.UpOrDown = true;
                        this.WriteToLikeDb(this.likes++)
                        this.LikedObj = rsp;
                        console.log("this.LikedObj");
                        console.log(this.LikedObj);
                        window.alert("You are Like " + this.likedCustomer.Name);
                    },
                    (err: any) => {
                        console.log("error : " + err);
                        window.alert("Error");
                    });
            }
            else if (this.Like && this.allLikes.length != 0) {
                this.likeService.deleteLike(this.allLikes[0].Id)
                    .subscribe(rsp => {
                        this.Like = false;
                        this.UpOrDown = false;
                        this.WriteToLikeDb(this.likes--)
                        console.log(rsp);
                        window.alert("You removed like from " + this.likedCustomer.Name);
                    },
                    (err) => {
                        console.log("error : " + err);
                    });
            }
        });
    }





    WriteToLikeDb(likes:number){
        this.customerService.UpdateNumberOfLikes(this.likedCustomer,this.UpOrDown)
        .subscribe(rsp => {
            if(rsp.status == 200){
                window.alert("successed Like")
            }
            else{
                console.log("Bad requesttttttttttt")
            }
        }),
        (err:any) =>{
            console.log("error " + err)
        };
    }
}
