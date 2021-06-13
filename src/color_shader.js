
export const ColorShader ={
    vertexShader:`
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
    `,
    fragmentShader:`
    precision mediump float;
    varying vec3 normal;
    uniform vec3 ulightDirection;
    void main() {
        gl_FragColor = vec4(vec3(1.0,0.0,1.0)* max(dot(normal, ulightDirection),0.1),1.0);
    }
    `
}

export default ColorShader
