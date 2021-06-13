import PadActionButtonProps from "./pad_action_button_prop";
import PadTitleProp from "./pad_title_prop";
import Rect from "./rect";

export class PadHeaderProp{
    static DEFAULT_HEIGHT = 32
    constructor(){
        this.rect = new Rect(0,0,128,128)
        this.titleProp = new PadTitleProp()
        this.deleteButtonProp = new PadActionButtonProps()
        this.onMouseDown = () =>{}
    }
}

export default PadHeaderProp