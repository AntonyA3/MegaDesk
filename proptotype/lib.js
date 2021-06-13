const AxisAngle = {
    toQuarternion: function(axis, angle){
        let s = Math.sin(angle * 0.5);
        let c = Math.cos(angle * 0.5);
        return[c, axis[0] * s, axis[1] * s, axis[2] * s]
    }
}

const Vector3 ={
    scale(v, s){
        return [v[0] * s, v[1] * s, v[2] * s];
    },
    add(v0, v1){
        return [v0[0] + v1[0], v0[1] + v1[1], v0[2] + v1[2]];
    },
    normalize(v){
        let div = 1 / Vector3.length(v);
        return Vector3.scale(v, div)
    },
    length(v){
        return Math.sqrt(Vector3.lengthSquared(v))
    },
    lengthSquared(v){
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    },
    dot(v0, v1){
        return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2];
    },
    subtract(v0, v1){
        return[
            v0[0] - v1[0],
            v0[1] - v1[1],
            v0[2] - v1[2]
        ]
    }
    
}
const Quarternion = {
    identity: function(){
        return [1,0,0,0];
    },
    inverse: function (q){
        return Quarternion.scale([q[0],-q[1],-q[2],-q[3]], 1 / Quarternion.magnitude(q));

    },
    scale:function(q, s){
        return [q[0] * s, q[1] * s, q[2] * s, q[3] * s]
    },
    magnitudeSquared: function(q){
        return q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3];

    },
    magnitude: function(q){
        return Math.sqrt(Quarternion.magnitudeSquared(q));

    },
    transform(vec, quart){
        let inverse = Quarternion.inverse(quart);
        let p = [1.0,vec[0], vec[1], vec[2]];
        let p2 = Quarternion.multiply(inverse,Quarternion.multiply(p, quart));
        return [p2[1],p2[2],p2[3]];
    },
    rotate(q0, q1){
        let inverse = Quarternion.inverse(q1)
        return  Quarternion.multiply(q1,q0);
    },
    multiply(p, q){
        return[
            p[0] * q[0] - p[1] * q[1] - p[2] * q[2] - p[3] * q[3],
            p[0] * q[1] + p[1] * q[0] + p[2] * q[3] - p[3] * q[2],
            p[0] * q[2] - p[1] * q[3] + p[2] * q[0] + p[3] * q[1],
            p[0] * q[3] + p[1] * q[2] - p[2] * q[1] + p[3] * q[0]
        ]
    }
}


function containsPoint(rect, point){
    if(point[0]< rect.x || point[0] >(rect.x + rect.width)) return false;
    if(point[1]< rect.y || point[1] >(rect.y + rect.height)) return false;
    return true;
}