import { LightningElement, api } from 'lwc';

const HIDDEN_CLASS = "modal-hidden";

export default class SubCaseCreation extends LightningElement {
    divClass = HIDDEN_CLASS;

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

    handleClose() {
        this.hide();
    }


}