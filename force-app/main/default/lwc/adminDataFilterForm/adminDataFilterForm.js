import { LightningElement, api } from "lwc";
import Consts from "c/consts";

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
  iconName = Consts.OFF_ICON_NAME;
  handleIconAction() {
    const layoutEl = this.template.querySelector("lightning-layout");
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
