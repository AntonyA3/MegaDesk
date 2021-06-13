

export const PadActionButton = props =>{
    let rect = props.rect
    let style = {
        position: 'absolute',
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        backgroundColor: 'red'
    }
    return <div style={style} onClick={props.onClick}>

    </div>
}

export default PadActionButton