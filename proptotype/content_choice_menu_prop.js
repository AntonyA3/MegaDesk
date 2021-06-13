import ContentChoiceButtonProp from './content_choice_button_prop.js'
import Rect from './rect.js'

export class ContentChoiceMenuProp{
    constructor(){
        this.active = false
        this.rect = new Rect(0,0,128,32)
        this.choices = [
            new ContentChoiceButtonProp(),
            new ContentChoiceButtonProp(),
            new ContentChoiceButtonProp()
        ]


    }
}

export default ContentChoiceMenuProp