import Rect from './rect'
import PadHeaderProp from './pad_header_prop.js'
import PadContentProp from './pad_content_prop.js'
import PadScalePulleyProp from './pad_scale_pulley_prop.js'
export class PadProp{
    static MIN_WIDTH = 128
    static MIN_HEIGHT = 48
    constructor(){
        this.rect = new Rect(0,0,128,128)
        this.headerProp = new PadHeaderProp()
        this.contentProp = new PadContentProp()
        this.scaleTopLeftPulley = new PadScalePulleyProp()
        this.scaleBottomRightPulley = new PadScalePulleyProp()
    }
}
export default PadProp