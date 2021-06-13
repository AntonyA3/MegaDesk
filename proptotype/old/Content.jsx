
import {ContentType} from './enums.js'

export const Content = ({x, y, width, height, onClick, type, data}) =>{
    const Data = ({type, data}) =>{
        switch(type){
            case ContentType.Empty:
                return "Empty"
            case ContentType.Text:
                const style = {
                    position: 'absolute',
                    left: '0px',
                    right: '0px'
                }
                return <textarea style={style}></textarea>
            case ContentType.Image:
    
                let width = data.width
                let height = data.height
                let aspectRatio = width / height
                height = 128;
                width = aspectRatio * 128;
                
    
                return  <img width={width +'px'} height={height + 'px'} draggable={false} src={data.src}></img>
            case ContentType.Model3D:
                return <canvas width={128} height={128-32} style={{backgroundColor:'black'}}></canvas>
            case ContentType.Audio:
                return <audio></audio>
            
        }
    
    }
    
    const style = {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        width: width + 'px',
        height: height + 'px',
        backgroundColor:'grey'
    }
    return <div style={style} onClick={onClick}>
            {
                Data({type, data})   
            }
        </div>

}


export default Content