import PadTitleProp from "./pad_title_prop";


export const PadTitle = props =>{
    let rect = props.rect
    let style = {
        position: 'absolute',
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: '64px',
        heigth: '64px',
        userSelect: 'none'
    }
    switch(props.mode){
        case PadTitleProp.Mode.Display:
            return <div style = {style} onDoubleClick={props.onDoubleClick} onMouseDown={props.onMouseDown}>
                {props.title}
            </div>
        case PadTitleProp.Mode.Edit:
            return <textarea 
                style={style} 
                
                onMouseDown={ props.onMouseDown}
                onChange={e => props.title = e.currentTarget.value}>{props.title}</textarea>
            
    }
    
}

export default PadTitle