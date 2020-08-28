export default class Consts {
  static KEYN = 'KEYN';
  static ADD = 'ADD';
  static EDIT = 'EDIT';
  static DELETE = 'DEL';

  static CSS_HIDDEN = 'css-hidden';
  static OFF_ICON_NAME = 'utility:jump_to_top';
  static ON_ICON_NAME = 'utility:jump_to_bottom';

  /** Admin Data List Test Data */

  static ad_list_columnConfig() {
    return [
      {
        label: 'Admin Code',
        fieldName: 'Admin_Code',
        type: 'text'
      },
      {
        label: 'Description(English)',
        fieldName: 'Description_En',
        type: 'text'
      },
      {
        label: 'Description(Traditional Chinese)',
        fieldName: 'Description_Tc',
        type: 'text'
      },
      {
        label: 'Description(Simplified Chinese)',
        fieldName: 'Description_Sc',
        type: 'text'
      },
      {
        label: 'Admin Code Filtering',
        fieldName: 'Admin_Code_Filtering',
        type: 'text'
      },
      {
        label: 'Admin Code Mapping',
        fieldName: 'Admin_Code_Mapping',
        type: 'text'
      },
      {
        label: 'Delete Indicate',
        fieldName: 'Delete_Indicate',
        type: 'text'
      },
      {
        type: 'action',
        typeAttributes: {
          rowActions: [{ label: 'Delete', name: 'delete' }]
        }
      }
    ]
  };

  static ad_list_testDataList() {
    return [
      {
        Id: '1001',
        Admin_Code: '50',
        Admin_Code_Master: 'KEYN',
        Description_En: 'Case Type',
        Description_Tc: 'Case Type',
        Description_Sc: 'Case Type',
        Admin_Code_Filtering: 'LOB',
        Admin_Code_Mapping: '',
        Delete_Indicate: 'N'
      },
      {
        Id: '1002',
        Admin_Code: '60',
        Admin_Code_Master: 'KEYN',
        Description_En: 'Case Sub Type',
        Description_Tc: 'Case Sub Type',
        Description_Sc: 'Case Sub Type',
        Admin_Code_Filtering: '50',
        Admin_Code_Mapping: '',
        Delete_Indicate: 'N'
      },
      {
        Id: '1003',
        Admin_Code: '70',
        Admin_Code_Master: 'KEYN',
        Description_En: 'Case Nature',
        Description_Tc: 'Case Nature',
        Description_Sc: 'Case Nature',
        Admin_Code_Filtering: '60',
        Admin_Code_Mapping: '',
        Delete_Indicate: 'N'
      },
      {
        Id: '1004',
        Admin_Code: '80',
        Admin_Code_Master: 'KEYN',
        Description_En: 'Case Sub Nature',
        Description_Tc: 'Case Sub Nature',
        Description_Sc: 'Case Sub Nature',
        Admin_Code_Filtering: '70',
        Admin_Code_Mapping: '',
        Delete_Indicate: 'N'
      }
    ]
  };

  /** Admin Data Children Test Data */

  static ad_children_columnConfig() {
    return [
      {
        label: 'Admin Code Master',
        fieldName: 'Admin_Code_Master',
        type: 'text'
      },
      {
        label: 'Admin Code',
        fieldName: 'Admin_Code',
        type: 'text'
      },
      {
        label: 'Description(English)',
        fieldName: 'Description_En',
        type: 'text'
      },
      {
        label: 'Description(Traditional Chinese)',
        fieldName: 'Description_Tc',
        type: 'text'
      },
      {
        label: 'Description(Simplified Chinese)',
        fieldName: 'Description_Sc',
        type: 'text'
      },
      {
        label: 'Admin Code Filtering',
        fieldName: 'Admin_Code_Filtering',
        type: 'text'
      },
      {
        label: 'Admin Code Mapping',
        fieldName: 'Admin_Code_Mapping',
        type: 'text'
      },
      {
        label: 'Delete Indicate',
        fieldName: 'Delete_Indicate',
        type: 'text'
      },
      {
        type: 'action',
        typeAttributes: {
          rowActions: [{ label: 'Delete', name: 'delete' }]
        }
      }
    ]
  };

  static ad_children_testDataList() {
    return [
      {
        Id: '10001',
        Admin_Code: '10',
        Admin_Code_Master: '50',
        Description_En: 'Charges Dispute',
        Description_Tc: '收費爭議',
        Description_Sc: '收费争议',
        Admin_Code_Filtering: 'MOB',
        Admin_Code_Mapping: '',
        Delete_Indicate: 'N'
      },
      {
        Id: '10002',
        Admin_Code: '11',
        Admin_Code_Master: '50',
        Description_En: 'Bill Adjustment',
        Description_Tc: 'Bill Adjustment',
        Description_Sc: 'Bill Adjustment',
        Admin_Code_Filtering: 'MOB',
        Admin_Code_Mapping: '',
        Delete_Indicate: 'N'
      },
      {
        Id: '10003',
        Admin_Code: '20',
        Admin_Code_Master: '50',
        Description_En: 'General Complaint',
        Description_Tc: '基本投訴',
        Description_Sc: '基本投诉',
        Admin_Code_Filtering: 'MOB',
        Admin_Code_Mapping: '',
        Delete_Indicate: 'N'
      },
      {
        Id: '10004',
        Admin_Code: '30',
        Admin_Code_Master: '50',
        Description_En: 'Network Complaint',
        Description_Tc: '網络投訴',
        Description_Sc: '网络投诉',
        Admin_Code_Filtering: 'MOB,MVNO',
        Admin_Code_Mapping: '',
        Delete_Indicate: 'N'
      }
    ]
  };


  /** Case Data List Test Data */
  static case_list_columnConfig() {
    return [
      {
        label: 'Case Num',
        fieldName: 'Case_Num',
        type: 'text'
      },
      {
        label: 'Case Type',
        fieldName: 'Case_Type',
        type: 'text'
      },
      {
        label: 'Case Sub Type',
        fieldName: 'Case_Sub_Type',
        type: 'text'
      },
      {
        label: 'Nature',
        fieldName: 'Nature',
        type: 'text'
      },
      {
        label: 'Sub Nature',
        fieldName: 'Sub_Nature',
        type: 'text'
      },
      {
        label: 'Mobile Num',
        fieldName: 'Mobile_Num',
        type: 'text'
      },
      {
        label: 'Account Num',
        fieldName: 'Account_Num',
        type: 'text'
      },
      {
        label: 'Channel',
        fieldName: 'Channel',
        type: 'text'
      },
      {
        label: 'Network',
        fieldName: 'Network',
        type: 'text'
      },
      {
        label: 'Status',
        fieldName: 'Status',
        type: 'text'
      },
      {
        label: 'Create Date',
        fieldName: 'Create_Date',
        type: 'text'
      },
      {
        label: 'Brand',
        fieldName: 'Brand',
        type: 'text'
      }
      /*    {
            label: 'Out Target Indicator',
            fieldName: 'Out_Target_Indicator',
            type: 'text'
        },
        {
            label: 'Target Date',
            fieldName: 'Target_Date',
            type: 'text'
        },
        {
            label: 'Remain Time',
            fieldName: 'Remain_Time',
            type: 'text'
        },
        {
            label: 'Close Date',
            fieldName: 'Close_Date',
            type: 'text'
        },
        {
            label: 'Bill Adjustment Status',
            fieldName: 'Bill_Adjustment_Status',
            type: 'text'
        },
        {
            label: 'Bill Adjustment Amount',
            fieldName: 'Bill_Adjustment_Amount',
            type: 'text'
        },
        {
            label: 'Bill Adjustment Reason',
            fieldName: 'Bill_Adjustment_Reason',
            type: 'text'
        },
        {
          label: 'Delete Indicate',
          fieldName: 'Delete_Indicate',
          type: 'text'
        }
    */
    ]
  };

  static case_list_testDataList() {
    return [
      {
        Id: '1001',
        Case_Num: '13836-1',
        Case_Type: 'Network Complaint',
        Case_Sub_Type: 'Coverage Complaint',
        Nature: 'Mobile Data',
        Sub_Nature: "Data-04 Can't connect(01)",
        Mobile_Num: '32132122',
        Account_Num: '12345678',
        Channel: 'CS Hotline - HK',
        Network: 'NON-CUST',
        Status: 'OPEN',
        Create_Date: '2019/08/22 15:32:25',
        Out_Target_Indicator: 'Y',
        Target_Date: '2019/08/27 15:32:25',
        Remain_Time: '-359d20h04m',
        Close_Date: '',
        Bill_Adjustment_Status: '',
        Bill_Adjustment_Amount: '',
        Bill_Adjustment_Reason: '',
        Brand: 'csl.',
        Delete_Indicate: 'N'
      },
      {
        Id: '1002',
        Case_Num: '13837-1',
        Case_Type: 'Coverage Enquiry and Feedback',
        Case_Sub_Type: 'Mobile Coverage Enquiry',
        Nature: '(LTE) Coverage Checking',
        Sub_Nature: 'Local data',
        Mobile_Num: '42104210',
        Account_Num: '23456789',
        Channel: 'CS Hotline - HK',
        Network: 'NON-CUST',
        Status: 'OPEN',
        Create_Date: '2019/08/22 16:00:19',
        Out_Target_Indicator: 'Y',
        Target_Date: '2019/08/27 16:00:19',
        Remain_Time: '-359d19h36m',
        Close_Date: '',
        Bill_Adjustment_Status: '',
        Bill_Adjustment_Amount: '',
        Bill_Adjustment_Reason: '',
        Brand: 'csl.',
        Delete_Indicate: 'N'
      },
      {
        Id: '1003',
        Case_Num: '13466-1',
        Case_Type: 'Bill Adjustment',
        Case_Sub_Type: 'Bulk Adjustment',
        Nature: 'Bulk Adjustment',
        Sub_Nature: 'Bulk Adjustment',
        Mobile_Num: '62137781',
        Account_Num: '83592386',
        Channel: 'CAS',
        Network: '3G-POSTPAID',
        Status: 'OPEN',
        Create_Date: '2019/10/21 14:56:51',
        Out_Target_Indicator: 'Y',
        Target_Date: '2019/10/31 14:56:51',
        Remain_Time: '-294d20h40m',
        Close_Date: '',
        Bill_Adjustment_Status: 'Approved',
        Bill_Adjustment_Amount: '-1589.02',
        Bill_Adjustment_Reason: 'Bulk Adjustment',
        Brand: '1010',
        Delete_Indicate: 'N'
      },
      {
        Id: '1004',
        Case_Num: '13855-1',
        Case_Type: 'Bill Adjustment',
        Case_Sub_Type: 'Bill Adjustment',
        Nature: 'Bill Adjustment',
        Sub_Nature: 'Bill Adjustment',
        Mobile_Num: '65313418',
        Account_Num: '77100240181844',
        Channel: 'CS Hotline - HK',
        Network: '3G-POSTPAID',
        Status: 'CLOSE',
        Create_Date: '2019/08/28 09:29:11',
        Out_Target_Indicator: 'N',
        Target_Date: '2019/09/07 09:29:11',
        Remain_Time: '09d23h33m',
        Close_Date: '2019/08/29 10:02:11',
        Bill_Adjustment_Status: 'Approved',
        Bill_Adjustment_Amount: '5000',
        Bill_Adjustment_Reason: 'Discretional - company goodwill',
        Brand: 'csl.',
        Delete_Indicate: 'N'
      }
    ]
  };


  /** Task Data List Test Data */
  static task_list_columnConfig() {
    return [
      {
        label: 'Task Num',
        fieldName: 'Task_Num',
        type: 'text'
      },
      {
        label: 'Task Description',
        fieldName: 'Task_Desc',
        type: 'text'
      },
      {
        label: 'Task Status',
        fieldName: 'Task_Status',
        type: 'text'
      },
      {
        label: 'Task Resolver',
        fieldName: 'Task_Resolver',
        type: 'text'
      },
      {
        label: 'Target Date',
        fieldName: 'Target_Date',
        type: 'text'
      },
      {
        label: 'SLA Time',
        fieldName: 'SLA_Time',
        type: 'text'
      },
      {
        label: 'SLA Remain Time',
        fieldName: 'SLA_Remain_Time',
        type: 'text'
      },
      {
        label: 'Reason',
        fieldName: 'Reason',
        type: 'text'
      }
    ]
  };

  static task_list_testDataList() {
    return [
      {
        Id: '1001',
        Case_Num: '13836',
        Sub_Case_Num: '1',
        Task_Num: '1',
        Task_Desc: 'Follow-up with customer',
        Task_Status: 'OPEN',
        Task_Resolver: 'TGT01-Gold Tier 2',
        Target_Date: '2015/05/29 17:24:14',
        SLA_Time: '03d00h00m',
        SLA_Remain_Time: '-1917d23h52m',
        Reason: ''
      },
      {
        Id: '1002',
        Case_Num: '13837',
        Sub_Case_Num: '1',
        Task_Num: '2',
        Task_Desc: 'Gold - Investigation',
        Task_Status: 'CLOSE',
        Task_Resolver: 'TGB01-Gold BO',
        Target_Date: '2015/05/29 17:24:14',
        SLA_Time: '03d00h00m',
        SLA_Remain_Time: '-06d22h25m',
        Reason: 'Investigation Complete'
      }
    ]
  };


}
