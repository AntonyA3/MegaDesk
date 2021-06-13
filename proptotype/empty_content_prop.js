import {ContentType} from './enums.js'
import Rect from './rect.js'

export class EmptyContentProp{
    constructor(){
        this.type = ContentType.Empty
        this.rect = new Rect(0,0,64,64)
        this.onClick = () =>{}
    }
}

export default EmptyContentProp