import { LightningElement, api } from "lwc";

const HIDDEN_CLASS = "modal-hidden";

export default class Modal extends LightningElement {
  divClass = HIDDEN_CLASS;

  @api
  set header(value) {
    this.hasHeaderString = value !== "";
    this._headerPrivate = value;
  }
  get header() {
    return this._headerPrivate;
  }

  hasHeaderString = false;
  _headerPrivate;

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

  handleSlotTaglineChange() {
    const taglineEl = this.template.querySelector("p");
    taglineEl.classList.remove(HIDDEN_CLASS);
  }

  handleSlotFooterChange() {
    const footerEl = this.template.querySelector("footer");
    footerEl.classList.remove(HIDDEN_CLASS);
  }
}
