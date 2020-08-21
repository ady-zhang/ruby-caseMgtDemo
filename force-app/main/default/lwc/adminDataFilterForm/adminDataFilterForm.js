import { LightningElement, api } from "lwc";

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
}
