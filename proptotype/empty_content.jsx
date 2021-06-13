

export const EmptyContent = props =>{
    let rect = props.rect
    let style = {
        position: 'absolute',
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        backgroundColor: 'grey',
        overflow:'hidden',
        userSelect: 'none'
    }

    return<div style={style} onClick={props.onClick}>
        Empty
    </div>
}

export default EmptyContent