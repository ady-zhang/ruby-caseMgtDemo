import { LightningElement, api } from "lwc";

const HIDDEN_CLASS = 'layout-hidden';

export default class AdminDataFilterForm extends LightningElement {
  title = "Filter Admin Data";
  @api acMaster;
  adminCode = "";
  description = "";

  onAdminCodeChange(event) {
    this.adminCode = event.target.value;
    this.triggerFilterChange();
  }

  onDescriptionChange(event) {
    this.description = event.target.value;
    this.triggerFilterChange();
  }

  triggerFilterChange() {
    const event = new CustomEvent("filterchange", {
      detail: {
        adminCode: this.adminCode,
        description: this.description
      }
    });
    this.dispatchEvent(event);
  }

  handleReset() {
    this.adminCode = "";
    this.description = "";
    this.triggerFilterChange();
  }

  /** Open or Close function */
  hiddenLayout = true;
  iconTitle = 'Close';
  iconName = 'utility:jump_to_top';
  handleIconAction() {
    const layoutEl = this.template.querySelector("lightning-layout");
    if (this.hiddenLayout) {
      layoutEl.classList.add(HIDDEN_CLASS);
      this.iconTitle = 'Open';
      this.iconName = 'utility:jump_to_bottom';
    } else {
      layoutEl.classList.remove(HIDDEN_CLASS);
      this.iconTitle = 'Close';
      this.iconName = 'utility:jump_to_top';
    }
    this.hiddenLayout = !this.hiddenLayout;
  }

}
