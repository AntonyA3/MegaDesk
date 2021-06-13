import Bar from './PadHeader'
import Content from'./Content.jsx'
import {ContentType} from './enums.js'

export const Pad = props =>{
    let boxProps = props.boxProps
    let x = boxProps.x
    let y = boxProps.y
    let width = boxProps.width
    let height = boxProps.height
    const style = {
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor:color,
        border: '1px solid black',
    }
    switch(content.type){
        case ContentType.Image:
            let aspectRatio = content.data.width / content.data.height
            style.width = 128 * aspectRatio
            style.height = 128 + 32
            break
    }
    bar.x = 0
    bar.y = 0
    bar.width = style.width
    bar.height = 32

    content.x = 0
    content.y = bar.height
    content.width = style.width
    content.height = height - bar.height

 
    return <div style= {style}>
        {[
            Pa(bar),
            Content(content),
        ]}
    </div>
}

export default Pad