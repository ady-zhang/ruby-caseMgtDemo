import { LightningElement, track, wire } from "lwc";
import Utils from "c/utils";
import Consts from "c/consts";
import { refreshApex } from "@salesforce/apex";
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import getAdminDataList from "@salesforce/apex/AdminDataService.getAdminDataList";

const columnConfig = [
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
    Id: "1001",
    Admin_Code: "50",
    Description_En: "Case Type",
    Description_Tc: "Case Type",
    Description_Sc: "Case Type",
    Admin_Code_Filtering: "LOB",
    Admin_Code_Mapping: "",
    Delete_Indicate: "N"
  },
  {
    Id: "1002",
    Admin_Code: "60",
    Description_En: "Case Sub Type",
    Description_Tc: "Case Sub Type",
    Description_Sc: "Case Sub Type",
    Admin_Code_Filtering: "50",
    Admin_Code_Mapping: "",
    Delete_Indicate: "N"
  },
  {
    Id: "1003",
    Admin_Code: "70",
    Description_En: "Case Nature",
    Description_Tc: "Case Nature",
    Description_Sc: "Case Nature",
    Admin_Code_Filtering: "60",
    Admin_Code_Mapping: "",
    Delete_Indicate: "N"
  },
  {
    Id: "1004",
    Admin_Code: "80",
    Description_En: "Case Sub Nature",
    Description_Tc: "Case Sub Nature",
    Description_Sc: "Case Sub Nature",
    Admin_Code_Filtering: "70",
    Admin_Code_Mapping: "",
    Delete_Indicate: "N"
  }
];

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
  columnsList = columnConfig;
  @track dataList = [];
  @wire(getAdminDataList, {
    adminCode: "$inputedAdminCode",
    description: "$inputedDescription"
  })
  wired_getAdminDataList(result) {
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
    console.log("selectedRows", selectedRows);
    let ids = [];
    selectedRows.forEach((r) => {
      ids.push(r.Id);
    });
    return ids;
  }
}
