import { LightningElement } from "lwc";
import Utils from "c/utils";

export default class CaseCreation extends LightningElement {
    caseTitle = 'Case - Customer Info';
    subCaseTitle = 'Sub Case Info';
    caseNum = '12345';

    dialogType = '';
    handleShowDialog(event) {
        this.dialogType = event.detail.dialogType;
        if ('SUB_CASE' === this.dialogType) {
            this.showSubCase();
        }
    }

    showSubCase() {
        const dialog = this.template.querySelector('c-sub-case-creation');
        dialog.show();
    }

    closeSubCase() {
        const dialog = this.template.querySelector('c-sub-case-creation');
        dialog.hide();
    }

    handleSaveCase(event) {
        this.caseNum = event.detail.caseNum;

    }

    onNewSubCase() {
        Utils.showAlert("onSave...");
        //this.showSubCase();
    }

    onSaveSubCase() {
        Utils.showAlert("onSave...");
    }


}
