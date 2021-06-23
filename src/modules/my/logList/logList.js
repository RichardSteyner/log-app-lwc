import { LightningElement } from 'lwc';
import { getLogs, getFilterLogs } from 'data/logService';

export default class SessionList extends LightningElement {
    
    logs = [];
    
    connectedCallback() {
        getLogs().then(result => {
            this.logs = this.allLogs = result;
        });
    }

    handleSearchKeyInput(event) {
        const filtroKey = event.target.value.toLowerCase();
        if(filtroKey !== undefined && filtroKey!=''){
            getFilterLogs(filtroKey).then(result => {
                this.logs = this.allLogs = result;
            });
        } else {
            getLogs().then(result => {
                this.logs = this.allLogs = result;
            });
        }
        
    }

    handleLogClick(event) {
        const index = event.currentTarget.dataset.index;
        const navigateEvent = new CustomEvent('navigate', {
          detail: {
            state: 'details',
            logId: this.logs[index].id
          }
        });
        this.dispatchEvent(navigateEvent);
    }

    handleClickNuevo(event) {
        const navigateEvent = new CustomEvent('navigate', {
          detail: {
            state: 'nuevo'
          }
        });
        this.dispatchEvent(navigateEvent);
    }

}