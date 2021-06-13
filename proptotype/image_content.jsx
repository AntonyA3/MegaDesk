
export const ImageContent = props =>{
    let rect = props.rect
    let style ={
        position: 'absolute',
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        userSelect: 'none'
    }
    return <img style={style} src={props.imageUrl}></img>
}

export default ImageContent