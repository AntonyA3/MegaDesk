

export const TextContent = props =>{
    let rect = props.rect
    let style ={
        position: 'absolute',
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        paddingLeft: '0px',
        paddingRight: '0px',
        resize: 'none',
        boxSizing: 'border-box',
    }
    let areaStyle = Object.assign({overflow: 'auto'}, style)
    
    return<div style={style}>
        <textarea style={areaStyle} onChange={e => props.text=e.target.value}></textarea>
    </div>
}

export default TextContent