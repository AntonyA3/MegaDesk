import Pad from './pad.jsx'
import PadConnectorSpline from './pad_connector_spline.jsx'
export const Desk = props =>{
    let transform = props.transform
    let x = transform.x
    let y = transform.y
    let scaleX = transform.scaleX
    let scaleY = transform.scaleY
    let pads = props.pads
    let lineConnectors = props.lineConnectors
    const style = {
        position: 'fixed',
        transform: `matrix(${scaleX},0,0,${scaleY},${x}, ${y})`,
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
    }
    return <div style={style} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp}>
        {[
            
            lineConnectors.map((lineConnector,i) =>{
                return new PadConnectorSpline(lineConnector)
            }),
            pads.map((pad, i) =>{
                return new Pad(pad)
            })
        ]

        }
    </div>
}

export default Desk