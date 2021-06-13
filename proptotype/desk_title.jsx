import DeskTitleProp from "./desk_title_prop"


export const DeskTitle = props =>{
    let style = {
        position: 'absolute',
        left: '30%',
        top: '0%',
        width:'25 %',
        height: '10%',
        backgroundColor: 'lime'
    }
    switch(props.mode){
        case DeskTitleProp.Mode.Display:
            return <div style={style} onDoubleClick={props.onDoubleClick}>
                <h1>{props.title}</h1>
            </div>
        case DeskTitleProp.Mode.Edit:
            return <div style={style} onDoubleClick={props.onDoubleClick}>
                <textarea onChange={e =>props.title = e.target.value}>{props.title}</textarea>
            </div>
    }
    
}

export default DeskTitle