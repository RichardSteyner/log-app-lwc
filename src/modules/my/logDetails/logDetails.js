import { LightningElement, api } from 'lwc';
import { getLog } from 'data/logService';

export default class SessionDetails extends LightningElement {

    log;
    
    @api
    set logId(id) {
        this._logId = id;
        this.log = getLog(id);
    }

    get logId() {
        return this._logId;
    }

    handleLogsClick() {
        const navigateEvent = new CustomEvent('navigate', {
          detail: {
            state: 'list'
          }
        });
        this.dispatchEvent(navigateEvent);
    }
}