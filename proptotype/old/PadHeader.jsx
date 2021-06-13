export const Bar = ({x, y, width, height, color, onMouseDown, onMouseUp}) =>{
    const style = {
        position:'absolute',
        left: x + 'px',
        top: y + 'px',
        width: width + 'px',
        height: height + 'px',
        backgroundColor: color
    }
    return <div style={style} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>

    </div>
}

export default Bar


