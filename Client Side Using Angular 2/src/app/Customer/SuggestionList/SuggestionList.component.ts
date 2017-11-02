import { Component } from '@angular/core';
import { CustomerService } from "../../Services/CustomerService/customer.service";


@Component({
    selector: 'suggestion-list',
    styleUrls: [`./SuggestionList.component.css`],
    templateUrl: `./SuggestionList.component.html`
})

export class SuggestionListComponent {
    loading: boolean = false;
    currentCustID: any;

    constructor(private customerService: CustomerService) {
        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log(this.currentCustID);
    }

}