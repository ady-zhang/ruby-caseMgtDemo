import { LightningElement, api } from 'lwc';
import Utils from 'c/utils';

const HIDDEN_CLASS = "modal-hidden";

export default class CmSubCaseCreation extends LightningElement {
    divClass = HIDDEN_CLASS;
    hasHeaderString = false;

    @api
    set caseNum(value) {
        this.hasHeaderString = value !== "";
        this._headerPrivate = value;
    }
    get caseNum() {
        return this._headerPrivate;
    }

    @api show() {
        const outerDivEl = this.template.querySelector("div");
        outerDivEl.classList.remove(HIDDEN_CLASS);
    }

    @api hide() {
        const outerDivEl = this.template.querySelector("div");
        outerDivEl.classList.add(HIDDEN_CLASS);
    }

    handleDialogClose() {
        this.hide();
    }

    handleReset() {
        Utils.showAlert('handleReset...');
    }

    handleSave() {
        Utils.showAlert('handleSave...');
    }

    handleSlotTaglineChange() {
        const taglineEl = this.template.querySelector("p");
        taglineEl.classList.remove(HIDDEN_CLASS);
    }

    handleSlotFooterChange() {
        const footerEl = this.template.querySelector("footer");
        footerEl.classList.remove(HIDDEN_CLASS);
    }

}