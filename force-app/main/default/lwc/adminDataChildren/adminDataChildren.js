import { LightningElement, api, track, wire } from "lwc";
import Utils from "c/utils";
import Consts from "c/consts";
import { refreshApex } from "@salesforce/apex";
import { NavigationMixin } from "lightning/navigation";
import getAdminDataChildren from "@salesforce/apex/AdminDataService.getAdminDataChildren";

export default class AdminDataChildren extends NavigationMixin(
  LightningElement
) {
  method = Consts.ADD;
  @api acMaster = "10";
  title = "Admin Data List";
  inputedAdminCode = "";
  inputedDescription = "";
  selectedAdminCode = "";
  selectedAcMaster = "";

  handleFilterChange(event) {
    this.inputedAdminCode = event.detail.adminCode;
    this.inputedDescription = event.detail.description;
  }

  error;
  loading = true;
  _wiredStudentResult;
  columnsList = Consts.ad_children_columnConfig();
  @track dataList = [];
  @wire(getAdminDataChildren, {
    adminCode: "$inputedAdminCode",
    description: "$inputedDescription"
  })
  wired_getAdminDataChildren(result) {
    this.loading = true;
    this._wiredStudentResult = result;
    this.dataList = Consts.ad_children_testDataList();
    if (result.data) {
      console.log("result.data:", result.data);
    } else if (result.error) {
      this.error = result.error;
    }
    /* eslint-disable */
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  defaultSortDirection = "asc";
  sortDirection = "asc";
  sortedBy;
  onHandleSort(event) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    const cloneData = [...this.data];
    //TODO...

    this.data = cloneData;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "delete":
        this.deleteRow(row);
        break;
      default:
    }
  }

  deleteRow(row) {
    console.log(row);
    Utils.showModal(
      this,
      "Not Available",
      "The delete row function is not available."
    );
    //promise is resolved
    refreshApex(this._wiredStudentResult);
  }

  handleAdminCodeSelected(event) {
    this.selectedAdminCodeId = event.detail.id;
  }

  onRefresh() {
    this.loading = true;
    //promise is resolved
    refreshApex(this._wiredStudentResult);
    /* eslint-disable */
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  onNew() {
    this.method = Consts.ADD;
    this.selectedAcMaster = this.acMaster;
    this.selectedAdminCode = '';

    this.showCreationDialog();
  }

  onEdit() {
    this.method = Consts.EDIT;

    let dataList = this.getSelectedDataList();
    if (dataList.length > 0) {
      let data = dataList[0];
      this.selectedAcMaster = data.Admin_Code_Master;
      this.selectedAdminCode = data.Admin_Code;

      this.showCreationDialog();
    } else {
      Utils.showToast(this, "Warning", "Please select a record first!", "warning");
    }
  }

  onDelete() {
    this.method = Consts.DELETE;

    let dataList = this.getSelectedDataList();
    if (dataList.length > 0) {
      Utils.showToast(this, "Warning", "The delete row function is not available.", "warning");
    } else {
      Utils.showToast(this, "Warning", "Please select a record first!", "warning");
    }
    //promise is resolved
    refreshApex(this._wiredStudentResult);
  }

  showCreationDialog() {
    const dialog = this.template.querySelector('c-admin-data-dialog');
    dialog.show();
  }


  btnGroupDisabled = true;
  onRowSelection(event) {
    let numSelected = event.detail.selectedRows.length;
    this.btnGroupDisabled = numSelected === 0;
  }

  getSelectedDataList() {
    let datatable = this.template.querySelector("lightning-datatable");
    let selectedRows = datatable.getSelectedRows();
    console.log("selectedRows", selectedRows);
    return selectedRows;
  }
}
