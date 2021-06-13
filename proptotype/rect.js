export class Rect{
    constructor(x, y, width, height){
        this.x = x || 0
        this.y = y || 0
        this.width = width
        this.height = height
    }

    toStyleProperties(){
        return {
            left: this.x + 'px',
            top: this.y + 'px',
            width: this.width + 'px',
            height: this.height + 'px'
        }
    }
}

export default Rect