import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from "../Services/CustomerService/customer.service";
import { Router } from "@angular/router";
import { LocalStorageModule } from 'angular-2-local-storage';
import { NavbarService } from "../Services/navBarService/navbar.service";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Component({
    selector: 'registration',
    styleUrls: [`./registration.component.css`],
    templateUrl: `./registration.component.html`
})

export class RegistrationComponent implements OnInit {
    loading: boolean = false;
    public selectedHobbies: any = [];
    public filteredList: any[];

    public selectedSport: any = [];
    public filteredListSport: any[];

    public selectedSchner: any = [];
    public filteredListSchner: any[];
    UserName: string = "";
    Email: string = "";
    Password: string = "";
    AgeUser: number;
    Gender: string;
    DateOfBirth: string;
    Area1: string;
    City: string;
    LookingFor: string;
    Work1: string;
    Work2: string;
    Education1: string;
    Education2: string;
    Hobbies1: string;
    matchHobbies: string;
    Movie1: string;
    aboutMySelf: string;
    Quotes: string;
    PoliticView: string;
    Religion1: string;
    Phone: string;
    AgeUserInterested: string;
    MinAge: number;
    MaxAge: number;
    MyAge: number;
    Smoking: string;

    toggleUilistHobbies: boolean = false;
    toggleUilistSport: boolean = false;
    toggleUilistSchner: boolean = false;

    strHobbies: string = "";
    strSport: string = "";
    strSchner: string = "";
    GetAllDitailes: any;
    parentRouter: any;
    ErrorMassage: string;

    UrlImg: string;


    GetAllUsers: any = []

    Area = ["South", "Central", "North", "Lowland"];
    Love = ["male", "female"];
    Work = ["Additional positions",
        "Administration",
        "Accounting and Finance",
        "Aviation and Shipping",
        "Construction of infrastructures and real estate",
        "Computing and networks",
        "Customer Service",
        "Electronics and electricity",
        "Economics and the capital market",
        "Education and training",
        "Engineering",
        "Fashion and tactile",
        "Food & Events",
        "Graphics, design and art",
        "Human Resources",
        "Internet",
        "Insurance",
        "Industry and management",
        "Logistics Procurement and Shipping",
        "Medicine and Health",
        "Manufacturing, machinery and industry",
        "Media content and entertainment",
        "Maintenance, cleaning and transportation",
        "Marketing and advertising",
        "Nature and agriculture",
        "Quality Control Quality Assurance",
        "Retail",
        "Sports and spa care",
        "Science ",
        "Sales",
        "Sentences",
        "Senior Management",
        "Security",
        "software",
        "Transportation and vehicles",
        "Tourism and hotels",
        "Writing Translation and Editing",]

    Education = ["No education",
        "12 school years",
        "Full maturity",
        "high school",
        "BA",
        "Master's degree"];
    Hobbies = ["Other",
        "Travel the World", "Cooking",
        "carpentry", "Dance",
        "Collectibles", "Drawing",
        "gardening",
    ];
    MachingHobbies = [1, 2, 3, 4];
    Sport = ["Other", "Swimming", "running", "exercise", "basketball", "soccer ball",
        "tennis", "judo"];
    Schner = ["gas", "Hip-Hop", "disco",
        "pop", "Funk", "rock"];

