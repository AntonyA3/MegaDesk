

export const DeskIcon = props =>{
    let rect = props.rect
    let style = {
        position: 'absolute',
        left: rect.x +'%',
        top: rect.y + 'px',
        width: rect.width+ '%',
        height: rect.height +'px',
        borderRadius: '32px',
        backgroundColor: 'orange'

    }

    return <div style={style} onClick={props.onClick}></div>
}

export default DeskIcon