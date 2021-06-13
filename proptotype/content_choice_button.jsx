
export const ContentChoiceButton = props =>{
    let rect = props.rect
    let text = props.text
    
    let style = {
        position: 'absolute',
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
        backgroundColor: 'purple'
    }
    return<div style={style} onClick={props.onClick}>
        {text}
    </div>
}

export default ContentChoiceButton