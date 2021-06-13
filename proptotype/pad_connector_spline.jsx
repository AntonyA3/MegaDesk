import PadConnectorSplineProp from "./pad_connector_spline_prop"

export const PadConnectorSpline = props =>{
    let sideConnection = (pad, side) =>{
        let point =[pad.rect.x, pad.rect.y]
        switch(side){
            case PadConnectorSplineProp.ConnectionSide.Left:
                point[1] += pad.rect.height * 0.5
                break;
            case PadConnectorSplineProp.ConnectionSide.Right:
                point[0] += pad.rect.width
                point[1] += pad.rect.height * 0.5

                break;
            case PadConnectorSplineProp.ConnectionSide.Top:
                point[0] += pad.rect.width * 0.5
                break;
            case PadConnectorSplineProp.ConnectionSide.Bottom:
                point[0] += pad.rect.width * 0.5
                point[1] += pad.rect.height
                break;
        }
        return point
    }
    let pad1Point = sideConnection(props.pad1, props.pad1Side)
    let pad2Point = sideConnection(props.pad2, props.pad2Side)

    
    let p0 = pad1Point
    let p1 = pad1Point
    let p2 = pad2Point
    let p3 = pad2Point
    let minX = Math.min(Math.min(p0[0], p1[0]), Math.min(p2[0], p3[0]))
    let minY = Math.min(Math.min(p0[1], p1[1]), Math.min(p2[1], p3[1]))
    let maxX = Math.max(Math.max(p0[0], p1[0]), Math.max(p2[0], p3[0]))
    let maxY = Math.max(Math.max(p0[1], p1[1]), Math.max(p2[1], p3[1]))

    let style = {
        stroke: 'black',
        strokeWidth: '2px',
    }
    return <svg width={maxX - minX + 8} height={maxY - minY + 8} style={{position:'absolute', left:minX + 'px', top: minY + 'px'}}>
        <path 
        d={`M${p0[0] - minX},${p0[1] - minY} C${p1[0] - minX},${p1[1] - minY} ${p2[0] - minX},${p2[1] - minY} ${p3[0] - minX},${p3[1] - minY}`} 
        stroke={'black'} strokeLinecap={'rounded'}></path>
    </svg>
}

export default PadConnectorSpline