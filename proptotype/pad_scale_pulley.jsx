

export const PadScalePulley = props =>{
    let rect = props.rect
    let style = {
        position: 'absolute',
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        backgroundColor: 'purple'
    }
    
    return <div style={style} onMouseDown={props.onMouseDown}></div>
    
}

export default PadScalePulley