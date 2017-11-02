import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from "../../Services/CustomerService/customer.service";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { InterestService } from "../../Services/InterestService/Interest.service";
import { NavbarService } from "../../Services/navBarService/navbar.service";
import { SessionService } from "../../Services/SessionService/session.service";

@Component({
   selector: 'personal-profile',
    styleUrls: [`./PersonalProfile.component.css`],
    templateUrl: `./PersonalProfile.component.html`,
    providers: [InterestService]
})

export class PersonalProfileComponent {
    loading: boolean = false;
    arItems: any;
    arUser: any;
    indexArray: any;

    Name: string;
    Birthday: string;
    Gender: string;
    InterestedInGender: string;/**/
    City: string;
    Area: string;
    Email: string;
    Password: string;
    Phone: string;
    WorkField: string;
    WorkFieldInterest: string;
    Education: string;
    EducationInterest: string;
    Hobbies: string;
    Music: string;
    Movies: string;
    Religion: string;
    PoliticalView: string;
    AboutYou: string;
    Quotes: string;
    Age: number;
    Sport: string;
    Smoking: string;
    MinAgeRangeInterest: number;
    MaxAgeRangeInterest: number;
    UrlImg: string;

    currentCustID: any;

    HobbiesArr: any;
    SportArr: any;
    MusicArr: any;
    Image: string;
  SessionID: string;


    public selectedHobbies: any = [];
    public filteredList: any[];
    public selectedSport: any = [];
    public filteredListSport: any[];
    public selectedSchner: any = [];
    public filteredListSchner: any[];
    toggleUilistHobbies: boolean = false;
    toggleUilistSport: boolean = false;
    toggleUilistSchner: boolean = false;
    strHobbies: string = "";
    strSport: string = "";
    strSchner: string = "";

    Area1 = ["South", "Central", "North", "Lowland"];
    Love1 = ["male", "female"];
    Work1 = ["Additional positions",
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

    Education1 = ["No education",
        "12 school years",
        "Full maturity",
        "high school",
        "BA",
        "Master's degree"];
    Hobbies1 = ["Other",
        "Travel the World", "Cooking",
        "carpentry", "Dance",
        "Collectibles", "Drawing",
        "gardening",
    ];
    MachingHobbies1 = [1, 2, 3, 4];
    Sport1 = ["Other", "Swimming", "running", "exercise", "basketball", "soccer ball",
        "tennis", "judo"];
    Schner1 = ["gas", "Hip-Hop", "disco",
        "pop", "Funk", "rock"];

    Religion1 = ["Other", "Jewish", "Christianity", "Islam", "Hinduism", "Buddhism"];
    Politic1 = ["Other", "Right stream", "Left stream", "Center current"];
    AgeNumber1 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]


    constructor(private customerService: CustomerService,
        private changeDetectorRef: ChangeDetectorRef, private router: Router,
        private http: Http, private InterestedService: InterestService,
        public nav: NavbarService,public sessionService: SessionService,
        private _router:Router) {
console.log(this.update)
        let keyCustId: any = "custID";
        this.currentCustID = this.customerService.getCookie(keyCustId);
        console.log(this.currentCustID);

        this.customerService.Get().subscribe(rsp => {
            if (rsp.status == 200) {
                this.arItems = rsp.json();
                this.customerService.GetOneCustomer(Number(this.currentCustID))
                    .subscribe(rsp => {
                        this.arUser = rsp.json();
                        console.log("=>", this.arUser)
                        this.Image = this.arUser.Image;
                        this.Name = this.arUser.Name
                        this.Birthday = this.arUser.Birthday;
                        this.Gender = this.arUser.Gender;
                        this.InterestedInGender = this.arUser.InterestedInGender;
                        this.City = this.arUser.City;
                        this.Area = this.arUser.Area;
                        this.Email = this.arUser.Email;
                        this.Password = this.arUser.Password;
                        this.Phone = this.arUser.Phone;
                        this.WorkField = this.arUser.WorkField;
                        this.WorkFieldInterest = this.arUser.WorkFieldInterest;
                        this.Education = this.arUser.Education;
                        this.EducationInterest = this.arUser.EducationInterest;
                        this.Movies = this.arUser.Movies;
                        this.Religion = this.arUser.Religion;
                        this.PoliticalView = this.arUser.PoliticalView;
                        this.AboutYou = this.arUser.AboutYou;
                        this.Quotes = this.arUser.Quotes;
                        this.Age = this.arUser.Age;

                        this.Smoking = this.arUser.Smoking;
                        this.MinAgeRangeInterest = this.arUser.MinAgeRangeInterest;
                        this.MaxAgeRangeInterest = this.arUser.MaxAgeRangeInterest;

                        this.selectedHobbies = this.GetStrToArr(this.arUser.Hobbies);
                        this.selectedSport = this.GetStrToArr(this.arUser.Sport);
                        this.selectedSchner = this.GetStrToArr(this.arUser.Music);
                    });
            }
            else { console.log("server responded error : " + rsp); }
        },
            (err) => {
                console.log("error : " + err);
            });

    }


   




