import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CustomerService } from "../../Services/CustomerService/customer.service";
import { SuccessStoriesService } from "../../Services/SuccessStoriesService/SuccessStories.service";
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";


@Component({
    selector: 'stories',
    styleUrls: [`./stories.component.css`],
    templateUrl: `./stories.component.html`,
})

export class StoriesComponent {

    loading: boolean = false;
    arUsers: any[];
    private msgEdit: any;
    private msgAdd: any;
    arStories: any[];
    Cust2: any[];
    Cust1: any[];

    private boolmsgEdit = false;
    private boolmsgAdd = false;
    boolAddStory: boolean = false;
    boolEditStory: boolean = false;
    boolStoriesTable: boolean = true;
    boolImgRemoved: boolean = false;

    private storyToEdit: any;
    private storyId: number;
    private story: any;

    private firstCustId: number;
    private secondCustId: number;
    private firstCustName: string;
    private secondCustName: string;
    private longStory: string;
    private shortStory: string;
    private cities: string;
    private image: string;
    Massage:string;


    //constructor-------------------------------------------------------------------------
    constructor(private custService: CustomerService, private storiesService: SuccessStoriesService,
        private changeDetectorRef: ChangeDetectorRef, private http: Http, private router: Router) {
        this.loading = true;

        // let keySession: any = "sessionID";
        // let SessionID = this.custService.getCookie(keySession);
        // console.log("The session string is:");
        // console.log(SessionID);

        // this.custService.Get().subscribe(res => {
        //     this.arUsers = res.json();
        //     console.log(this.arUsers);
        //     this.loading = false;
        // },
        //     (err) => {
        //         console.log("error : " + err);
        //         this.loading = false;
        //     });

        // this.storiesService.Get(SessionID).subscribe(rsp => {
        //     this.arStories = rsp.json();
        // },
        //     (err) => {
        //         if (err._body == { "Message": "Your session expierd" }) {
        //             console.log(err._body);
        //             let keyCustId: any = "custID";
        //             let keyPrimaryId: any = "sessionPrimaryID";
        //             this.custService.deleteCookie(keySession);
        //             this.custService.deleteCookie(keyCustId);
        //             this.custService.deleteCookie(keyPrimaryId);
        //         }
        //     });

        this.storiesService.GetForAdmin().subscribe(rsp => {
            this.arStories = rsp.json();
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


    //Add a story------------------------------------------------------------------------------------------------

    AddStory(trvForm:any) {
        if (trvForm.valid) {

            console.log(this.firstCustId, this.secondCustId, this.firstCustName, this.secondCustName,
                this.longStory, this.shortStory, this.cities,this.fileList.name );
                window.alert(this.fileList);
                console.log(this.fileList)
            this.storiesService.addSuccessStory(this.firstCustId, this.secondCustId,
                this.firstCustName, this.secondCustName, this.cities, this.longStory, this.shortStory, this.fileList[0].name).subscribe(response => {

                    this.msgAdd = response;

                    if (this.msgAdd == 'This request has failed') {
                        this.boolmsgAdd = true;
                        return this.msgAdd;
                    }
                    else {
                        /*window.alert('The success story added succefully');*/
                        this.Massage = 'The success story added succefully';
                        console.log(this.arStories);
                        this.boolAddStory = !this.boolAddStory;
                        this.boolmsgAdd = false;
                    }
                },
                (err) => {
                    console.log("error : " + err);
                    window.alert(JSON.stringify(err));
                });
        }
    }


    //Edit a story-------------------------------------------------------------------------------------------------
    EditStory(myNgForm: any) {

        if (myNgForm.valid) {

            console.log(this.firstCustId, this.secondCustId, this.firstCustName, this.secondCustName,
                this.longStory, this.shortStory, this.cities, this.image);

            this.storiesService.editSuccessStory(this.storyId, this.firstCustId, this.secondCustId,
                this.firstCustName, this.secondCustName, this.cities, this.longStory, this.shortStory, this.image).subscribe(response => {

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
                        this.uploadFileToFolder();
                        window.alert('The story Editing was successful');
                         this.Massage = 'The story Editing was successful';
                        console.log(this.arStories);
                        this.boolEditStory = !this.boolEditStory;
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

    //Get story To Delete
    GetStoryToDelete(story: any) {
        this.story = story;
    }

    //Delete the story
    DeleteStoryHandler() {

        console.log(this.story);

        this.storiesService.deleteSuccessStory(this.story).subscribe(response => {

            window.alert('The story was deleted');

            let index = this.arStories.indexOf(this.story);
            this.arStories.splice(index, 1);
            console.log(this.arStories);
        },
            (err) => {
                console.log('error : ' + err);
                window.alert(JSON.stringify(err));
            });
    }


    //show the add story form
    AddAddStoryForm() {
        this.boolAddStory = !this.boolAddStory;
        this.storyId = null;
        this.firstCustId = null;
        this.secondCustId = null;
        this.firstCustName = "";
        this.secondCustName = "";
        this.longStory = "";
        this.shortStory = "";
        this.cities = "";
        this.image = "";
    }

    //show the edit story form With fields filled by story information
    AddEditStoryForm(story: any) {
        this.boolEditStory = !this.boolEditStory;
        this.storyToEdit = story;
        this.storyId = story.Id;
        this.firstCustId = story.CustomerIdFirst;
        this.secondCustId = story.CustomerIdSecond;
        this.firstCustName = story.FirstCustomerName;
        this.secondCustName = story.SecondCustomerName;
        this.longStory = story.Story;
        this.shortStory = story.ShortStory;
        this.cities = story.Cities;
        this.image = story.Image;
    }


    routeToFramework() {
        this.router.navigate(['/login']);
    }



    apiUrl: any;
    formData: FormData = new FormData();
    options: any;
    file: File;
    path = "C:\\Users\\יפה בלטה\\Desktop\\27-9-17\\final_project_in_angular_8_9_17\\src\\img\\CustomersProfile\\";
    fileList:any
    fileChange(event: any) {


        let fileList: FileList = event.target.files;
        this.fileList = fileList;
        this.readFiles(fileList);
        if (fileList.length > 0) {
            this.file = fileList[0];
            this.formData.append('uploadFile', this.file, this.file.name);
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