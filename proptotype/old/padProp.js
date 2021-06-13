import {ContentType} from './enums.js'
import BoxProp from './boxProp.js'

export class PadProp{
    constructor(){
        this.boxProp = new BoxProp()
        this.color = 'pink',
        this.onClick = e =>{}
        this.header = new PadHeaderProp()
        this.content ={
            type: ContentType.Empty,
            data: "Empty",
            onClick: () =>{}
            
        }
    }
    

}

export default PadProp