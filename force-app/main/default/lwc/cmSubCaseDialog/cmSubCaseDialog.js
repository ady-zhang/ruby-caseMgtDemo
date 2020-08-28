import { LightningElement, api } from 'lwc';
import Utils from 'c/utils';

const HIDDEN_CLASS = "modal-hidden";

export default class CmSubCaseDialog extends LightningElement {
    divClass = HIDDEN_CLASS;

    @api inCaseNum;
    @api inSubCaseNum;


    @api show() {
        const outerDivEl = this.template.querySelector("div");
        outerDivEl.classList.remove(HIDDEN_CLASS);
    }

    @api hide() {
        const outerDivEl = this.template.querySelector("div");
        outerDivEl.classList.add(HIDDEN_CLASS);
    }

    handleClose() {
        this.hide();
    }

    handleReset() {
        Utils.showAlert('handleReset...');
    }

    handleSave() {
        Utils.showAlert('handleSave...');
    }

}