import { LightningElement } from "lwc";
import Utils from "c/utils";
import Consts from "c/consts";

export default class CmCaseCreation extends LightningElement {
    caseTitle = 'Case - Customer Info';
    subCaseTitle = 'Sub Case Info';
    caseNum = '12345';
    ubCaseNum = '';

    dialogType = '';
    handleShowDialog(event) {
        this.dialogType = event.detail.dialogType;
        if ('SUB_CASE' === this.dialogType) {
            this.showSubCase();
        }
    }

    showSubCase() {
        this.subCaseNum = '00';
        const dialog = this.template.querySelector('c-cm-sub-case-creation-dialog');
        dialog.show();
    }

    closeSubCase() {
        const dialog = this.template.querySelector('c-cm-sub-case-creation-dialog');
        dialog.hide();
    }

    handleSaveCase(event) {
        this.caseNum = event.detail.caseNum;

    }

    onNewSubCase() {
        this.showSubCase();
    }

    onSaveSubCase() {
        Utils.showAlert("onSave...");
    }


    /** Open or Close function */
    hiddenLayout = true;
    iconTitle = 'Close';
    iconName = Consts.OFF_ICON_NAME;
    handleIconAction() {
        const layoutEl = this.template.querySelector("c-cm-case-creation-form");
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
