import { Component } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Component({
    selector: 'upload',
    template: `<h2>Upload Files Sample</h2>  
<div class="fileUpload btn btn-primary" *ngIf="isUploadBtn">  
<span>Upload</span>  
<input type="file" id="btnUpload" value="Upload" 
(change)="fileChange($event)" class="upload" />  
</div>  `,
    styles: [
        `
#pgnumber {  
display: none !important;  
}  
.fileUpload {  
position: relative;  
overflow: hidden;  
margin: 10px;  
}  
.fileUpload input.upload {  
position: absolute;  
top: 0;  
right: 0;  
margin: 0;  
padding: 0;  
font-size: 20px;  
cursor: pointer;  
opacity: 0;  
filter: alpha(opacity=0);  
}  
 `
    ]
})
export class UploadComponent {
    private isUploadBtn: boolean = true;
    constructor(private http: Http) {
    }
    //file upload event  
    fileChange(event: any) {
        debugger;
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            let headers = new Headers()
            //headers.append('Content-Type', 'json');  
            //headers.append('Accept', 'application/json');  
            let options = new RequestOptions({ headers: headers });
            let apiUrl1 = "http://localhost:64755/api/UploadFile";
            this.http.post(apiUrl1, formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(
                data => console.log('success'),
                error => console.log(error)
                )
        }
        //window.location.reload();
    }
}