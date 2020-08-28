import { LightningElement, api, track, wire } from 'lwc';
import getAdminDataByCode from "@salesforce/apex/AdminDataService.getAdminDataByCode";
import Consts from 'c/consts';

export default class AdminDataCreationForm extends LightningElement {
    @api inAcMaster;
    @api inAdminCode;
    @track param = {
        id: '',
        acMaster: Consts.KEYN,
        acValue: '',
        acDescEn: '',
        acDescTc: '',
        acDescSc: '',
        acFiltering: '',
        acFilteringOptions: [],
        acMapping: '',
        acMappingOptions: [],
        mappedByOtherKeyValue: true
    };

    connectedCallback() {
        this.initData();
    }

    initData() {
        let options = [
            { value: '270', label: '19 District' },
            { value: '170', label: 'Adjustment Reason' },
            { value: '103', label: 'Agent Code' },
            { value: '460', label: 'Branch' }
        ];
        this.param.acFilteringOptions = options;
        this.param.acMappingOptions = options;
    }

    error;
    @wire(getAdminDataByCode, {
        acMaster: "$inAcMaster",
        adminCode: "$inAdminCode"
    })
    wired_getAdminDataByCode({ error, data }) {
        console.log('error: ', error);
        console.log('data: ', data);
        let adminData = this.getAdminDataByCode();
        this.convertDataToParam(adminData);

        if (error) {
            this.error = error;
        }
    }

    getAdminDataByCode() {
        let adminData = {};
        let testDataList = Consts.ad_list_testDataList();
        testDataList.forEach((data) => {
            if (this.inAcMaster === data.Admin_Code_Master && this.inAdminCode === data.Admin_Code) {
                adminData = data;
            }
        });
        console.log('testDataList:', testDataList);
        console.log('adminData:', adminData);
        return adminData;
    }

    convertDataToParam(data) {
        console.log('data:', data);
        this.param.id = data.Id;
        this.param.acMaster = data.Admin_Code_Master;
        this.param.acValue = data.Admin_Code;
        this.param.acDescEn = data.Description_En;
        this.param.acDescTc = data.Description_Tc;
        this.param.acDescSc = data.Description_Sc;
        this.param.acFiltering = data.Admin_Code_Filtering;
        this.param.acFilteringValues = [];
        this.param.acMapping = data.Admin_Code_Mapping;
        this.param.acMappingValues = [];
        this.param.mappedByOtherKeyValue = true;
    }

    handleAcFilteringChange() {

    }

    handleAcMappingChange() {

    }

}