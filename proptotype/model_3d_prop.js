import Camera from "./camera"
import { ContentType } from "./enums"
import Matrix4x4 from "./matrix_4x4"
import Rect from "./rect"


export class Model3dProp{
    constructor(renderProp){
        this.type = ContentType.Model3D
        this.verticies = []
        this.indicies = []
        this.rect = new Rect()
        this.vbo = -1
        this.ebo = -1
        this.modelMatrix = Matrix4x4.identity()
        this.renderProp = renderProp
        this.camera = new Camera()
        this.onMouseDown = () =>{}
        this.onMouseUp = () =>{}



    }
}

export default Model3dProp