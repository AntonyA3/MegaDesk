

export const Matrix3x3 ={
    identity: () =>{
        return [
            1,0,0,
            0,1,0,
            0,0,1
        ]
    },
    scale: (sx,sy) =>{
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ]
    },
    translation: (x, y) =>{
        return [
            1, 0, 0,
            0, 1, 0,
            x, y, 1 
        ]
    },

    multiply: (m, n) =>{
        let m11 = m[0] 
        let m12 = m[3]
        let m13 = m[6] 
        let m21 = m[1]
        let m22 = m[4]
        let m23 = m[7]
        let m31 = m[2]
        let m32 = m[5]
        let m33 = m[8]

        let n11 = n[0] 
        let n12 = n[3]
        let n13 = n[6] 
        let n21 = n[1]
        let n22 = n[4]
        let n23 = n[7]
        let n31 = n[2]
        let n32 = n[5]
        let n33 = n[8]


        return [
            m11 * n11 + m21 * n12 + m31 * n13, m11 * n21 + m21 * n22 + m31 * n23, m11 * n31 + m21 * n32 + m31 * n33,
            m12 * n11 + m22 * n12 + m32 * n13, m12 * n21 + m22 * n22 + m32 * n23, m12 * n31 + m22 * n32 + m32 * n33,
            m13 * n11 + m23 * n12 + m33 * n13, m13 * n21 + m23 * n22 + m33 * n23, m13 * n31 + m23 * n32 + m33 * n33

        ]
       

    }
    
}

export default Matrix3x3