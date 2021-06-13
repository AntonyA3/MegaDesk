import CreateDeskIcon from "./create_desk_icon.jsx"
import DeskIcon from "./desk_icon.jsx"

export const DeskIconPanel = props =>{

    let style = {
        position: 'absolute',
        left: '10%',
        right: '10%',
        top: '10%',
        bottom: '10%',
        backgroundColor: 'lime',
        overflow: 'scroll'
    }
    let icons = [props.createDeskIcon].concat(props.deskIcons)
    icons.map((icon, i) =>{
        let row = Math.floor(i / 3)
        let column  = i % 3
        icon.rect.x = 20 * column
        icon.rect.y = 64 * row
        icon.rect.width = 20
        icon.rect.height = 64
    })
    return <div style={style}>
        {
            icons.map((icon, i) =>{
                if(i==0){
                    return new CreateDeskIcon(icon)
                }else{
                    return DeskIcon(icon)
                }
            })
            
            
        }
    </div>
}

export default DeskIconPanel