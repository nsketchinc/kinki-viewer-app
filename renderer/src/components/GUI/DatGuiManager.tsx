import {GUI} from 'dat.gui'

class DatGuiManager {

  _gui: GUI

  constructor() {
    this._gui = new GUI()
    document.body.appendChild(this._gui.domElement)
  }

  get gui(){
    return this._gui
  }
}

export default new DatGuiManager
