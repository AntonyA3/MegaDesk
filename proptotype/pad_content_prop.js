import EmptyContentProp from './empty_content_prop.js'
import Rect from './rect.js'
export class PadContentProp{
    constructor(){
        this.rect = new Rect()
        this.cont = new EmptyContentProp()
    }
}

export default PadContentProp