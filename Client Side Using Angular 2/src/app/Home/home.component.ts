import { Component, OnInit } from '@angular/core';
import { NavbarService } from "../Services/navBarService/navbar.service";
import { CustomerService } from "../Services/CustomerService/customer.service";


@Component({
    selector: 'home',
    styleUrls: [`./home.component.css`],
    templateUrl: `./home.component.html`
})

export class HomeComponent implements OnInit {

    constructor(private customerService: CustomerService, public nav: NavbarService) { }

    ngOnInit() {
        this.nav.hide();
        this.nav.hideHome();
        this.nav.showAdminNav();
    }

    // logout() {
    //     let keyUserType: any = "UserType";

    //     this.customerService.deleteCookie(keyUserType);

    //     this.nav.hideAdminNav();
    //     this.nav.showHome();
    //     this.nav.hide();
    // }
}