    Religion = ["Other", "Judaism", "Christianity", "Islam", "Hinduism", "Buddhism"];
    Politic = ["Other", "Right stream", "Left stream", "Center current"];
    AgeNumber = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]
    nextForm = true;



    constructor(private customerService: CustomerService,
        private router: Router, public nav: NavbarService,
        private http: Http, private changeDetectorRef: ChangeDetectorRef) {
        this.customerService.Get().subscribe(rsp => {
            if (rsp.status == 200) {
                this.GetAllUsers = rsp.json();
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });
    }

    ngOnInit() {
        this.nav.hide();
        this.nav.hideHome();
    }

    fileChanged(e: Event) {
        var target: HTMLInputElement = e.target as HTMLInputElement;
        for (var i = 0; i < target.files.length; i++) {
            this.upload(target.files[i]);
        }
    }
    upload(img: File) {
        var formData: FormData = new FormData();
        formData.append("image", img, img.name);

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
            //You can handle progress events here if you want to track upload progress (I used an observable<number> to fire back updates to whomever called this upload)
        });
        xhr.open("PUT", "http://localhost:64755/api/Customer", true);
        xhr.send(formData);
    }


    selectHobbies(item: any) {
        this.selectedHobbies.push(item);
        this.filterHobbies();
        this.filteredList = [];
    }
    removeHobbies(item: any) {
        this.selectedHobbies.splice(this.selectedHobbies.indexOf(item), 1);
    }
    filterHobbies() {
        this.toggleUilistHobbies = !this.toggleUilistHobbies;
    }


    selectSport(item: any) {
        this.selectedSport.push(item);
        this.filteredSport();
        this.filteredListSport = [];
    }
    removeSport(item: any) {
        this.selectedSport.splice(this.selectedSport.indexOf(item), 1);
    }
    filteredSport() {
        this.toggleUilistSport = !this.toggleUilistSport;
    }


    selectSchner(item: any) {
        this.selectedSchner.push(item);
        this.filteredSchner();
        this.filteredListSchner = [];
    }
    removeSchner(item: any) {
        this.selectedSchner.splice(this.selectedSchner.indexOf(item), 1);
    }
    filteredSchner() {
        this.toggleUilistSchner = !this.toggleUilistSchner
    }


    NextForm(trvForm: any) {
        let ExistEmail = this.GetAllUsers.filter((str: any) => str.Email == trvForm.value.email);
        if (ExistEmail == 0) {
            this.nextForm = !this.nextForm;
        }
        else {
            window.alert("this email already exist")
        }
    }

    GoBack() {
        this.nextForm = !this.nextForm;
    }


    BuildProfile(trvForm: any) {

        for (var i = 0; i < this.selectedHobbies.length; i++) {
            var element = this.selectedHobbies[i];
            this.strHobbies += element + ",";
            if (i == this.selectedHobbies.length - 1) {
                this.strHobbies.slice(this.selectedHobbies.length - 1, 1);
            }
        }
        for (var i = 0; i < this.selectedSport.length; i++) {
            var element = this.selectedSport[i];
            this.strSport += element + ",";
            if (i == this.selectedSport.length - 1) {
                this.strSport.slice(this.selectedSport.length - 1, 1);
            }
        }
        for (var i = 0; i < this.selectedSchner.length; i++) {
            var element = this.selectedSchner[i];
            this.strSchner += element + ",";
            if (i == this.selectedSchner.length - 1) {
                this.strSchner.slice(this.selectedSchner.length - 1, 1);
            }
        }


        this.customerService.addCustomer(this.UserName, this.MyAge, this.DateOfBirth,
            this.Gender, this.LookingFor, this.City, this.Email, this.Password, this.Phone,
            this.Work1, this.Area1, this.MinAge, this.MaxAge, this.Work2, this.Education1,
            this.Education2, this.strHobbies, this.strSchner, this.Movie1, this.Religion1,
            this.PoliticView, this.aboutMySelf, this.Quotes, this.strSport, this.Smoking,
            0, "CustomersProfile\\" + this.file.name)
            .subscribe(rsp => {
                this.GetAllDitailes = rsp;
                console.log("this.GetAllDitailes");
                console.log(this.GetAllDitailes);
                this.sendVerificationLinkEmail();
                // window.alert("You have been successfully registered");
                this.Email = "";
                this.uploadFileToFolder();
            },
            (err) => {
                if (err._body == "img name already exist") {
                    window.alert("please change the image file name before uploading")
                }
                console.log("error : " + err._body);
            });


    }
    sendVerificationLinkEmail() {
        let FromEmail: string = "theone.datingsite@gmail.com";
        let recipient = this.GetAllDitailes.Email;
        let subject = "Your account is successfully created";
        let link = "http://" + "localhost:3000/#/Verification/" + this.GetAllDitailes.Id;
        let message = "We are excited to tel you that your TheOne account is" +
            "successfully created. Please click on the below link to verify your account " +link ;

        this.customerService.SendEmail(FromEmail, recipient, subject, message)
            .subscribe(rsp => {
                console.log(rsp);
                console.log("a verification email was sent");
                window.alert("Registration successfully done. Account activation link has been sent to your email id : " + this.GetAllDitailes.Email +
            "you first need to click the link and you can login");
            },
            (err) => {
                console.log("error : " + err);
            window.alert("Registration successfully done. Account activation link has been sent to your email id : " + this.GetAllDitailes.Email +
            "you first need to click the link and you can login");
            });
    }

    routeToFramework() {
        this.router.navigate(['/login']);
    }


    apiUrl: any;
    formData: FormData = new FormData();
    options: any;
    file: File;
    path = "C:\\Users\\user\\Desktop\\rar_Angular\\Yesterday_project_14_9_2017\\final_project_in_angular_8_9_17\\src\\img\\CustomersProfile\\";

    fileChange(event: any) {
        debugger;
        let fileList: FileList = event.target.files;
        this.readFiles(fileList);
        if (fileList.length > 0) {
            this.path = "C:\\Users\\user\\Desktop\\rar_Angular\\Yesterday_project_14_9_2017\\final_project_in_angular_8_9_17\\src\\img\\CustomersProfile\\";
            this.file = fileList[0];
            this.formData.append('uploadFile', this.file, "CustomersProfile\\" + this.file.name);
            let headers = new Headers();
            this.options = new RequestOptions({ headers: headers });
            this.apiUrl = "http://localhost:64755/api/UploadFile";
            this.path += this.file.name;
            console.log(this.path);
        }
        //window.location.reload();
    }

    uploadFileToFolder() {
        this.http.post(this.apiUrl, this.formData, this.options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            data => console.log('success'),
            error => console.log(error)
            )
        this.routeToFramework();
    }



    path1 = '';
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    ProfileImg: any;

    readFile(file: any, reader: any, callback: any) {
        reader.onload = () => {
            callback(reader.result);
            this.ProfileImg = reader.result;
            console.log(reader.result);
        }
        reader.readAsDataURL(file);
    }
    readFiles(files: any, index = 0) {
        // Create the file reader  
        let reader = new FileReader();
        // If there is a file  
        if (index in files) {
            // Start reading this file  
            this.readFile(files[index], reader, (result: any) => {
                // Create an img element and add the image file data to it  
                var img = document.createElement("img");
                img.src = result;
                // Send this img to the resize function (and wait for callback)  
                this.resize(img, 250, 250, (resized_jpeg: any, before: any, after: any) => {
                    // For debugging (size in bytes before and after)  
                    this.debug_size_before.push(before);
                    this.debug_size_after.push(after);
                    // Add the resized jpeg img source to a list for preview  
                    // This is also the file you want to upload. (either as a  
                    // base64 string or img.src = resized_jpeg if you prefer a file).  
                    this.file_srcs.push(resized_jpeg);
                    // Read the next file;  
                    this.readFiles(files, index + 1);
                });
            });
        } else {
            // When all files are done This forces a change detection  
            this.changeDetectorRef.detectChanges();
        }
    }
    resize(img: any, MAX_WIDTH: number, MAX_HEIGHT: number, callback: any) {
        // This will wait until the img is loaded before calling this function  
        return img.onload = () => {
            // Get the images current width and height  
            var width = img.width;
            var height = img.height;
            // Set the WxH to fit the Max values (but maintain proportions)  
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            // create a canvas object  
            var canvas = document.createElement("canvas");
            // Set the canvas to the new calculated dimensions  
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            // Get this encoded as a jpeg  
            // IMPORTANT: 'jpeg' NOT 'jpg'  
            var dataUrl = canvas.toDataURL('image/jpeg');
            // callback with the results  
            callback(dataUrl, img.src.length, dataUrl.length);
        };
    }
}