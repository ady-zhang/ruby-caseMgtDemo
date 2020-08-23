import { LightningElement, api } from 'lwc';
import { Utils } from 'c/utils';

export default class CaseCreationForm extends LightningElement {
    @api inCaseNum;

    caseNum;

    onSave() {
        console.log(this.caseNum);
        this.caseNum = '123456';
        const evt = new CustomEvent('savecase', {
            detail: {
                caseNum: this.caseNum
            }
        });
        this.dispatchEvent(evt);

        Utils.showAlert("onSave...");
    }
}