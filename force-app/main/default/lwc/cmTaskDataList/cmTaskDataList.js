import { LightningElement, api, track, wire } from "lwc";
import Consts from "c/consts";
import getTaskList from "@salesforce/apex/CaseTaskService.getTaskList";

export default class CmTaskDataList extends LightningElement {
  title = 'Task List';
  method = '';
  @api inCaseNum
  @api inSubCaseNum;

  error;
  loading = true;
  _wiredStudentResult;
  columnsList = Consts.task_list_columnConfig();
  @track dataList = [];
  @wire(getTaskList, {
    caseNum: '$inCaseNum',
    subCaseNum: '$inSubCaseNum'
  })
  wired_getTaskList(result) {
    this.loading = true;
    this._wiredStudentResult = result;
    this.dataList = Consts.task_list_testDataList();
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

    this.showCreationDialog();
  }

  onEdit() {
    this.method = Consts.EDIT;

    let dataList = this.getSelectedDataList();
    if (dataList.length > 0) {
      let data = dataList[0];

      this.showCreationDialog();
    } else {
      Utils.showToast(this, "Warning", "Please select a record first!", "warning");
    }
  }

  showCreationDialog() {
    const dialog = this.template.querySelector('c-cm-task-dialog');
    dialog.show();
  }

  handleShowTaskDialog() {

  }

  
  getSelectedDataList() {
    let datatable = this.template.querySelector("lightning-datatable");
    let selectedRows = datatable.getSelectedRows();
    console.log("selectedRows", selectedRows);
    return selectedRows;
  }


  btnGroupDisabled = true;
  onRowSelection(event) {
    let numSelected = event.detail.selectedRows.length;
    this.btnGroupDisabled = numSelected === 0;
  }

  /** Open or Close function */
  hiddenLayout = true;
  iconTitle = 'Close';
  iconName = Consts.OFF_ICON_NAME;
  handleIconAction() {
    const layoutEl = this.template.querySelector("div");
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