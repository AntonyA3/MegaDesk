import Pad from './Pad.jsx'
import Matrix3x3 from './Matrix3x3.js'
export const Desk = prop =>{
    let x = prop.x
    let y = prop.y
    let scaleX = prop.scaleX
    let scaleY = prop.scaleY
    let pads = prop.pads
    const mat = Matrix3x3.multiply(
        Matrix3x3.translation(x, y),
        Matrix3x3.scale(scaleX, scaleY)
    );
    const style = {
        position: 'fixed',
        transformOrigin: '50% 50%',
        transform:`matrix(${mat[0]},${mat[1]},${mat[3]},${mat[4]},${mat[6]},${mat[7]})`,
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
    }

    return <div style={style}>
        {pads.map((pad, i) =>{
            return Pad(pad)
        })}
    </div>
}

export default Desk