import { LightningElement } from 'lwc';
import { login } from 'data/loginService';

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
        this.loginSteyner();
    }

    handleNavigate(event) {
        this.state = event.detail.state;
        this.logId = event.detail.logId;
        if(event.detail.state === 'details' || event.detail.state === 'nuevo' || event.detail.state === 'actualizar')
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

    get isStateActualizar() {
        return this.state === 'actualizar';
    }

    async loginSteyner() {
        let passwordGenerate = '';
        for(let i=0; i<6; i++) passwordGenerate = passwordGenerate + (i+1).toString();
        login({correo: 'steyner.urupeque.s@gmail.com', password: passwordGenerate});
    }

}
