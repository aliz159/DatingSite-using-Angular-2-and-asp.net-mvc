import { Component, Input, Directive, OnInit } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NavbarService } from "../Services/navBarService/navbar.service";
import { LikesState } from "./enum";


@Component({
    selector: 'welcome',
    styleUrls: ['./welcome.component.css'],
    templateUrl: `./welcome.component.html`,

})

export class WelcomeComponent implements OnInit {
    loading: boolean = false;
    allUsers: any;
    currentCustID: any;
    Like = false;
    likes: number;
    likesState = LikesState.Nutral;
    Color = "131,148,150";

    //select
    custHobbies: any[];
    custSport: any[];
    custMusicGenre: any[];

    userHobbies: any[];
    userSport: any[];
    userMusicGenre: any[];

    hobbiesCounter: number = 0;
    sportCounter: number = 0;
    musicGenreCounter: number = 0;

    optimalMatching: any[] = [];
    ReasonableMatching: any[] = [];
    showMatches: any[];
    matchByGender: any[] = [];
    matchByGenderAndAge: any[] = [];
    matchByGenderAgeWork: any[] = [];

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
    User: string
    LastSeenDate: string;
    InterestedInGender1: string;
    Sport: string;
    LastSeenTime: string;
    Likes: number;

    @Input() Name: string;
    @Input() Age: number;
    @Input() City: string
    @Input() InterestedInGender: string;
    @Input() AboutYou: string;

    currentCustomer: any;
    ShowTitle = false;

    constructor(private customerService: CustomerService,
        public nav: NavbarService, private router: Router) {

        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log(this.currentCustID);

        this.customerService.GetOneCustomer(this.currentCustID).subscribe(rsp => {
            if (rsp.status == 200) {
                this.currentCustomer = rsp.json();
                console.log(this.currentCustomer);
                console.log("this is all user:");

                this.customerService.Get().subscribe(rsp => {
                    if (rsp.status == 200) {
                        this.allUsers = rsp.json();
                        console.log(this.allUsers);
                        this.FindMatch();
                    }
                    else { console.log("server responded error : " + rsp); }
                },
                    (err) => {
                        console.log("error : " + err);
                    });
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    }

    ngOnInit() {
        this.nav.show();
        this.nav.hideHome();
    }

    routeToFramework() {
        this.router.navigate(['/PersonalProfile']);
    }





    FindMatch() {
        this.custHobbies = this.GetStrToArr(this.currentCustomer.Hobbies);
        this.custSport = this.GetStrToArr(this.currentCustomer.Sport);
        this.custMusicGenre = this.GetStrToArr(this.currentCustomer.Music);
        console.log("this is customer hobbies:");
        console.log(this.custHobbies);
        console.log("this is customer sports:");
        console.log(this.custSport);
        console.log("this is customer music:");
        console.log(this.custMusicGenre);

        for (let i = 0; i < this.allUsers.length; i++) {
            if (this.allUsers[i].Gender == this.currentCustomer.InterestedInGender) {
                this.matchByGender.push(this.allUsers[i]);

                if (this.currentCustomer.MinAgeRangeInterest <= this.allUsers[i].Age <= this.currentCustomer.MaxAgeRangeInterest) {
                    this.matchByGenderAndAge.push(this.allUsers[i]);

                    if (this.allUsers[i].WorkField == this.currentCustomer.WorkFieldInterest) {
                        this.matchByGenderAgeWork.push(this.allUsers[i]);

                        if (this.allUsers[i].Education == this.currentCustomer.EducationInterest) {
                            this.userHobbies = this.GetStrToArr(this.allUsers[i].Hobbies);
                            this.userSport = this.GetStrToArr(this.allUsers[i].Sport);
                            this.userMusicGenre = this.GetStrToArr(this.allUsers[i].Music);

                            for (let i = 0; i < this.userHobbies.length; i++) {
                                for (let j = 0; j < this.custHobbies.length; j++) {
                                    if (this.userHobbies[i] == this.custHobbies[j]) {
                                        this.hobbiesCounter++;
                                    }
                                }
                            }
                            for (let i = 0; i < this.userSport.length; i++) {
                                for (let j = 0; j < this.custSport.length; j++) {
                                    if (this.userSport[i] == this.custSport[j]) {
                                        this.sportCounter++;
                                    }
                                }
                            }
                            for (let i = 0; i < this.userMusicGenre.length; i++) {
                                for (let j = 0; j < this.custMusicGenre.length; j++) {
                                    if (this.userMusicGenre[i] == this.custMusicGenre[j]) {
                                        this.musicGenreCounter++;
                                    }
                                }
                            }
                            console.log(this.allUsers[i]);
                            console.log(this.optimalMatching);
                            console.log(this.ReasonableMatching);

                            if (this.hobbiesCounter >= 2 && this.sportCounter >= 2 && this.musicGenreCounter >= 2) {
                                this.optimalMatching.push(this.allUsers[i]);
                                console.log("this is optimal matching array");
                                console.log(this.optimalMatching);
                            }
                            if (this.hobbiesCounter >= 1 && this.sportCounter >= 1 && this.musicGenreCounter >= 1) {
                                this.ReasonableMatching.push(this.allUsers[i]);
                                console.log("this is Reasonable matching array");
                                console.log(this.ReasonableMatching);
                            }
                        }
                    }
                }

            }

        }

        if (this.optimalMatching.length != 0) {
            this.ShowTitle = true;
            this.showMatches = this.optimalMatching;
            console.log("optimal")
            console.log(this.showMatches)
        }
        else if (this.ReasonableMatching.length != 0) {
            this.ShowTitle = true;
            this.showMatches = this.ReasonableMatching;
            console.log("not optimal")
            console.log(this.showMatches)
        }
        else if (this.matchByGenderAgeWork.length != 0) {
            this.ShowTitle = true;
            this.showMatches = this.matchByGenderAgeWork;
        }
        else if (this.matchByGenderAndAge.length != 0) {
            this.ShowTitle = true;
            this.showMatches = this.matchByGenderAndAge;
        }
        else if (this.matchByGender.length != 0) {
            this.ShowTitle = true;
            this.showMatches = this.matchByGender;
        }
        else {
            this.ShowTitle = false;
            window.alert("No good matches found, you can watch all profiles and filter by request");
        }
    }


    //Takes a string and turns it into an array which is split where there is a comma
    GetStrToArr(str: string) {
        let ArrUserSelect: any[] = str.split(",");
        let index: number = ArrUserSelect.length - 1;
        ArrUserSelect.splice(index, 1);
        return ArrUserSelect;
    }

userObj:any;

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