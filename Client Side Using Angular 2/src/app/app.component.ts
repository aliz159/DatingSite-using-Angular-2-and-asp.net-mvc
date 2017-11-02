import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from "./Services/navBarService/navbar.service";
import { CustomerService } from "./Services/CustomerService/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "./Services/SessionService/session.service";

@Component({
  selector: 'my-app',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  http: any;
  router: Router;
  idCustomer: string;
  arSessions: any;
  custSession: number;

  primarySessionID: any;
  SessionID: string;


  constructor(private customerService: CustomerService,
    public nav: NavbarService, public sessionService: SessionService,
  ) {
  }

  ngOnInit() {
    this.nav.hide();
    this.nav.showHome();
  }


    adminLogout() {
        let keyUserType: any = "UserType";

        this.customerService.deleteCookie(keyUserType);

        this.nav.hideAdminNav();
        this.nav.showHome();
        this.nav.hide();
    }


  logout() {
    let keySession: any = "sessionID";
    let keyCustId: any = "custID";
    let keyPrimaryId: any = "sessionPrimaryID";
    this.SessionID = this.customerService.getCookie(keySession);
    console.log("The session string is:");
    console.log(this.SessionID);


    this.sessionService.deleteSession(this.SessionID)
      .subscribe(rsp => {
        if (rsp == "session deleted succesfully" ) {
          console.log(rsp);
          this.customerService.deleteCookie(keySession);
          this.customerService.deleteCookie(keyCustId);
          this.customerService.deleteCookie(keyPrimaryId);
        }
      }, (err) => {

        if (err._body == { "Message": "Your session expierd" }) {
          console.log(err._body);
          this.customerService.deleteCookie(keySession);
          this.customerService.deleteCookie(keyCustId);
          this.customerService.deleteCookie(keyPrimaryId);
        }
      });


    this.nav.showHome();
    this.nav.hide();
  }
}
