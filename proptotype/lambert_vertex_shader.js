export const LambertVertexShader = ` 
attribute vec3 vertex;    
attribute vec3 vertexNormal;            
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
varying vec3 normal;
void main() {
    mat4 normalMatrix = modelMatrix;
    normalMatrix[0][3] = 0.0;
    normalMatrix[1][3] = 0.0;
    normalMatrix[2][3] = 0.0;
    normal = (normalMatrix * vec4(vertexNormal, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vertex,1.0);
}

`

export default LambertVertexShader