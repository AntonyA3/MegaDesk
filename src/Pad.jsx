
import React from 'react'
import { render } from 'react-dom';
import {ContentType} from './enums'
import Matrix3x3 from './matrix_3x3';
import {Direction} from './enums'
import {BoxMove, BoxScale, HeaderButton, MovableWindowHeader ,ScaleGizmo,VerticalSplitPlane } from './common_components.jsx';

const padClose = (app, pad) =>{
    app.setState(state =>{
        
        state.desk.pads = state.desk.pads.filter(p => {
            return p !== pad
        })
        return state
    })
}
const PadDefaultProps = {
    HEADER_HEIGHT: 32,
    MIN_HEIGHT: 48,
    MIN_WIDTH: 144
}

export const PadProperties = (x,y,width, height) =>{
    return  {
        x: x,
        y: y,
        width: width,
        height: height,
        title: 'untitled',
        minimized: false,
        editingTitle: false,
        contentType: ContentType.Empty,
        isCloseButtonDown:false,
        content: {}
        
    }
}

export const Pad = props =>{
    let pad = props.pad
    let app = props.app

    let height = pad.minimized ? PadDefaultProps.HEADER_HEIGHT :pad.height 

    let style = {
        position: 'absolute',
        left: pad.x +'px',
        top: pad.y + 'px',
        width: pad.width + 'px',
        height: height + 'px',
        backgroundColor:'green',
        borderStyle:'ridge'

    }
    return <div className='desk-pad' style={style}>        
        <PadHeader pad={pad} app={app}/>
        {pad.minimized ? null : <PadContentContainer pad={pad} app={app}/> }      
        <PadGizmo pad={pad} app={app}/>
    </div>
  
}

const PadTitleEditor  = props =>{
    let app = props.app
    let pad = props.pad

    return <input type='text' value={pad.title} className='desk-pad-title' style={{
        position: 'absolute',
        left: '4px',
        top: '4px',
        bottom: '4px',
        width: '50%',
        cursor: 'text',
        resize: 'none'
    }} 
    onChange = {e =>{
        app.setState(state =>{
            pad.title = e.target.value
            return state
        })
    }}
    onKeyDown={ e =>{
        if(e.key.toLowerCase() =='enter'){
            app.setState(state =>{
                pad.title = e.target.value
                pad.editingTitle = false
                return state
            })
            
        }
    }}
    onMouseLeave={e =>{
        pad.title = e.target.value
        document.onmousedown = ec =>{
            app.setState(state =>{
                pad.title = e.target.value
                pad.editingTitle = false
                return state
            })
            document.onmousedown = e =>{}
        }
    }}
    onMouseEnter={e =>{
        pad.title = e.target.value
        document.onmousedown = e =>{}
    }}>
        
    </input> 
}

const PadTitleContainer = props =>{
    let app = props.app
    let pad = props.pad
    if(!pad.editingTitle){
        return <div className='desk-pad-title' style={{
            position: 'absolute',
            left: '4px',
            top: '4px',
            bottom: '4px',
            width: '50%',
            wordBreak:'keep-all',
            overflowY:'hidden',
            overflowX: 'hidden'
        }}
        onClick = {     
            e =>{
                app.setState(state =>{
                    pad.editingTitle = true
                    return state
                })
            }}
        onMouseOver={e =>{
            e.target.style.cursor = 'pointer'
        }}>
            <span>{pad.title}</span>
        </div> 


    }else{
        return <PadTitleEditor app={app} pad={pad}/>    
    
    }
    
}

const PadEmptyContent = props =>{
    let app = props.app
    let pad = props.pad
    return <div className='desk-pad-empty-content' 
        style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            height: '100%',
            width: '100%',
            backgroundColor: '#729FCF'
        }}
        onClick={e =>{
            app.setState(state =>{
                state.contentSelectorMenu = true
                state.lastEmptyPad = pad
                return state
            })
        }}>
            <img src='../assets/empty-content.svg' width='100%' height='100%' style={{
                userSelect: 'none'
            }} 
            onMouseOver={e =>{
                e.target.style.cursor = 'pointer'
            }}>
                
            </img>

    </div>  
}
const PadTextContent = props =>{
    let pad = props.pad
    let app = props.app
    return <div contentEditable className='desk-pad-text-content' 
        style={{
            position: 'absolute',
            left: '0px',
            top:'0px',
            height: '100%',
            width: '100%'
        }} onChange={e =>{
            app.setState(state =>{
                return state
            })
        }}>
    </div>
}

const PadImageContent = props =>{
    let pad = props.pad
    let width = pad.width
    let height = pad.height - PadDefaultProps.HEADER_HEIGHT
    let aspectRatio = width / height
    let imageAspectRatio = pad.content.width / pad.content.height
    let padWider = aspectRatio > imageAspectRatio
    let multiplier = 1
    let left = 0;
    let top = 0
    let imageWidth = 0
    let imageHeight = 0
    if(padWider){
        multiplier = height / pad.content.height
        imageWidth = multiplier * pad.content.width
        imageHeight = multiplier * pad.content.height
        left = (width - imageWidth) * 0.5
    }else{
        multiplier = width / pad.content.width
        imageWidth = multiplier * pad.content.width
        imageHeight = multiplier * pad.content.height
        top = (height - imageHeight) * 0.5

    }
    
    return <div className='desk-pad-image-content'>
        <img src={pad.content.url} style={{
            position: 'absolute',
            top: top + 'px',
            left: left + 'px',
            height: imageHeight + 'px',
            width: imageWidth + 'px',
            backgroundColor: 'black'
                    
        }}></img>
    </div>
}

