import { LightningElement, track } from 'lwc';
import uploadFile from '@salesforce/apex/CallAlfresco.uploadFileToNode';
import downloadFileFromNode from '@salesforce/apex/CallAlfresco.downloadFileFromNode';
// import TestFileInfo from '@salesforce/apex/CallAlfresco.TestFileInfo';
import ImageUrl from '@salesforce/apex/CallAlfresco.ImageUrl';
import TestPrase from '@salesforce/apex/CallAlfresco.TestPrase';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


const columns = [{
    label: 'Title',
    fieldName: 'FileName',
    type: 'url',
    typeAttributes: {
        label: {
            fieldName: 'Title'
        },
        target: '_blank'
    }
}];

export default class CustomFileUploader extends NavigationMixin(LightningElement) {
    showLoadingSpinner = false;
    @track fileNames = '';
    @track filesUploaded = [];
    @track data;
    @track columns = columns;

    handleFileChanges(event) {
        this.filesUploaded = [];
        let files = event.target.files;

        if (files.length > 0) {
            let filesName = '';

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                filesName = filesName + file.name + ','
                let freader = new FileReader();
                freader.onload = f => {
                    let base64 = 'base64,';
                    console.log("freader: ", freader);
                    console.log("freader.result: ", freader.result);
                    let content = freader.result.indexOf(base64) + base64.length;
                    let fileContents = freader.result.substring(content);
                    this.filesUploaded.push({
                        Title: file.name,
                        VersionData: fileContents //,
                        // File: file
                    });
                    console.log("file: ", file);
                    console.log("content: ", content);
                    console.log("fileContents: ", fileContents);
                };
                freader.readAsDataURL(file);
                console.log("filesUploaded: ", this.filesUploaded);
            }
            this.fileNames = filesName.slice(0, -1);
        }
    }

    handleSaveFiles() {
        if (this.filesUploaded.length <= 0) {
            const showError = new ShowToastEvent({
                title: 'Error!!',
                message: 'Please select the uploaded file.',
                variant: 'error',
            });
            this.dispatchEvent(showError);
        } else {
            this.showLoadingSpinner = true;
            uploadFile({ filesToInsert: this.filesUploaded })
                .then(data => {
                    this.showLoadingSpinner = false;
                    const showSuccess = new ShowToastEvent({
                        title: 'Success!!',
                        message: this.fileNames + ' files uploaded successfully.',
                        variant: 'Success',
                    });
                    this.dispatchEvent(showSuccess);
                    this.getFilesData(JSON.parse(data));
                    this.filesUploaded = [];
                    this.fileNames = undefined;
                })
                .catch(error => {
                    this.showLoadingSpinner = false;
                    this.filesUploaded = [];
                    this.fileNames = '';
                    console.log('error:' + error.body);
                    const showError = new ShowToastEvent({
                        title: 'Error!!',
                        // message: 'An Error occur while uploading the file.',
                        message: error.body,
                        variant: 'error',
                    });
                    this.dispatchEvent(showError);
                });
        }

    }

    // getFilesData(lstIds) {
    //     console.log('file data+' + JSON.stringify(lstIds));
    //     getFiles({lstFileIds: lstIds})
    //     .then(data => {
    //         data.forEach((record) => {
    //             record.FileName = '/' + record.Id;
    //         });
    //         this.data = data;
    //     })
    //     .catch(error => {
    //         window.console.log('error ====> ' + error);
    //     })
    // }

    // display the upload file for download
    getFilesData(data) {
        const target = this.template.querySelector('a.attacheResoure');
        target.setAttribute('data-id', data.entry.id);
        target.setAttribute('data-name', data.entry.name);
        target.innerText = data.entry.name;
    }

    downloadFile(fileName, blob) {
        const anchor = this.template.querySelector('a.downloadResoure');
        // 创建指向blob对象地址
        const src = window.URL.createObjectURL(blob);
        anchor.download = fileName;
        anchor.href = src;
        anchor.click();
    }

    downloadImg(event) {
        var id = "79cf15ca-b0ff-4db9-9f5a-3c215f975584";
        var name = "Ruby_400-Soln Arch & HL Tech Guide (Part 2b - Reusable - Workflow-DMS-DAM-CMS) v0.28 20200709.docx";
        // var id = event.target.dataset.id;
        // var name = event.target.dataset.name;
        downloadFileFromNode({ nodeId: id })
            .then(blob => {
                //console.log('Blob:'+ JSON.stringify(blob));
                // 获取到blob对象
                //var export_blob = new Blob([blob],{type:"image/png;charset=UTF-8"});
                var export_blob = this.dataURLtoBlob(blob);
                this.downloadFile(name, export_blob);
            }).catch(error => {
                console.log("failed. cause:", error);
            })
    }

    dataURLtoBlob(base64Str) {
        var bstr = atob(base64Str), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr]);
    }


    // OriginalTest(event){
    //     alert('aaaa');
    //     let files = event.target.files;
    // }

    FileInfo() {
        TestPrase()
            .then(blob => {
                console.log('TestFileInfo:' + blob);
            }).catch(error => {
                console.log("failed. cause:", error);
            })
    }

    getImageUrl(){
        alert('aaa');
        ImageUrl()
        .then(url => {
            console.log('reuslt:'+ url);
            const target = this.template.querySelector('img.imageShow');
            target.setAttribute('src', url);
        }).catch(error => {
            console.log("failed. cause:", error);
        })        
    }

    // testAlfresco(){
    //     var xhr = new XMLHttpRequest();
    //     var url = "https://0024frthva.execute-api.ap-east-1.amazonaws.com/sita/alfresco/api/-default-/public/alfresco/versions/1/nodes/9bfc30f7-24bd-4150-895e-66eaa5dabfd6/children?skipCount=0&maxItems=100&alf_ticket=TICKET_f1ed032a5d1baf1d4cb8c65fca7ff75a9fe2056c";
    //     xhr.open("GET", url);
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //     xhr.setRequestHeader("Accept", "application/json");
    //     xhr.onreadystatechange = function () {
    //         console.log(JSON.stringify(xhr));
    //         if (xhr.readyState === 4 && xhr.status === 200) {
    //             var json = JSON.parse(xhr.responseText);
    //             console.log(json);
    //         }
    //     };
    //     // var data = JSON.stringify({
    //     //       "userId": "rubypoc", 
    //     //       "password": "Rubypoc2020"
    //     //     }
    //     // );
    //     xhr.send(data);
    // }


     // Making Callout using Fetch
     testAlfresco() {
        fetch('https://0024frthva.execute-api.ap-east-1.amazonaws.com/sita/alfresco/api/-default-/public/alfresco/versions/1/nodes/9bfc30f7-24bd-4150-895e-66eaa5dabfd6/children?skipCount=0&maxItems=100&alf_ticket=TICKET_f1ed032a5d1baf1d4cb8c65fca7ff75a9fe2056c', // End point URL
        {
            // Request type
            method:"GET",
            headers:{
                // content type
                "Content-Type": "application/json",
                // adding your access token 
                //"Authorization": "OAuth 00DB0000000EfVQ!AQwAQEiiynMU2EsBcS2PhXSQ6KQTTG.Zr0hlDHTFcGcAPqKQOBNDB0rwyASZK44fqIAVe6GrVNZPsAWJ6iqXLNBfSQ.dqvW1",
            }
        })
        .then((response) => {
           // return response.json(); // returning the response in the form of JSON
           console.log(response.json());
        })
        .catch(error => {
            window.console.log('callout error ===> '+JSON.stringify(error));
        })
    } 

    // uploadFiles(event){
    //     console.log('aaa');
    //     let files = event.target.files;
    // }

}