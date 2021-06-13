import ContentChoiceButton from './content_choice_button.jsx'

export const ContentChoiceMenu = props =>{
    if(props.active){
        let rect = props.rect
        let choices = props.choices

        rect.height = 64
        rect.width = 128
        let style = {
            position: 'absolute',
            left: rect.x + 'px',
            top: rect.y + 'px',
            width: rect.width + 'px',
            height: rect.height + 'px',
            backgroundColor: 'pink',
        }


        return<div style={style}>
            {choices.map((choice, i) =>{
                choice.rect.x = 0                
                choice.rect.y = i * 16
                choice.rect.width = 128
                choice.rect.height = 16
                
                return ContentChoiceButton(choice)
            })}

        </div>
    }else{
        return <div></div>
    }
    
}

export default ContentChoiceMenu