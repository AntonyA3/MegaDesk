import PadContent from './pad_content.jsx'
import PadHeader from './pad_header.jsx'
import PadHeaderProp from './pad_header_prop.js'
import PadProp from './pad_prop.js'
import PadScalePulley from './pad_scale_pulley.jsx'
import PadScalePulleyProp from './pad_scale_pulley_prop.js'

export const Pad = props =>{
    let rect = props.rect
    rect.width = Math.max(rect.width, PadProp.MIN_WIDTH)
    rect.height = Math.max(rect.height,PadProp.MIN_HEIGHT)

    let header = props.headerProp
    header.rect.width = rect.width
    header.rect.height = PadHeaderProp.DEFAULT_HEIGHT

    let content = props.contentProp
    content.rect.y = header.rect.height
    content.rect.width = rect.width
    content.rect.height = rect.height - header.rect.height

    let leftPulley = props.scaleTopLeftPulley
    leftPulley.rect.x = -4
    leftPulley.rect.y = -4
    leftPulley.rect.width = PadScalePulleyProp.DEFAULT_WIDTH
    leftPulley.rect.height = PadScalePulleyProp.DEFAULT_HEIGHT

    let rightPulley = props.scaleBottomRightPulley
    rightPulley.rect.x = props.rect.width - PadScalePulleyProp.DEFAULT_WIDTH + 4
    rightPulley.rect.y = props.rect.height - PadScalePulleyProp.DEFAULT_HEIGHT + 4
    rightPulley.rect.width =  PadScalePulleyProp.DEFAULT_WIDTH
    rightPulley.rect.height = PadScalePulleyProp.DEFAULT_HEIGHT

    let style = {
        position: 'absolute',
        left: rect.x + 'px',
        top: rect.y + 'px',
        width: rect.width + 'px',
        height:  rect.height + 'px',
        backgroundColor: 'pink',
        border: '4px solid red',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        borderStyle: 'ridge'

    }
    return <div style={style}>
        {[
            PadHeader(header),
            PadContent(content),
            PadScalePulley(leftPulley),
            PadScalePulley(rightPulley)
        ]}
    </div>
}

export default Pad