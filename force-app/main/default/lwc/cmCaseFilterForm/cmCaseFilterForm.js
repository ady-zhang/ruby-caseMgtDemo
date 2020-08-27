import { LightningElement, track } from "lwc";
import Utils from "c/utils";
import Consts from "c/consts";
//import STATUS_OPEN from '@salesforce/label/c.STATUS_OPEN';


export default class CmCaseFilterForm extends LightningElement {
  name = "Filter Cases";
  error;
  @track lobs = [
    { label: "Mobile", value: "MOB" },
    { label: "Tap & Go", value: "TAPGO" },
    { label: "Club", value: "CLUB" },
    { label: "HMS", value: "HMS" }
  ];
  @track caseTypes = [
    { label: "Charges Dispute", value: "10" },
    { label: "Bill Adjustment", value: "11" },
    { label: "General Complaint", value: "20" },
    { label: "Network Complaint", value: "30" }
  ];
  @track caseSubTypes = [
    { label: "Network Complaint", value: "10" },
    { label: "Bill Adjustment", value: "11" },
    { label: "Bulk Adjustment", value: "12" },
    { label: "Network Incident", value: "30" }
  ];
  @track caseStatuses = [
    { label: "New", value: "new" },
    { label: "Open", value: "open" },
    { label: "In Progress", value: "inProgress" },
    { label: "Close", value: "close" }
  ];
  lob = "";
  caseType = "";
  caseSubType = "";
  caseNum = "";
  accountNum = "";
  mobileNum = "";
  customerNum = "";
  customerName = "";
  caseStatus = "";
  createStaffNum = "";
  createDateFrom;
  createDateTo;
  closeDateFrom;
  closeDateTo;

  triggerFilterChange() {
    const event = new CustomEvent("filterchange", {
      detail: {
        lob: this.lob,
        caseType: this.caseType,
        caseSubType: this.caseSubType,
        caseNum: this.caseNum,
        accountNum: this.accountNum,
        mobileNum: this.mobileNum,
        customerNum: this.customerNum,
        customerName: this.customerName,
        caseStatus: this.caseStatus,
        createStaffNum: this.createStaffNum,
        createDateFrom: this.createDateFrom,
        createDateTo: this.createDateTo,
        closeDateFrom: this.closeDateFrom,
        closeDateTo: this.closeDateTo
      }
    });
    this.dispatchEvent(event);
  }

  handleReset() {
    //TODO
    Utils.showModal(
      this,
      "Not Available",
      "The delete row function is not available."
    );
    this.triggerFilterChange();
  }

  onChange(event) {
    const name = event.target.getAttribute("name");
    switch (name) {
      case "lob":
        this.onLobChange(event);
        break;
      case "caseType":
        this.onCaseTypeChange(event);
        break;
      case "caseSubType":
        this.onCaseSubTypeChange(event);
        break;

      default:
        break;
    }
    this.triggerFilterChange();
  }

  onLobChange(event) {
    console.log(event);
  }

  onCaseTypeChange(event) {
    console.log(event);
  }

  onCaseSubTypeChange(event) {
    console.log(event);
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
