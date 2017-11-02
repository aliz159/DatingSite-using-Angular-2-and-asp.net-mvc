import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { WelcomeComponent } from "../WelcomePage/welcome.component";
import { NavbarService } from "../Services/navBarService/navbar.service";



@Component({
    selector: 'login',
    styleUrls: [`./login.component.css`],
    templateUrl: `./login.component.html`,
})

export class loginComponent implements OnInit {
    //loading: boolean = false;

    allUsers: any;
    OneUsers: any;
    Error: string;

    Email: string;
    Password: string;
    UserId: number;
    indexOfUser: number;
    unicUser: any;

    parentRouter: any;
    routerLink: Router;

    custSession: any;


    constructor(private customerService: CustomerService, public nav: NavbarService, private router: Router) {
        //this.loading=true;
        this.customerService.Get().subscribe(rsp => {
            if (rsp.status == 200) {
                this.allUsers = rsp.json();
                console.log(this.allUsers);
                //this.loading=false;
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
                //this.loading=false;
            });
    }

    ngOnInit() {
        this.nav.hide();
        this.nav.hideHome();
    }

    Login() {
        this.customerService.CustomerConfirmation(this.Email, this.Password).subscribe((rsp: any) => {
            this.custSession = rsp;

            console.log("this is the error");
            console.log(this.custSession.message);
            if (this.custSession == "This is Admin") {
                let keyUserType: any = "UserType";
                this.customerService.setCoockie(keyUserType, "Admin");
                this.routeToAdminFramework();
            }
            else if (this.custSession != "user name or password is invalid") {
                this.customerService.GetOneCustomer(this.custSession.CustomerId).subscribe(rsp => {
                    let objUser = rsp.json();
                    if (rsp.status == 200) {
                       /* objUser.Id*/
                        if (objUser.IsVerified) {
                            console.log(this.custSession);
                            let keySession: any = "sessionID";
                            let keyCustId: any = "custID";
                            let keyPrimaryId: any = "sessionPrimaryID";

                            this.customerService.setCoockie(keySession, this.custSession.SessionId);
                            this.customerService.setCoockie(keyCustId, this.custSession.CustomerId);
                            this.customerService.setCoockie(keyPrimaryId, this.custSession.Id);
                            let currentSession = this.customerService.getCookie(keySession);

                            console.log(currentSession);

                            this.routeToFramework();
                        }
                        else {
                            window.alert("Please activate your account from the link that sent to you")
                        }
                    }
                    else { console.log("error"); }

                });

            }
        },
            (err) => {
                this.Error = "Email or password incorrect Please try again";
                console.log(err._body);
            });
    }


    routeToFramework() {
        this.router.navigate(['/WelcomeUser']);
    }

    routeToAdminFramework() {
        this.router.navigate(['/home']);
    }
}