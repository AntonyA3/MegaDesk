import PadTitle from './pad_title.jsx'
import PadActionButton from './pad_action_button.jsx'
export const PadHeader = props =>{
    let rect = props.rect
    let deleteButton = props.deleteButtonProp
    deleteButton.rect.x = rect.width - 16
    deleteButton.rect.y = 0
    deleteButton.rect.width = 16
    deleteButton.rect.height = 16
    
    let style = {
        position: 'absolute',
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        backgroundColor: 'blue'
    }
    return <div style={style} onMouseDown={props.onMouseDown}>
        {[
            PadTitle(props.titleProp),
            PadActionButton(deleteButton)
        ]}
    </div>
}


export default PadHeader