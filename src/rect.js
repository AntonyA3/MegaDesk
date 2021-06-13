export class Rect{
    static containsPoint(point, rect){
        let rectCenter = [rect.x + rect.width * 0.5, rect.y + rect.height * 0.5]
        let dx = point[0] - rectCenter[0]
        if(Math.abs(dx) > rect.width * 0.5) return false
        let dy = point[1] - rectCenter[1]
        if(Math.abs(dy) > rect.height * 0.5) return false
        return true
    }
}

export default Rect