    GetStrToArr(str: string) {
        let ArrUserSelect: any[] = str.split(",");
        let index: number = ArrUserSelect.length - 1;
        ArrUserSelect.splice(index, 1);
        return ArrUserSelect;
    }

    update = true;
    UpdateDetails() {
        this.update = !this.update;
    }

    UpdateDetailes() {
        this.strHobbies="";
        this.strSport="";
        this.strSchner="";
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
        this.fileList
        let file = this.Image.split('\\');
        if(file[1]==this.fileList || undefined == this.fileList){
           
        }
        else{
            file[1]=this.fileList[0].name
           
        }
        this.customerService.editCustomer(Number(this.currentCustID), this.Name, this.Age,
            this.Birthday, this.Gender, this.InterestedInGender, this.City, this.Email,
            this.Password, this.Phone, this.WorkField, this.Area, this.MinAgeRangeInterest,
            this.MaxAgeRangeInterest, this.WorkFieldInterest, this.Education,
            this.EducationInterest, this.strHobbies, this.strSchner, this.Movies,
            this.Religion, this.PoliticalView, this.AboutYou, this.Quotes, this.strSport,
            this.Smoking, "CustomersProfile\\" + file[1]).subscribe(rsp => {
                //if (rsp.status == 200) {
                window.alert("Your details have been saved successfully");
                this.uploadFileToFolder();
                this.update = !this.update;
                //} 
                // else { console.log("server responded error : " + rsp); }
            },
            (err) => {
                console.log("error : " + err);
            });
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




    Delete() {
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
          this.DeleteProfile();
          this.customerService.deleteCookie(keySession);
          this.customerService.deleteCookie(keyCustId);
          this.customerService.deleteCookie(keyPrimaryId);
            this._router.navigate(['startDating']);
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


    DeleteProfile(){
        this.customerService.deleteCustomer(Number(this.currentCustID)).
        subscribe(rsp => {
                //this.logout();
                window.alert("your profile have been deleted");
    });
    }


    settings(){
        this.update = false;
    }










    showImg = true;
    apiUrl: any;
    formData: FormData = new FormData();
    options: any;
    file: File;
    path = "C:\\Users\\user\\Desktop\\rar_Angular\\Yesterday_project_14_9_2017\\final_project_in_angular_8_9_17\\src\\img\\CustomersProfile\\";
    fileList:any
    fileChange(event: any) {
        this.showImg = !this.showImg;
        let fileList: FileList = event.target.files;
        this.fileList = fileList;
        this.readFiles(fileList);
        if (fileList.length > 0) {
            this.file = fileList[0];
            this.formData.append('uploadFile', this.file, "CustomersProfile\\" + this.file.name);
            let headers = new Headers();
            this.options = new RequestOptions({ headers: headers });
            this.apiUrl = "http://localhost:64755/api/UploadFile";
            this.path += this.file.name;
            console.log(this.path);
        }
    }

    uploadFileToFolder() {
        this.http.post(this.apiUrl, this.formData, this.options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            data => console.log('success'),
            error => console.log(error)
            )
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
        let reader = new FileReader();
        if (index in files) {
            this.readFile(files[index], reader, (result: any) => {
                var img = document.createElement("img");
                img.src = result;
                this.resize(img, 250, 250, (resized_jpeg: any, before: any, after: any) => {
                    this.debug_size_before.push(before);
                    this.debug_size_after.push(after);
                    this.file_srcs.push(resized_jpeg);
                    this.readFiles(files, index + 1);
                });
            });
        } else {
            this.changeDetectorRef.detectChanges();
        }
    }
    resize(img: any, MAX_WIDTH: number, MAX_HEIGHT: number, callback: any) {
        return img.onload = () => {
            var width = img.width;
            var height = img.height;
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
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            var dataUrl = canvas.toDataURL('image/jpeg');
            callback(dataUrl, img.src.length, dataUrl.length);
        };
    }


}






