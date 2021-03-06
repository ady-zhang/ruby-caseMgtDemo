import { LightningElement, api } from 'lwc';

const HIDDEN_CLASS = "modal-hidden";

export default class CmTaskDialog extends LightningElement {
    divClass = HIDDEN_CLASS;

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