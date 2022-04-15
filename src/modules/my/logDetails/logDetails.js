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

    get codigoEjemploNotBlank() {
      return this.log!=undefined && this.log!=null && this.log.codigoClave!=null && this.log.codigoClave!='';
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