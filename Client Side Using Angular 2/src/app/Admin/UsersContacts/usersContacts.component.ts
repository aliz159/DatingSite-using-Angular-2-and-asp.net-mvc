import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from "../../Services/CustomerService/customer.service";
import { ContactService } from "../../Services/ContactService/contact.service";

@Component({
    selector: 'usersContacts',
    styleUrls: [`./usersContacts.component.css`],
    templateUrl: `./usersContacts.component.html`,
})

export class UsersContactsComponent {

    loading: boolean = false;
    arContacts: any[];
    boolEditContact: boolean = false;
    boolContactsTable: boolean = true;
    boolImgRemoved: boolean = false;
    private contactToEdit: any;
    private contact: any;
    private contactId: number;
    private userId: number;
    private name: string;
    private email: string;
    private phone: string;
    private problem: string;
    private message: string;
    private lastUpdate: string;
    private status: string;

    Status = ["New", "Being Handled", "Nearing Completion", "Successfully Processed",
        "Waiting for user response", "Contact User", "Closed"];
    private msgEdit: any;
    private boolmsgEdit = false;


    //constructor-------------------------------------------------------------------------
    constructor(private custService: CustomerService, private contactService: ContactService) {
        this.loading = true;
        this.contactService.Get().subscribe(res => {
            this.arContacts = res.json();
            console.log(this.arContacts);
            this.loading = false;
        },
            (err) => {
                console.log("error : " + err);
                this.loading = false;
            });
    }

obj:any;
    //Edit a Contact-------------------------------------------------------------------------------------------------
    EditContact(myNgForm: any) {

        if (myNgForm.valid) {

            console.log(this.userId, this.name, this.email, this.phone, this.problem, this.message, this.status);
            //this.obj= this.arContacts.filter((id :any)=> id.CustomerId == this.userId && id.Message == this.message);

            this.contactService.editContact(this.contactId,this.userId,this.name, this.phone,
                this.email, this.problem, this.message, this.lastUpdate, this.status).subscribe(response => {

                    this.msgEdit = response;

                    if (this.msgEdit == 'This request has failed') {
                        this.boolmsgEdit = true;
                        return this.msgEdit;
                    }
                    else {
                        // for (let item of this.arUsers) {
                        //     if (item.id == this.userId) {
                        //         let index = this.arUsers.indexOf(item);
                        //         item.name = this.name;
                        //         item.email = this.email;
                        //         item.phone = this.phone;
                        //         item.AboutYou = this.about;
                        //         item.Quotes = this.quotes;
                        //         item.Image = this.image;
                        window.alert('The problem Editing was successful');
                        console.log(this.arContacts);
                        this.boolEditContact = !this.boolEditContact;
                        this.boolmsgEdit = false;
                        //         break;
                        //     }
                        // }

                    }
                },
                (err) => {
                    console.log("error : " + err);
                    window.alert(JSON.stringify(err));
                });

        }

    }

    //Get Contact To Delete
    GetContactToDelete(contact: any) {
        this.contact = contact;
    }

    //Delete the Contact
    DeleteContactHandler() {

        console.log(this.contact);

        this.contactService.deleteContact(this.contact).subscribe(response => {

            window.alert('The contact of ' + this.contact.Name + ' deleted');

            let index = this.arContacts.indexOf(this.contact);
            this.arContacts.splice(index, 1);
            console.log(this.arContacts);
        },
            (err) => {
                console.log('error : ' + err);
                window.alert(JSON.stringify(err));
            });
    }


    //show the edit Contact form With fields filled by Contact information
    AddEditContactForm(contact: any) {
        this.boolEditContact = !this.boolEditContact;
        this.contactToEdit = contact;
        this.contactId = contact.Id;
        this.userId = contact.CustomerId;
        this.name = contact.Name;
        this.email = contact.Email;
        this.phone = contact.Phone;
        this.problem = contact.ProblemType;
        this.message = contact.Message;
        this.lastUpdate = contact.LastUpdate;
        this.status = contact.Status;
    }
}