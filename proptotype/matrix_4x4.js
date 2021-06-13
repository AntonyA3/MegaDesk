

export class Matrix4x4{
    static identity(){
        return[
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        ]
    }
    static scale(scale){
        return[
            scale[0],0,0,0,
            0,scale[1],0,0,
            0,0,scale[2],0,
            0,0,0,1
        ]
    }
    static translation(translation){
        return[
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            translation[0],translation[1],translation[2],1
        ]
    }
    static xVector(m){
        return [m[0], m[4], m[8]];
    }
    static yVector(m){
        return [m[1], m[5], m[9]];
    }
    static zVector(m){
        return [m[2], m[6], m[10]];
    }
    static transform(m, v){
        let x = m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12];
        let y = m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13];
        let z = m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14];
        return[x,y,z]

    }
    
    static multiply(mat1, mat2){
        let m = [
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0
            ]

        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                let index = j * 4 + i;
                
                let m0 = mat2[0 + (j * 4)];
                let m1 = mat2[1 + (j * 4) ];
                let m2 = mat2[2 + (j * 4)];
                let m3 = mat2[3 + (j * 4)];

                let n0 = mat1[0 + i];
                let n1 = mat1[4 + i];
                let n2 = mat1[8 + i];
                let n3 = mat1[12 + i]
                
                m[index] =  m0 * n0 + m1 * n1 + m2 * n2 + m3 * n3;
            }
        }
        return m;
    }
    static perspective(near, far, aspectRatio, fov){
        let p = 1 / Math.tan(fov * 0.5);
        return[
            p * (1/aspectRatio),0,0,0,
            0,p,0,0,
            0,0,(-near-far) / (near - far), (2 * far * near) / (near - far),
            0,0,-1,0 
        ]
    }
    static rotationY(rotation){
        let c = Math.cos(rotation);
        let s = Math.sin(rotation);
        return[
            c,0,s,0,
            0,1,0,0,
            -s,0,c,0,
            0,0,0,1
        ]
    }
    static fromQuarternion(q){
        let m = [
            0,0,0,0,
            0,0,0,0,
            0,0,0,0,
            0,0,0,0
        ]
        m[0] =  2 * (q[0] * q[0] + q[1] * q[1]) -1;
        m[1] = 2 *(q[1] * q[2] + q[0] * q[3]);
        m[2] = 2 * (q[1] * q[3] - q[0] * q[2]);
        m[3] = 0;
        m[4] = 2 *(q[1] * q[2] - q[0] * q[3]) ;
        m[5] = 2 * (q[0] * q[0] + q[2] * q[2]) - 1;
        m[6] = 2 * (q[2] * q[3] + q[0] * q[1]);
        m[7] = 0;
        m[8] = 2 * (q[1] * q[3] + q[0] * q[2]);
        m[9] = 2 * (q[2] * q[3] - q[0] * q[1]);
        m[10] =  2 * (q[0] * q[0] + q[3] * q[3]) - 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] =1; 
        return m;
    }

    
}

export default Matrix4x4