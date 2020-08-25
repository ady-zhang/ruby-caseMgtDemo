import { LightningElement } from "lwc";
import Utils from "c/utils";
import Consts from "c/consts";

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
        //this.showSubCase();
        Utils.showModal(
            this,
            "Not Available",
            "The delete row function is not available."
        );
    }

    onSaveSubCase() {
        Utils.showAlert("onSave...");
    }


    /** Open or Close function */
    hiddenLayout = true;
    iconTitle = 'Close';
    iconName = Consts.OFF_ICON_NAME;
    handleIconAction() {
        const layoutEl = this.template.querySelector("c-case-creation-form");
        if (this.hiddenLayout) {
            layoutEl.classList.add(Consts.CSS_HIDDEN);
            this.iconName = Consts.ON_ICON_NAME;
            this.iconTitle = 'Open';
        } else {
            layoutEl.classList.remove(Consts.CSS_HIDDEN);
            this.iconName = Consts.OFF_ICON_NAME;
            this.iconTitle = 'Close';
        }
        this.hiddenLayout = !this.hiddenLayout;
    }

}
