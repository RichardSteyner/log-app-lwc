import { LightningElement, api } from "lwc";


export default class ModalPopup extends LightningElement {

    mensaje = '';
    showModal = false;

    @api show(msj) {
        this.showModal = true;
        this.mensaje = msj;
    }
    handleDialogClose() {
        this.showModal = false;
    }
}