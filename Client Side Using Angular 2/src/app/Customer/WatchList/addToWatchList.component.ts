import { Component, Input } from '@angular/core';
import { CustomerService } from "../../Services/CustomerService/customer.service";
import { WatchListService } from "../../Services/WatchListService/watchList.service";
import { NavbarService } from "../../Services/navBarService/navbar.service";


@Component({
    selector: 'AddToWatchList',

    template: `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <span>{{added? 'Remove from Watch List': 'Add To Watch List'}}</span>
      <i class="glyphicon glyphicon-plus btn btn-secondary"
       data-toggle="tooltip" data-placement="bottom" 
       title="click if you Want to add this person to watch list" (click)="IsAdded()" 
       [style.color]="addedColor? 'blue': '#797979'"></i> `,

    styles: [`
    i{ font-size:30px;
       cursor:pointer;
       margin-left:2px;
    }
    i:hover{
       
        color: #986514;
    }
    span{
        font-size:15px;
        margin-left:40px;
           }
    `],

})


export class AddToWatchListComponent {
    added = false;
    plus: number = 0;
    currentCustID: any;
    currentCustomer: any[];
    @Input() addedCustomer: any;
    arrWatchList: any = [];
    addedColor = false;
    SessionID:any;

    constructor(private WatchService: WatchListService,
        private customerService: CustomerService, private nav: NavbarService) {

        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log("this is customer id:");
        console.log(this.currentCustID);

        let keySession: any = "sessionID";
        this.SessionID = this.customerService.getCookie(keySession);
        console.log("The session string is:");
        console.log(this.SessionID);


        this.WatchService.Get(this.SessionID).subscribe(rsp => {
            this.arrWatchList = rsp.json();
            console.log(this.addedCustomer);
            this.arrWatchList = this.arrWatchList.filter((watch: any) => watch.CustomerIdViewer == Number(this.currentCustID) && watch.CustomerIdViewed == Number(this.addedCustomer.Id));
        console.log("=>>>>>>>>>>>>>>>")
        console.log(this.arrWatchList);


        if (this.arrWatchList.length != 0) {
          /*  window.alert("you've already have this person in your watchlist");*/
            this.addedColor = true;
            this.added = true;
        }
        },
            (err) => {
                console.log(err._body);
                let keyCustId: any = "custID";
                let keyPrimaryId: any = "sessionPrimaryID";
                this.customerService.deleteCookie(keySession);
                this.customerService.deleteCookie(keyCustId);
                this.customerService.deleteCookie(keyPrimaryId);

                this.nav.showHome();
                this.nav.hide();
            });
    }

    Color(){
        this.addedColor = true;
    }
    IsAdded() {
    this.WatchService.Get(this.SessionID).subscribe(rsp => {
    this.arrWatchList = rsp.json();
    this.arrWatchList = this.arrWatchList.filter((watch: any) => watch.CustomerIdViewer == Number(this.currentCustID) && watch.CustomerIdViewed == Number(this.addedCustomer.Id));

    this.added = !this.added;
        //this.added ? this.plus++ : this.plus--;

        if (this.added && this.arrWatchList.length == 0) {
            console.log("added function");
            this.WatchService.addWatch(this.currentCustID, this.addedCustomer.Id).subscribe(rsp => {
                   this.addedColor = true;
                    console.log(rsp);
            },
                (err) => {
                    console.log("error : " + err);
                });
        }
        else if (!this.added && this.arrWatchList.length != 0) {
            //this.addedColor = !this.addedColor;
            this.WatchService.deleteWatch(this.arrWatchList[0].Id)
                .subscribe(rsp => {
                    this.addedColor = false;
                    console.log(rsp);
                    window.alert("You removed " + this.addedCustomer.Name + "from your watchlist");
                },
                (err) => {
                    console.log("error : " + err);
                });
        }
        // else if (this.arrWatchList.length != 0) {
        //     window.alert("you've already have this person in your watchlist");
        //     this.addedColor = true;
        // }
    });
        
    }
}
