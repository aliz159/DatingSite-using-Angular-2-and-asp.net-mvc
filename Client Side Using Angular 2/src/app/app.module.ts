import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NavbarService } from "./Services/navBarService/navbar.service";

import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { loginComponent } from './Login/login.component';
import { RegistrationComponent } from './Registration/registration.component';
import { WelcomeComponent } from './WelcomePage/welcome.component';
import { RecommendComponent } from './Recommend/recommend.component';
import { SuccessStoriesComponent } from './SuccessStories/SuccessStories.component';

import { allProfilesComponent } from './AllProfiles/AllProfiles.component';
import { ContactComponent } from './contact/contact.component';
import { InterestListComponent } from './Customer/InterestList/InterestList.component';
import { PersonalProfileComponent } from './Customer/PersonalProfile/PersonalProfile.component';
import { SuggestionListComponent } from './Customer/SuggestionList/SuggestionList.component';
import { WatchListComponent } from './Customer/WatchList/WatchList.component';

import { loadingComponent } from './Loading/loading.component';
import { LikeComponent } from './Likes/like.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found.component';

import { InterestService } from "./Services/InterestService/interest.service";
import { SuccessStoriesService } from "./Services/SuccessStoriesService/SuccessStories.service";
import { CustomerService } from "./Services/CustomerService/customer.service";
import { ContactService } from "./Services/ContactService/contact.service";
import { StoryComponent } from "./SuccessStories/Story.component";
import { SuggestComponent } from "./WelcomePage/Suggest.Component";
import { SessionService } from "./Services/SessionService/session.service";
import { StarComponent } from "./Star/star.component";
import { UploadComponent } from "./Upload.component";
import { ViewProfileComponent } from "./ViewProfiles/ViewProfile.component";
import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AddToWatchListComponent } from "./Customer/WatchList/addToWatchList.component";
import { WatchListService } from "./Services/WatchListService/watchList.service";
import { UsersComponent } from "./Admin/Users/users.component";
import { StoriesComponent } from "./Admin/UsersSuccessStories/stories.component";
import { UsersContactsComponent } from "./Admin/UsersContacts/usersContacts.component";
import { LikeService } from "./Services/LikesService/like.service";
import { VerificationComponent } from "./verification.component";
import { SharePhoneComponent } from "./SharePhone.component"; 

const appRoutes: Routes = [
  { path: 'startDating', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: loginComponent },
  { path: 'stories', component: SuccessStoriesComponent },
  { path: 'Verification/:id', component: VerificationComponent },
  { path: 'SharePhone/:id1/:id2', component: SharePhoneComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Recommend', component: RecommendComponent },
  { path: 'WelcomeUser', component: WelcomeComponent },
  { path: 'PersonalProfile', component: PersonalProfileComponent },
  { path: 'ViewUsers', component: UsersComponent },
  { path: 'WatchList', component: WatchListComponent },
  { path: 'AllProfiles', component: allProfilesComponent },
  { path: 'Interest', component: InterestListComponent },
  { path: 'Stories', component: StoriesComponent },
  { path: 'UsersContacts', component: UsersContactsComponent },
];
@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot(appRoutes), CommonModule],

  declarations: [SharePhoneComponent,StoriesComponent,UsersContactsComponent,UsersComponent, AppComponent, HomeComponent, loadingComponent, PageNotFoundComponent, LikeComponent,
    allProfilesComponent, ContactComponent, PersonalProfileComponent, SuggestionListComponent, WelcomeComponent,
    StarComponent, WatchListComponent, loginComponent, RegistrationComponent,
    RecommendComponent, SuccessStoriesComponent, StoryComponent, SuggestComponent,
    AddToWatchListComponent, SuggestComponent, UploadComponent, InterestListComponent
    , ViewProfileComponent,VerificationComponent],

  providers: [SessionService, WatchListService, ContactService, 
    CustomerService, SuccessStoriesService, InterestService, 
    NavbarService,LikeService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
