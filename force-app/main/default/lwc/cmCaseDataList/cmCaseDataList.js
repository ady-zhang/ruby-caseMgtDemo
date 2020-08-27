import { LightningElement, api, track, wire } from "lwc";
import Utils from "c/utils";
import { refreshApex } from "@salesforce/apex";
import { NavigationMixin } from "lightning/navigation";
//import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import getCaseList from "@salesforce/apex/CaseService.getCaseList";

const columnConfig = [
  {
    label: "Case Num",
    fieldName: "Case_Num",
    type: "text"
  },
  {
    label: "Case Type",
    fieldName: "Case_Type",
    type: "text"
  },
  {
    label: "Case Sub Type",
    fieldName: "Case_Sub_Type",
    type: "text"
  },
  {
    label: "Nature",
    fieldName: "Nature",
    type: "text"
  },
  {
    label: "Sub Nature",
    fieldName: "Sub_Nature",
    type: "text"
  },
  {
    label: "Mobile Num",
    fieldName: "Mobile_Num",
    type: "text"
  },
  {
    label: "Account Num",
    fieldName: "Account_Num",
    type: "text"
  },
  {
    label: "Channel",
    fieldName: "Channel",
    type: "text"
  },
  {
    label: "Network",
    fieldName: "Network",
    type: "text"
  },
  {
    label: "Status",
    fieldName: "Status",
    type: "text"
  },
  {
    label: "Create Date",
    fieldName: "Create_Date",
    type: "text"
  },
  {
    label: "Brand",
    fieldName: "Brand",
    type: "text"
  }
  /*    {
        label: "Out Target Indicator",
        fieldName: "Out_Target_Indicator",
        type: "text"
    },
    {
        label: "Target Date",
        fieldName: "Target_Date",
        type: "text"
    },
    {
        label: "Remain Time",
        fieldName: "Remain_Time",
        type: "text"
    },
    {
        label: "Close Date",
        fieldName: "Close_Date",
        type: "text"
    },
    {
        label: "Bill Adjustment Status",
        fieldName: "Bill_Adjustment_Status",
        type: "text"
    },
    {
        label: "Bill Adjustment Amount",
        fieldName: "Bill_Adjustment_Amount",
        type: "text"
    },
    {
        label: "Bill Adjustment Reason",
        fieldName: "Bill_Adjustment_Reason",
        type: "text"
    },
    {
      label: "Delete Indicate",
      fieldName: "Delete_Indicate",
      type: "text"
    }
*/ 
];

const testDataList = [
  {
    Id: "1001",
    Case_Num: "13836-1",
    Case_Type: "Network Complaint",
    Case_Sub_Type: "Coverage Complaint",
    Nature: "Mobile Data",
    Sub_Nature: "Data-04 Can't connect(01)",
    Mobile_Num: "32132122",
    Account_Num: "12345678",
    Channel: "CS Hotline - HK",
    Network: "NON-CUST",
    Status: "OPEN",
    Create_Date: "2019/08/22 15:32:25",
    Out_Target_Indicator: "Y",
    Target_Date: "2019/08/27 15:32:25",
    Remain_Time: "-359d20h04m",
    Close_Date: "",
    Bill_Adjustment_Status: "",
    Bill_Adjustment_Amount: "",
    Bill_Adjustment_Reason: "",
    Brand: "csl.",
    Delete_Indicate: "N"
  },
  {
    Id: "1002",
    Case_Num: "13837-1",
    Case_Type: "Coverage Enquiry and Feedback",
    Case_Sub_Type: "Mobile Coverage Enquiry",
    Nature: "(LTE) Coverage Checking",
    Sub_Nature: "Local data",
    Mobile_Num: "42104210",
    Account_Num: "23456789",
    Channel: "CS Hotline - HK",
    Network: "NON-CUST",
    Status: "OPEN",
    Create_Date: "2019/08/22 16:00:19",
    Out_Target_Indicator: "Y",
    Target_Date: "2019/08/27 16:00:19",
    Remain_Time: "-359d19h36m",
    Close_Date: "",
    Bill_Adjustment_Status: "",
    Bill_Adjustment_Amount: "",
    Bill_Adjustment_Reason: "",
    Brand: "csl.",
    Delete_Indicate: "N"
  },
  {
    Id: "1003",
    Case_Num: "13466-1",
    Case_Type: "Bill Adjustment",
    Case_Sub_Type: "Bulk Adjustment",
    Nature: "Bulk Adjustment",
    Sub_Nature: "Bulk Adjustment",
    Mobile_Num: "62137781",
    Account_Num: "83592386",
    Channel: "CAS",
    Network: "3G-POSTPAID",
    Status: "OPEN",
    Create_Date: "2019/10/21 14:56:51",
    Out_Target_Indicator: "Y",
    Target_Date: "2019/10/31 14:56:51",
    Remain_Time: "-294d20h40m",
    Close_Date: "",
    Bill_Adjustment_Status: "Approved",
    Bill_Adjustment_Amount: "-1589.02",
    Bill_Adjustment_Reason: "Bulk Adjustment",
    Brand: "1010",
    Delete_Indicate: "N"
  },
  {
    Id: "1004",
    Case_Num: "13855-1",
    Case_Type: "Bill Adjustment",
    Case_Sub_Type: "Bill Adjustment",
    Nature: "Bill Adjustment",
    Sub_Nature: "Bill Adjustment",
    Mobile_Num: "65313418",
    Account_Num: "77100240181844",
    Channel: "CS Hotline - HK",
    Network: "3G-POSTPAID",
    Status: "CLOSE",
    Create_Date: "2019/08/28 09:29:11",
    Out_Target_Indicator: "N",
    Target_Date: "2019/09/07 09:29:11",
    Remain_Time: "09d23h33m",
    Close_Date: "2019/08/29 10:02:11",
    Bill_Adjustment_Status: "Approved",
    Bill_Adjustment_Amount: "5000",
    Bill_Adjustment_Reason: "Discretional - company goodwill",
    Brand: "csl.",
    Delete_Indicate: "N"
  }
];

export default class CmCaseDataList extends NavigationMixin(LightningElement) {
  title = "Case List";
  @api filterMap;
  inputedAdminCode = "";
  inputedDescription = "";
  selectedAdminCodeId = "";

  error;
  loading = true;
  _wiredStudentResult;
  columnsList = columnConfig;
  @track dataList = [];
  @wire(getCaseList, {
    filterMap: "$filterMap"
  })
  wired_getCaseList(result) {
    console.log(result);
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
    this.triggerNewAction();
  }

  triggerNewAction() {
    const event = new CustomEvent("triggeraction", {
      detail: {
        newMode: true
      }
    });
    this.dispatchEvent(event);
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
