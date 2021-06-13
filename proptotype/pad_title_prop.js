import Rect from "./rect";

export class PadTitleProp{
    static Mode ={
        Edit: 0,
        Display: 1
    }
    constructor(){
        this.rect = new Rect(),
        this.title = 'untitled'
        this.onDoubleClick = e =>{}
        this.onMouseDown = e =>{}
        this.mode = PadTitleProp.Mode.Display
    }
}

export default PadTitleProp