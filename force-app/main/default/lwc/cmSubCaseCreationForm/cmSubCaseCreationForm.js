import { LightningElement, api } from 'lwc';

export default class CmSubCaseCreationForm extends LightningElement {
    @api inCaseNum;
    @api inSubCaseNum;

    billCutDates = [];
    connectedCallback() {
        for (let index = 1; index <= 31; index++) {
            const element = { label: index, value: index };
            this.billCutDates.push(element);
        }
    }
    caseTypes = [
        { label: 'Charges Dispute', value: '10' },
        { label: 'Bill Adjustment', value: '11' },
        { label: 'General Complaint', value: '20' },
        { label: 'Network Complaint', value: '30' }
    ];
    caseSubTypes = [
        { label: 'Charges Dispute', value: '10' },
        { label: 'Bill Adjustment', value: '11' },
        { label: 'General Complaint', value: '20' },
        { label: 'Network Complaint', value: '30' }
    ];
}