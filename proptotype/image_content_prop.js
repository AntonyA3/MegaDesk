import { ContentType } from "./enums"
import Rect from "./rect"

export class ImageContentProp{
    constructor(){
        this.type = ContentType.Image
        this.rect = new Rect(0,0,128,128)
        this.imageUrl = ""
        this.imageWidth = 0
        this.imageHeight = 0
        this.aspectRatio = 1

    }
}

export default ImageContentProp