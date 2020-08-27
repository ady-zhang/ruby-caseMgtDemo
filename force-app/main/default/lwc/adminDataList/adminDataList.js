import { LightningElement, track, wire } from "lwc";
import Utils from "c/utils";
import Consts from "c/consts";
import { refreshApex } from "@salesforce/apex";
import { NavigationMixin } from "lightning/navigation";
//import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import getAdminDataList from "@salesforce/apex/AdminDataService.getAdminDataList";

export default class AdminDataList extends NavigationMixin(LightningElement) {
  title = "Admin Data List";
  acMasterId = Consts.KEYN;
  inputedAdminCode = "";
  inputedDescription = "";
  selectedAdminCodeId = "";

  handleFilterChange(event) {
    this.inputedAdminCode = event.detail.adminCode;
    this.inputedDescription = event.detail.description;
  }

  error;
  loading = true;
  _wiredStudentResult;
  columnsList = Consts.ad_list_columnConfig();
  @track dataList = [];
  @wire(getAdminDataList, {
    adminCode: "$inputedAdminCode",
    description: "$inputedDescription"
  })
  wired_getAdminDataList(result) {
    this.loading = true;
    this._wiredStudentResult = result;
    this.dataList = Consts.ad_list_testDataList();
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

  onEdit() {
    debugger;
    let ids = this.getSelectedIDs();
    console.log(ids);
    if (ids.length > 0) {
      let recordId = ids[0];
      Utils.showModal(
        this,
        "Not Available",
        "The delete row function is not available."
      );
      // Opens the Admin Data record modal to view a particular record.
      /*  let pageInfo = {
        type: "standard__recordPage",
        attributes: {
          recordId: recordId,
          objectApiName: "Cms_Admin_Data__c", // objectApiName is optional
          actionName: "edit"
        }
      };
      console.log(pageInfo);
      this[NavigationMixin.Navigate](pageInfo);
    */
    } else {
      Utils.showAlert("Please select a record first!");
    }
  }

  onNew() {
    // Opens the new Admin Data record modal dialog with the Admin Data Marter = 'KEYN'
    /*
        let pageInfo = {
          type: "standard__objectPage",
          attributes: {
            objectApiName: "Cms_Admin_Data__c",
            actionName: "new"
          },
          state: {
            defaultFieldValues: encodeDefaultFieldValues({
              Admin_Code_Master__c: this.acMasterId
            })
          }
        };
        this[NavigationMixin.Navigate](pageInfo);
    */
    const dialog = this.template.querySelector('c-admin-data-creation-dialog');
    dialog.show();

  }

  btnGroupDisabled = true;
  onRowSelection(event) {
    let numSelected = event.detail.selectedRows.length;
    this.btnGroupDisabled = numSelected === 0;
  }

  getSelectedIDs() {
    let datatable = this.template.querySelector("lightning-datatable");
    let selectedRows = datatable.getSelectedRows();
    console.log("selectedRows", selectedRows);
    let ids = [];
    selectedRows.forEach((r) => {
      ids.push(r.Id);
    });
    return ids;
  }
}