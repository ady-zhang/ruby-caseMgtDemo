import { LightningElement, api, track, wire } from "lwc";
import Utils from "c/utils";
import { refreshApex } from "@salesforce/apex";
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import getAdminDataChildren from "@salesforce/apex/AdminDataService.getAdminDataChildren";

const columnConfig = [
  {
    label: "Admin Code Master",
    fieldName: "Admin_Code_Master",
    type: "text"
  },
  {
    label: "Admin Code",
    fieldName: "Admin_Code",
    type: "text"
  },
  {
    label: "Description(English)",
    fieldName: "Description_En",
    type: "text"
  },
  {
    label: "Description(Traditional Chinese)",
    fieldName: "Description_Tc",
    type: "text"
  },
  {
    label: "Description(Simplified Chinese)",
    fieldName: "Description_Sc",
    type: "text"
  },
  {
    label: "Admin Code Filtering",
    fieldName: "Admin_Code_Filtering",
    type: "text"
  },
  {
    label: "Admin Code Mapping",
    fieldName: "Admin_Code_Mapping",
    type: "text"
  },
  {
    label: "Delete Indicate",
    fieldName: "Delete_Indicate",
    type: "text"
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: [{ label: "Delete", name: "delete" }]
    }
  }
];

const testDataList = [
  {
    Id: "10001",
    Admin_Code_Master: "50",
    Admin_Code: "10",
    Description_En: "Charges Dispute",
    Description_Tc: "收費爭議",
    Description_Sc: "收费争议",
    Admin_Code_Filtering: "MOB",
    Admin_Code_Mapping: "",
    Delete_Indicate: "N"
  },
  {
    Id: "10002",
    Admin_Code_Master: "50",
    Admin_Code: "11",
    Description_En: "Bill Adjustment",
    Description_Tc: "Bill Adjustment",
    Description_Sc: "Bill Adjustment",
    Admin_Code_Filtering: "MOB",
    Admin_Code_Mapping: "",
    Delete_Indicate: "N"
  },
  {
    Id: "10003",
    Admin_Code_Master: "50",
    Admin_Code: "20",
    Description_En: "General Complaint",
    Description_Tc: "基本投訴",
    Description_Sc: "基本投诉",
    Admin_Code_Filtering: "MOB",
    Admin_Code_Mapping: "",
    Delete_Indicate: "N"
  },
  {
    Id: "10004",
    Admin_Code_Master: "50",
    Admin_Code: "30",
    Description_En: "Network Complaint",
    Description_Tc: "網络投訴",
    Description_Sc: "网络投诉",
    Admin_Code_Filtering: "MOB,MVNO",
    Admin_Code_Mapping: "",
    Delete_Indicate: "N"
  }
];

export default class AdminDataChildren extends NavigationMixin(
  LightningElement
) {
  @api acMasterId = "10";
  title = "Admin Data List";
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
  columnsList = columnConfig;
  @track dataList = [];
  @wire(getAdminDataChildren, {
    adminCode: "$inputedAdminCode",
    description: "$inputedDescription"
  })
  wired_getAdminDataChildren(result) {
    this.loading = true;
    this._wiredStudentResult = result;
    this.dataList = testDataList;
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
  }

  btnGroupDisabled = true;
  onRowSelection(event) {
    let numSelected = event.detail.selectedRows.length;
    this.btnGroupDisabled = numSelected === 0;
  }

  getSelectedIDs() {
    let datatable = this.template.querySelector("lightning-datatable");
    let selectedRows = datatable.getSelectedRows();
    let ids = [];
    selectedRows.forEach((r) => {
      ids.push(r.Id);
    });
    return ids;
  }
}