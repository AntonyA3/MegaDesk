import Matrix4x4 from "./matrix_4x4"
import React from 'react'
export class Model3D extends React.Component{
    constructor(props){
        super(props)
        this.canvasRef = React.createRef();    

    }

    updateModel(){
        let props = this.props
        let gl = props.renderProp.gl
        let camera = props.camera
        let globalCanvas = props.renderProp.canvas
        globalCanvas.width = this.props.rect.width
        globalCanvas.height = this.props.rect.height
        camera.projectionMatrix =  Matrix4x4.perspective(1, 100,
            globalCanvas.width / globalCanvas.height, 
            Math.PI / 2)

        let program = props.renderProp.program
        let vertexLoc = props.renderProp.programData.vertex
        let normalLoc = props.renderProp.programData.normal
        let modelMatrixLoc = props.renderProp.programData.modelMatrix;
        let viewMatrixLoc = props.renderProp.programData.viewMatrix;
        let projectionMatrixLoc = props.renderProp.programData.projectionMatrix;
    

        gl.clearColor(0.0,0.0,0.0,1.0)
        gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT)
        gl.viewport(0, 0, props.rect.width, props.rect.height);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);  
        gl.bindBuffer(gl.ARRAY_BUFFER, props.vbo)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, props.ebo)
    
        gl.vertexAttribPointer(
            vertexLoc,
            3,
            gl.FLOAT,
            false,
            6 * 4,
            0
        )
        gl.enableVertexAttribArray(vertexLoc);

        gl.vertexAttribPointer(
            normalLoc,
            3,
            gl.FLOAT,
            false,
            6 * 4,
            3 * 4 
        );
        gl.enableVertexAttribArray(normalLoc);
        
        gl.useProgram(program)
        gl.uniformMatrix4fv(modelMatrixLoc, false, props.modelMatrix)
        gl.uniformMatrix4fv(projectionMatrixLoc, false,camera.projectionMatrix)
        gl.uniformMatrix4fv(viewMatrixLoc, false, camera.viewMatrix);
        gl.drawElements(gl.TRIANGLES, props.indicies.length / 6, gl.UNSIGNED_SHORT, 0);
        
        let ctx = this.canvasRef.current.getContext('2d');

        ctx.drawImage(globalCanvas, 0, 0)
    }
    componentDidUpdate(){
        this.updateModel()
    }
    componentDidMount(){
        this.updateModel()
    }

    render(){
        console.log(this.props.rect.width)
        let style = {
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: this.props.rect.width+'px',
            height: this.props.rect.height +'px',
            backgroundColor: 'purple'
        }

        return <canvas style={style} ref={this.canvasRef} width={this.props.rect.width} height={this.props.rect.height} 
            onMouseDown={this.props.onMouseDown}
            onMouseUp={this.props.onMouseUp}></canvas>
        }
}


export default Model3D