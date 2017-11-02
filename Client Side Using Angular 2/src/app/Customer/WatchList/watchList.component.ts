import { Component } from '@angular/core';
import { CustomerService } from "../../Services/CustomerService/customer.service";
import { WatchListService } from "../../Services/WatchListService/watchList.service";
import { NavbarService } from "../../Services/navBarService/navbar.service";
import { AddToWatchListComponent } from "./addToWatchList.component";

@Component({
    selector: 'watch-list',
    styleUrls: [`./watchList.component.css`],
    templateUrl: `./watchList.component.html`,
    providers: [AddToWatchListComponent]
})

export class WatchListComponent {
    loading: boolean = false;
    currentCustID: any;
     arrWatchList: any[] = [];
    allCustomers: any[] = [];
    title = "";
    myWatchList: any = [];
    watchlistMyyyyyy: any = [];
    color=true;


     UserImage: string
    UserLikes: string
    UserName: string
    UserAge: number
    UserGender: string
    UserArea: string//
    UserCity: string
    UserBirthday: string
    UserEmail: string
    UserEducation: string
    UserHobbies: string
    UserMusic: string
    UserMovies: string
    UserSmoking: string
    UserAboutYou: string
    UserQuotes: string
    UserPoliticalView: string
    UserReligion: string
    User: string
    LastSeenDate: string;
    InterestedInGender1: string;
    Sport: string;
    LastSeenTime: string;
    Likes: number;



     constructor(private customerService: CustomerService, private WatchService: WatchListService, private nav: NavbarService,
        private addToWatchList:AddToWatchListComponent) {
        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log(this.currentCustID);

        let keySession: any = "sessionID";
        let SessionID = this.customerService.getCookie(keySession);
        console.log("The session string is:");
        console.log(SessionID);

         this.customerService.Get().subscribe(rsp => {
             if (rsp.status == 200) {
                this.allCustomers = rsp.json();
                console.log("this is all customer:");
                console.log(this.allCustomers);
             }
             else { console.log("server responded error : " + rsp); }
         },
            (err) => {
                console.log("error : " + err);
            });

        this.WatchService.Get(SessionID).subscribe(rsp => {
            this.arrWatchList = rsp.json();
            console.log("this is data from watchlist table:");
            console.log(this.arrWatchList);
            this.watchlistMyyyyyy = this.arrWatchList.filter((str: any) => str.CustomerIdViewer == Number(this.currentCustID));
            console.log("my watch listttttttttttttttttttt")
            console.log(this.watchlistMyyyyyy)
            if (this.watchlistMyyyyyy.length != 0) {
            this.addToWatchList.Color();
            }



            console.log("this is data from watchlist table:");
            console.log(this.arrWatchList);

            if (this.watchlistMyyyyyy.length == 0) {
                this.title = "You'r watchlist is empty";
            }
            else {
                 this.title = "Watch List";
            }            
                 let i =0;
                 this.allCustomers.forEach((cust:any) => {
                     this.watchlistMyyyyyy.forEach((watch:any) => {
                        if (cust.Id == watch.CustomerIdViewed) {
                             this.myWatchList.push(cust);
                             console.log("my Watch List")
                             console.log(this.myWatchList)
                         }
                 });
            });
        console.log("this is myWatchList array : ");
        console.log(this.myWatchList);
      },
            (err:any) => {

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


     userObj:any;
     ShowUserProfile:boolean;

    ViewProfile(userObj: any) {
        this.userObj = userObj;
        this.ShowUserProfile = true;
        this.UserImage = userObj.Image;
        this.UserName = userObj.Name;
        this.UserAge = userObj.Age
        this.UserGender = userObj.Gender
        this.UserArea = userObj.ArrUserSelect
        this.UserCity = userObj.City
        this.UserBirthday = userObj.Birthday
        this.UserEmail = userObj.Email
        this.UserEducation = userObj.Education
        this.UserHobbies = userObj.Hobbies;
        this.UserMusic = userObj.Music
        this.Sport = userObj.Sport
        this.UserMovies = userObj.Movies
        this.UserSmoking = userObj.Smoking
        this.UserAboutYou = userObj.AboutYou
        this.UserQuotes = userObj.Quotes
        this.UserReligion = userObj.Religion
        this.UserPoliticalView = userObj.PoliticalView
        this.LastSeenDate = userObj.LastSeenDate
        this.LastSeenTime = userObj.LastSeenTime
        this.InterestedInGender1 = userObj.InterestedInGender
        this.Likes = userObj.Likes;
        }




    GoBackToMaches() {
        this.ShowUserProfile = false;
    }
}