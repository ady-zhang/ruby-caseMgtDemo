import { LightningElement } from 'lwc';

export default class AdminDataCreationChildForm extends LightningElement {
    acMaster = '60';
    acValue;
    acFiltering;
    acFilteringOptions = [
        { value: '270', label: '19 District' },
        { value: '170', label: 'Adjustment Reason' },
        { value: '103', label: 'Agent Code' },
        { value: '460', label: 'Branch' }
    ];
    acFilteringValues = [];
    acMapping;
    acMappingOptions = [
        { value: '270', label: '19 District' },
        { value: '170', label: 'Adjustment Reason' },
        { value: '103', label: 'Agent Code' },
        { value: '460', label: 'Branch' }
    ];
    acMappingValues = [];
    acDescEn;
    acDescTc;
    acDescSc;
    mappedByOtherKeyValue = true;


}