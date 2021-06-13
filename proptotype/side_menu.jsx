import SideMenuButton from "./side_menu_button.jsx"

export const SideMenu = props =>{
    let rect = props.rect
    let style = {        
        position:'absolute', 
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: rect.width + 'px',
        height: rect.height + '%',
        backgroundColor: 'blue'
    }
    return <div style={style}>
        {props.buttons.map((button, i) =>{
            button.rect.x = 0
            button.rect.y = i * 34 + 8
            button.rect.width = 32
            button.rect.height = 32


            return SideMenuButton(button)
        })}
    </div>
}

export default SideMenu