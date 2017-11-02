import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'view-profile',
  template: `

<div class="viewProfile">
<h3>{{UserName}}</h3>
<h3>{{UserAge}}</h3>
  
  `,
  //styleUrls: ['./app.component.css'],
})
export class ViewProfileComponent  {

@Input()UserImage:string
@Input()UserName:string;
@Input()UserAge:string;

//     Gender : {{UserGender}}
//     <br/>
//     want to meet : {{InterestedInGender1}}
//     <br/>
//     birthday : {{UserBirthday}}
//     <br/>
//     Area : {{UserArea}}
//     <br/>
//     City : {{UserCity}}
//     <br/>
//     Hobbies : {{UserHobbies}}
//     <br/>
//     Sport : {{Sport}}
//     <br/>
//     Ganer : {{UserMusic}}
//     <br/>
//     Religion : {{UserReligion}}
//     <br/>
//     About me : {{UserAboutYou}}
//     <br/>
//      Last seen : {{LastSeenDate}}
// <div>



        // this.UserGender = this.userObj.Gender
        // this.UserArea = this.userObj.ArrUserSelect
        // this.UserCity = this.userObj.City
        // this.UserBirthday = this.userObj.Birthday
        // this.UserEmail = this.userObj.Email
        // this.UserEducation = this.userObj.Education
        // this.UserHobbies = this.userObj.Hobbies;
        // this.UserMusic = this.userObj.Music
        // this.Sport = userObj.Sport
        // this.UserMovies = userObj.Movies
        // this.UserSmoking = userObj.Smoking
        // this.UserAboutYou = userObj.AboutYou
        // this.UserQuotes = userObj.Quotes
        // this.UserReligion = userObj.Religion
        // this.UserPoliticalView = userObj.PoliticalView
        // this.LastSeenDate = userObj.LastSeenDate
        // this.LastSeenTime = userObj.LastSeenTime
        // this.InterestedInGender1 = userObj.InterestedInGender
        // this.Likes = userObj.Likes;

  constructor(){}

}
