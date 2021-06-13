import Matrix4x4 from "./matrix_4x4";

export class Camera{
    constructor(){
        this.position = [0,0,0]
        this.orientation = [1,0,0,0]
        this.viewMatrix = Matrix4x4.translation([0,0,-10]);
        this.projectionMatrix = Matrix4x4.perspective(1, 100, 1.0, Math.PI / 2)
    }
}

export default Camera