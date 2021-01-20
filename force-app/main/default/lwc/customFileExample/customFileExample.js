import { LightningElement, api } from 'lwc';

export default class CustomFileExample extends LightningElement {

    @api
    myRecordId;

    get acceptedFormats() {
        return ['.pdf', '.png', '.docx', '.xlsx'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        console.log("event: ", event);
        const uploadedFiles = event.detail.files;
        console.log("uploadedFiles: ", uploadedFiles);
        alert("myRecordId = " + this.myRecordId + ", No. of files uploaded : " + uploadedFiles.length);
    }
    
}