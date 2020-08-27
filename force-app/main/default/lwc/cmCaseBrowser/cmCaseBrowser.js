import { LightningElement } from "lwc";

export default class CmCaseBrowser extends LightningElement {
  modalHeader = "";
  modalContent = "";
  handleShowModal(event) {
    this.modalHeader = event.detail.header;
    this.modalContent = event.detail.content;
    const modal = this.template.querySelector("c-modal");
    modal.show();
  }

  closeModal() {
    const modal = this.template.querySelector("c-modal");
    modal.hide();
  }

  filterMap = {};
  handleFilterChange(event) {
    this.filterMap = event.detail;
  }

  newMode = false;
  listMode = true;
  handleTriggerAction(event) {
    if(true === event.detail.newMode) {
      this.newMode = true;
      this.listMode = false;
    }
  }
}
