import { LightningElement } from 'lwc';
import Consts from 'c/consts';

export default class AdminDataCreationForm extends LightningElement {
    acMaster = Consts.KEYN;
    acValue;
    acFiltering;
    acFilteringOptions = [
        { value: '270', label: '19 District' },
        { value: '170', label: 'Adjustment Reason' },
        { value: '103', label: 'Agent Code' },
        { value: '460', label: 'Branch' }
    ];
    acMapping;
    acMappingOptions = [
        { value: '270', label: '19 District' },
        { value: '170', label: 'Adjustment Reason' },
        { value: '103', label: 'Agent Code' },
        { value: '460', label: 'Branch' }
    ];
    acDescEn;
    acDescTc;
    acDescSc;


}