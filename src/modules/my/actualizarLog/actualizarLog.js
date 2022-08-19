import { LightningElement, api } from 'lwc';
import { getLog, putLog } from 'data/logService';
import { user, token } from 'data/loginService';

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

    log;
    
    @api
    set logId(id) {
        this._logId = id;
        this.log = getLog(id);
        this.titulo = this.log.titulo;
        this.tipo = this.log.tipo;
        this.detalletipo = this.log.detalleTipo;
        this.descripcion = this.log.descripcion;
        this.solucion = this.log.solucion;
        this.codigoclave = this.log.codigoClave;
    }

    get logId() {
        return this._logId;
    }
    
    get codigoEjemploNotBlank() {
      return this.log!=undefined && this.log!=null && this.log.codigoClave!=null && this.log.codigoClave!='';
    }

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
            this.editor.root.innerHTML = this.codigoclave;
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

    handleActualizarLogClick() {
      this.isButtonVisible = false;
        const logAActualizar = {
            titulo: this.titulo,
            tipo: this.tipo,
            detalleTipo: this.detalletipo,
            descripcion: this.descripcion,
            solucion: this.solucion,
            codigoClave: this.editor.root.innerHTML, 
            vigencia: true
        };
        putLog(logAActualizar, this.myToken, this.log._id)
        .then(result => {
            if(result.msg) {
              this.handleShowModal(`Error al guardar el log ${result.msg}`);
              this.limpiarControles(false);
            } else {
              this.handleShowModal('Log guardado.');
              this.limpiarControles(true);
              this.navegarALista();
            }
        })
        .catch(err => {
          this.handleShowModal('Error al guardar Log.')
          console.log(err);
          this.limpiarControles(false)
        });
    }

    handleShowModal(msj) {
        const modal = this.template.querySelector("my-modal-popup");
        modal.show(msj);
    }

    limpiarControles(logActualizado) {
      if(logActualizado){
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