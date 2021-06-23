import { LightningElement, api } from 'lwc';

export default class SpeakerCard extends LightningElement {
    @api cabecera;
    @api texto;
}