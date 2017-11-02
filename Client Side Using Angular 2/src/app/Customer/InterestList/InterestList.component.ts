import { Component } from '@angular/core';
import { CustomerService } from "../../Services/CustomerService/customer.service";
import { InterestService } from '../../Services/InterestService/Interest.service';

@Component({
    selector: 'interest-list',
    styleUrls: [`./InterestList.component.css`],
    templateUrl: `./InterestList.component.html`,
    providers: [InterestService]
})

export class InterestListComponent {
    loading: boolean = false;
    currentCustID: any;

    allUsers: any;
    allInterest: any;
    HaveInterestInMe: any[] = [];
    title:string;
    userObj:any;
    ShowUserProfile:boolean;
    
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

    constructor(private customerService: CustomerService,
        private interestService: InterestService) {
        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log(this.currentCustID);


        this.customerService.Get().subscribe(rsp => {
            if (rsp.status == 200) {
                this.allUsers = rsp.json();


                this.interestService.Get().subscribe(rsp => {
                    this.allInterest = rsp.json();

                    this.allInterest = this.allInterest.filter((str: any) => str.CustomerIdInteresting == Number(this.currentCustID));
                    if(this.allInterest.length != 0){
                        this.title = "People who are interested in you";
                    }
                    else{
                        this.title = "You still dont have people who are interested in you";
                    }
                    console.log("=>>>>>>>>>>>>>>>")
                    console.log(this.allInterest);
                    debugger;

                    this.allUsers.forEach((cust: any) => {
                        this.allInterest.forEach((watch: any) => {
                            if (cust.Id == watch.CustomerIdInterested) {
                                this.HaveInterestInMe.push(cust);
                                console.log(" HaveInterestInMe ")
                                console.log(this.HaveInterestInMe)
                            }
                        });
                    });
                });
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });


    }



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


        GoBackToMaches(){
             this.ShowUserProfile = false;
        }

}