const PadJukeBoxContent = props =>{
    let pad = props.pad
    let app = props.app
    let audio = app.audioLoader.getAudio(pad.content.src)
    return <div>
        <audio controls 
        onPlay={ e =>{
            audio.play()
        }}
        onPause={e =>{
            audio.pause()
        }}
        ></audio>
    </div>
    
}

class PadModelContent extends React.Component{
    constructor(props){
        super(props)
        this.refs = React.createRef()
    }

    componentDidUpdate(){
        this.redraw()
    }

    
    componentDidMount(){
        this.redraw()
    }

    redraw(){
        let app = this.props.app
        let pad = this.props.pad
        let canvas = app.canvas3d
        
        let gl = app.gl
        let padWidth = this.props.pad.width
        let padHeight = this.props.pad.height - PadDefaultProps.HEADER_HEIGHT
        canvas.width = padWidth
        canvas.height = padHeight
        
        gl.viewport(0, 0, padWidth, padHeight);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);  
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
    
        gl.bindBuffer(gl.ARRAY_BUFFER,pad.content.vertexBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,pad.content.indexBuffer)

        gl.vertexAttribPointer(
            app.shaderPrograms[0].attribs.vertex,
            3,
            gl.FLOAT,
            false,
            6 * 4,
            0
        )
        gl.enableVertexAttribArray(app.shaderPrograms[0].attribs.vertex);

        gl.vertexAttribPointer(
            app.shaderPrograms[0].attribs.vertexNormal,
            3,
            gl.FLOAT,
            false,
            6 * 4,
            3 * 4 
        );
        gl.enableVertexAttribArray(app.shaderPrograms[0].attribs.vertexNormal);

        gl.useProgram(app.shaderPrograms[0].program);
        gl.uniformMatrix4fv(app.shaderPrograms[0].attribs.modelMatrix, false,Matrix3x3.identity())
        gl.uniformMatrix4fv(app.shaderPrograms[0].attribs.projectionMatrix, false,Matrix3x3.perspective(1, 100 ,padWidth / padHeight ,Math.PI / 2))
        gl.uniformMatrix4fv(app.shaderPrograms[0].attribs.viewMatrix, false, Matrix3x3.translate(0, 0, -10));
        gl.uniform3f(app.shaderPrograms[0].attribs.lightDirection, 0.0,0.0,1.0);
        gl.drawElements(gl.TRIANGLES,pad.content.indexArray.length, gl.UNSIGNED_SHORT, 0);


        let ctx =this.refs.drawCanvas.getContext('2d')
        ctx.drawImage(this.props.app.canvas3d,0,0)
    }

    render(){
        let padWidth = this.props.pad.width
        let padHeight = this.props.pad.height - PadDefaultProps.HEADER_HEIGHT
        return <canvas width={padWidth} height={padHeight} ref='drawCanvas'>
        </canvas>
    }
}


const PadContent = props =>{
    let pad = props.pad
    let app = props.app
    switch (pad.contentType){
        case ContentType.Empty:
            return <PadEmptyContent pad={pad} app={app}/>
        case ContentType.Text:
            return <PadTextContent pad={pad} app={app}/>
        case ContentType.Image:
            return <PadImageContent pad={pad} app={app}/>
        case ContentType.JukeBox:
            return <PadJukeBoxContent pad={pad} app={app}/>
        case ContentType.Model3D:
            return <PadModelContent pad={pad} app={app}/>
        default:
            break;
    }
}
const PadContentContainer = props =>{
    let pad = props.pad
    let app = props.app
    return <div className='desk-pad-content' style={{
        position: 'absolute',
        left:'0px',
        top:PadDefaultProps.HEADER_HEIGHT + 'px',
        width: pad.width + 'px',
        height: (pad.height - PadDefaultProps.HEADER_HEIGHT) + 'px',
    }}>
        <PadContent pad={pad} app={app}/>
    </div>
}

const PadHeader = ({app, pad}) => {
    return <MovableWindowHeader app={app} entity={pad} height={32}>
            <PadTitleContainer pad={pad} app={app}/>
            <PadDelete pad={pad} app={app}/>
            <PadEdit pad={pad} app={app}/>
            <PadMinimize pad={pad} app={app}/>
        </MovableWindowHeader>
}

const PadDelete = ({app, pad}) => {
    return <HeaderButton app={app} entity={pad} right='4px' top='50%' onClick={
      e =>padClose(app, pad)
    } imgSrc={'../assets/close-button.svg'}>

    </HeaderButton>
}

const PadEdit = ({app, pad}) => {
    return <HeaderButton app={app} entity={pad} right='24px' top='50%' onClick={
      e =>{}
    } imgSrc='../assets/edit-button.svg'>

    </HeaderButton>
}

const PadMinimize = ({app, pad}) => {
    return <HeaderButton app={app} entity={pad} right='44px' top='50%' onClick={
        e =>{app.setState(state =>{
            pad.minimized = !pad.minimized
            return state
        })}} 
    imgSrc='../assets/minimize-button.svg'>

    </HeaderButton>
    }


const PadScale = (app, pad, direction) => BoxScale(app, pad,PadDefaultProps.MIN_WIDTH, PadDefaultProps.MIN_HEIGHT, direction)
const PadGizmo = ({app, pad}) =>{
    return <ScaleGizmo app={app} entity={pad} scaleFunc={PadScale} minimizable={true}/>
}