
export class Matrix3x3{
    static identity(){
        return [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        ]
    }

    static translate(x,y,z){
        return [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            x,y,z,1
        ]
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
}

export default Matrix3x3