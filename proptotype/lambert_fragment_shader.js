
export const LambertFragmentShader = `
precision mediump float;
varying vec3 normal;
uniform vec3 ulightDirection;
void main() {
    gl_FragColor = vec4(vec3(1.0,0.0,1.0)* max(dot(normal, ulightDirection),0.5),1.0);
}

`

export default LambertFragmentShader