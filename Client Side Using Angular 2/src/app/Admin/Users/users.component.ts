import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from "../../Services/CustomerService/customer.service";
import { NavbarService } from "../../Services/navBarService/navbar.service";


@Component({
    selector: 'users',
    styleUrls: [`./users.component.css`],
    templateUrl: `./users.component.html`,
})

export class UsersComponent {
    loading: boolean = false;
    arUsers: any[];
    boolAddUser: boolean = false;
    boolEditUser: boolean = false;
    boolUserTable: boolean = true;
    boolImgRemoved: boolean = false;
    private userToEdit: any;
    private userId: number;
    private name: string;
    private email: string;
    private phone: string;
    private about: string;
    private quotes: string;
    private image: string;
    private user: any;
    private msgEdit: any;
    private msgAdd: any;
    private boolmsgEdit = false;
    private boolmsgAdd = false;


    //constructor-------------------------------------------------------------------------
    constructor(private custService: CustomerService) {
        //this.loading = true;

        this.custService.Get().subscribe(res => {
            this.arUsers = res.json();
            console.log(this.arUsers);
            this.loading = false;
        },
            (err) => {
                console.log("error : " + err);
                this.loading = false;
            });
    }


    DeleteImgHandler() {
        this.image = "";
        this.boolImgRemoved = true;
    }

    //Edit a user-------------------------------------------------------------------------------------------------
    EditUser(myNgForm: any) {
        if (myNgForm.valid) {
            console.log(this.name, this.email, this.phone, this.about, this.quotes, this.image);
            this.custService.editCustomer(this.userId, this.name, this.userToEdit.Age,
                this.userToEdit.Birthday, this.userToEdit.Gender, this.userToEdit.InterestedInGender,
                this.userToEdit.City, this.email,
                this.userToEdit.Password, this.phone, this.userToEdit.WorkField, this.userToEdit.Area, this.userToEdit.MinAgeRangeInterest,
                this.userToEdit.MaxAgeRangeInterest, this.userToEdit.WorkFieldInterest, this.userToEdit.Education,
                this.userToEdit.EducationInterest, this.userToEdit.Hobbies, this.userToEdit.Music, this.userToEdit.Movies,
                this.userToEdit.Religion, this.userToEdit.PoliticalView, this.about, this.quotes, this.userToEdit.Sport,
                this.userToEdit.Smoking, this.image).subscribe(response => {

                    this.msgEdit = response;

                    if (this.msgEdit == 'This request has failed') {
                        this.boolmsgEdit = true;
                        return this.msgEdit;
                    }
                    else {
                        window.alert('The user ' + this.name + ' Editing was successful');
                        console.log(this.arUsers);
                        this.boolEditUser = !this.boolEditUser;
                        this.boolmsgEdit = false;
                    }
                },
                (err) => {
                    console.log("error : " + err);
                    window.alert(JSON.stringify(err));
                });
        }
    }

    //Get User To Delete
    GetUserToDelete(user: any) {
        this.user = user;
    }

    //Delete the user
    DeleteUserHandler() {
        console.log(this.user);
        this.custService.deleteCustomer(this.user).subscribe(response => {
            window.alert('The user deleted successfully');

            let index = this.arUsers.indexOf(this.user);
            this.arUsers.splice(index, 1);
            console.log(this.arUsers);
        },
            (err) => {
                console.log('error : ' + err);
                window.alert(JSON.stringify(err));
            });
    }


    //show the add user form
    AddAddUserForm() {
        this.boolAddUser = !this.boolAddUser;
        this.name = "";
        this.email = "";
        this.phone = "";
        this.about = "";
        this.quotes = "";
        this.image = "";
        this.userId = null;
    }

    //show the edit user form With fields filled by user information
    AddEditUserForm(user: any) {
        this.boolEditUser = !this.boolEditUser;
        this.userToEdit = user;
        this.userId = user.Id;
        this.name = user.Name;
        this.email = user.Email;
        this.phone = user.Phone;
        this.about = user.AboutYou;
        this.quotes = user.Quotes;
        this.image = user.Image;
    }
}