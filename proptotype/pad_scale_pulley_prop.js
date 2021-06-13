import Rect from "./rect";

export class PadScalePulleyProp{
    static DEFAULT_HEIGHT = 8
    static DEFAULT_WIDTH = 8
    constructor(){
        this.rect = new Rect()
        this.onMouseDown = () =>{}
    }
}

export default PadScalePulleyProp