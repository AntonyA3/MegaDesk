import PadConnectorSplineProp from './pad_connector_spline_prop.js'
import Transform from './transform.js'
export class DeskProp{
    constructor(){
        this.transform = new Transform(0,0)
        this.pads = []
        this.lineConnectors = []
        this.onMouseDown = () =>{}
        this.onMouseUp = () =>{}
        
    }
}

export default DeskProp