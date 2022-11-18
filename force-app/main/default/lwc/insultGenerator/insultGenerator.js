import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import LightningAlert from 'lightning/alert';

import USER_ID from '@salesforce/user/Id';

const CONTACT_FIELDS = ['Contact.Name'];
const USER_FIELDS = ['User.Name'];

export default class InsultGenerator extends LightningElement {
    @api recordId; //holds the current record Id, if used in a record context
    record;
    nameToInsult;

    @wire(getRecord, { recordId: USER_ID, USER_FIELDS })
    user;

    @wire(getRecord, { recordId: '$recordId', CONTACT_FIELDS })
    wiredRecord({ error, data }){
        if(error) {
            console.log('ERROR');
            console.log(error);
            this.nameToInsult = user.Name.value;
        } else if (data) {
            console.log(data);
            this.record = data;
            this.nameToInsult = data.Name.value;
        } else {
            console.log('oh look nothing');
        }
    }

    async handleInsult() {
        await LightningAlert.open({
            message: `${this.nameToInsult} is a bozo`,
            theme: 'warning',
            label: 'Insult generated!'
        });
    }

}