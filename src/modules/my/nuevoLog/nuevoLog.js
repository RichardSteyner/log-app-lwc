import { LightningElement, api } from 'lwc';
import { postLog } from 'data/logService';

export default class SessionDetails extends LightningElement {

  tipo = 'Aplicación';
  titulo = '';
  detalletipo = '';
  descripcion = '';
  solucion = '';

  isButtonVisible = true;

  get opciones() {
      return [
          { label: 'Aplicación', value: 'Aplicación' },
          { label: 'Lenguaje', value: 'Lenguaje' }
      ];
  }

  get camposCompletados() {
    return this.titulo=='' || this.detalletipo=='' || this.descripcion=='' || this.solucion=='';
  }

    handleLogsClick() {
      this.navegarALista();
    }

    navegarALista() {
      const navigateEvent = new CustomEvent('navigate', {
        detail: {
          state: 'list'
        }
      });
      this.dispatchEvent(navigateEvent);
    }

    handleChangeCombo(event) {
        this.tipo = event.detail.value;
    }

    handleChangeInput(event) {
      const filtroKey = event.target.value.toLowerCase();
      //console.log('change', filtroKey);
      //console.log(event.target.name)
      if(event.target.name==='input_titulo'){
        this.titulo = event.target.value;
      } else if(event.target.name==='input_detalletipo'){
        this.detalletipo = event.target.value;
      } else if(event.target.name==='input_descripcion'){
        this.descripcion = event.target.value;
      } else if(event.target.name==='input_solucion'){
        this.solucion = event.target.value;
      }
    }

    handleNuevoLogClick() {
      this.isButtonVisible = false;
        const logAInsertar = {
            titulo: this.titulo,
            tipo: this.tipo,
            detalleTipo: this.detalletipo,
            descripcion: this.descripcion,
            solucion: this.solucion,
            vigencia: true
        };
        postLog(logAInsertar).then(result => {
            //console.log(result);
            this.navegarALista();
        });
    }

}