import { ContentType } from "./enums";
import Rect from "./rect";

export class TextContentProp{
    static Mode = {
        Display: 0,
        Edit: 1
    }
    constructor(){
        this.type = ContentType.Text
        this.rect = new Rect()
        this.text = ""
        this.mode = TextContentProp.Mode.Edit

    }
}

export default TextContentProp