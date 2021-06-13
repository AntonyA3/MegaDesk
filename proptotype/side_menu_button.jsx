import Rect from "./rect"


export const SideMenuButton = props =>{
    let rect = props.rect
    let style =  {
        position: 'absolute', 
        backgroundColor: 'yellow',
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px'
    }

    return <div style={style} onClick={props.onClick}>

    </div>
}

export default SideMenuButton