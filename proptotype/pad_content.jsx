import {ContentType} from './enums.js'
import EmptyContent from './empty_content.jsx'
import TextContent from './text_content.jsx'
import ImageContent from './image_content.jsx'
import AudioContent from './audio_content.jsx'
import Model3D from './model_3d.jsx'
export const PadContent = props =>{
    let rect = props.rect
    let cont = props.cont
    let style = {
        position: 'absolute',
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        backgroundColor: 'orange'
    }
    let viewer = (type) =>{
        switch (type) {
            case ContentType.Empty:
                cont.rect.x = 0
                cont.rect.y = 0
                cont.rect.width = rect.width
                cont.rect.height = rect.height
                let c = EmptyContent(cont)   
                return c 
            case ContentType.Text:
                cont.rect.x = 0
                cont.rect.y = 0
                cont.rect.width = rect.width
                cont.rect.height = rect.height
                return TextContent(cont)
            case ContentType.Image:
                cont.rect.x = 0
                cont.rect.y = 0
                cont.rect.width = rect.width
                cont.rect.height = rect.height
                return ImageContent(cont)
            case ContentType.Audio:
                return AudioContent(cont)
            case ContentType.Model3D:
                cont.rect.x = 0
                cont.rect.y = 0
                cont.rect.width = rect.width
                cont.rect.height = rect.height
                return React.createElement(Model3D, cont, null)
            default:
            
                break;
        }
    }
    return <div style={style}>   
        {
            viewer(cont.type)
        }
    </div>
}

export default PadContent