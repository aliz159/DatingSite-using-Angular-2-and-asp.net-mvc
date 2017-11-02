import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from '../Services/CustomerService/customer.service';


@Component({
    selector: 'all-profiles',
    styleUrls: [`./AllProfiles.component.css`],
    templateUrl: `./AllProfiles.component.html`
})

export class allProfilesComponent {
    loading: boolean = false;
    allUsers: any;
    allUsers2: any;
    currentCustID: any;
    @Input() Name: string;
    @Input() Age: number;
    @Input() City: string
    @Input() InterestedInGender: string;
    @Input() AboutYou: string;

    //PUBLIC PROFILE
    ViewUserProfile: any;
    ShowUserProfile: boolean = false;
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
    UserSport: string
    LastSeenDate: string;
    InterestedInGender1: string;
    Sport: string;
    LastSeenTime: string;
    Likes:number;

    Male = false;
    Female = false;
    Area: string;
    City1: string;
    AgeMin: any;
    AgeMax: any;
    Religion: string;
    seeAllCust = false;

    AgeNumber = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
    AreaArr = ["South", "Central", "North", "Lowland"];

    ReligionArr = ["Other", "Judaism", "Christianity", "Islam", "Hinduism", "Buddhism"];
    constructor(private customerService: CustomerService) {

        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log(this.currentCustID);

        this.customerService.Get().subscribe(rsp => {
            if (rsp.status == 200) {
                this.allUsers = rsp.json();
                this.allUsers2 = this.allUsers;
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    }
    
    userObj:any;

    ViewProfile(userObj: any) {
        this.userObj = userObj;
        this.ShowUserProfile = true;
        console.log("User =>" + userObj)
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
        this.UserMovies = userObj.Movies
        this.UserSmoking = userObj.Smoking
        this.UserAboutYou = userObj.AboutYou
        this.UserQuotes = userObj.Quotes
        this.UserReligion = userObj.Religion
        this.UserPoliticalView = userObj.PoliticalView
        this.UserSport = userObj.Sport
        this.LastSeenDate = userObj.LastSeenDate
        this.InterestedInGender1 = userObj.InterestedInGender;
        this.Likes = userObj.Likes;
    }





    GoBackToMaches() {
        this.ShowUserProfile = false;
    }

    objects: any;

    Search() {
        this.seeAllCust = !this.seeAllCust;



        if (this.Male == true && this.Female == true) {
            this.objects = this.allUsers;

        }
        else if (this.Male == false && this.Female == false) {
            this.objects = this.allUsers;

        }
        else if (this.Male != undefined || this.Female != undefined) {
            if (this.Male == true) {
                this.objects = this.allUsers.filter((str: any) => str.Gender == "male");
            }
            else if (this.Female == true) {
                this.objects = this.allUsers.filter((str: any) => str.Gender == "female");
            }
        }

        if (this.Area != "" && this.Area != undefined) {
            this.objects = this.objects.filter((str: any) => str.Area == this.Area);
        }


        if (this.Religion != "" && this.Religion != undefined) {
            this.objects = this.objects.filter((str: any) => str.Religion == this.Religion);
        }

        if (this.AgeMin != undefined || this.AgeMax != undefined) {
            this.objects = this.objects.filter((str: any) => str.Age <= this.AgeMax && str.Age >= this.AgeMin);
        }
        this.allUsers = this.objects;
    }

    GoBackAllCust() {
        this.seeAllCust = !this.seeAllCust;
        this.Male = false;
        this.Female = false;
        this.Area = "";
        this.City1 = "";
        this.AgeMin = null;
        this.AgeMax = null;
        this.Religion = "";

        this.customerService.Get().subscribe(rsp => {
            if (rsp.status == 200) {
                this.allUsers = rsp.json();
                this.allUsers2 = this.allUsers;
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    }
}