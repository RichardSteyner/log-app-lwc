import { LightningElement } from 'lwc';

export default class App extends LightningElement {

    logId;
    state;

    constructor(){
        super();
        this.state = 'list';
        window.history.replaceState('list', null, '');
        window.onpopstate = event => {
            if(event.state){
                this.state = event.state;
            }
        };
    }

    handleNavigate(event) {
        this.state = event.detail.state;
        this.logId = event.detail.logId;
        if(event.detail.state === 'details' || event.detail.state === 'nuevo')
            window.history.pushState(event.detail.state, null);
        else {
            window.history.back();
        }
    }

    get isStateList() {
        return this.state === 'list';
    }

    get isStateDetails() {
        return this.state === 'details';
    }

    get isStateNuevo() {
        return this.state === 'nuevo';
    }

}
