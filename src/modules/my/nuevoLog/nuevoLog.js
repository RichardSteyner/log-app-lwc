import { LightningElement } from 'lwc';
import { postLog } from 'data/logService';
import { token } from 'data/loginService';

export default class SessionDetails extends LightningElement {

  tipo = 'Aplicación';
  titulo = '';
  detalletipo = '';
  descripcion = '';
  codigoclave = '';
  solucion = '';
  editor = null;

  isButtonVisible = true;

  myToken = '';

  connectedCallback() {
    this.myToken = token();
  }

  renderedCallback() {
      if(this.editor==null) {
      const myContainer = this.template.querySelector('.editor');
      const options = {
        theme: 'snow'
      };
      this.editor = new Quill(myContainer, options);
      }
  }

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
      if(event.target.name==='input_titulo'){
        this.titulo = event.target.value;
      } else if(event.target.name==='input_detalletipo'){
        this.detalletipo = event.target.value;
      } else if(event.target.name==='input_descripcion'){
        this.descripcion = event.target.value;
      } else if(event.target.name==='input_solucion'){
        this.solucion = event.target.value;
      } else if(event.target.name==='input_codigo'){
        this.codigoclave = event.target.value;
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
            codigoClave: this.editor.root.innerHTML, 
            vigencia: true
        };
        postLog(logAInsertar, this.myToken)
        .then(result => {
            if(result.msg) {
              this.handleShowModal(`Error al guardar el log ${result.msg}`);
              this.limpiarControles(false);
            } else {
              this.handleShowModal('Log guardado.');
              this.limpiarControles(true);
            }
            //this.navegarALista();
        })
        .catch(err => {
          this.handleShowModal('Error al guardar Log. --> Justo en la capacitación :/')
          console.log(err);
          this.limpiarControles(false)
        });
    }

    handleShowModal(msj) {
        const modal = this.template.querySelector("my-modal-popup");
        modal.show(msj);
    }

    limpiarControles(logCreado) {
      if(logCreado){
        this.tipo = 'Aplicación';
        this.titulo = '';
        this.detalletipo = '';
        this.descripcion = '';
        this.solucion = '';
        this.codigoclave = '';
      }

      this.isButtonVisible = true;
    }

}