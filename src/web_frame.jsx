import {Direction} from './enums'
import {BoxMove, BoxScale, MovableWindowHeader, HeaderButton, ScaleGizmo } from './common_components.jsx'
const WebFrameState = {
    SrcFrame: 0,
    EditFrame: 1,
    DisplayFrame:2
}

export const WebFrameProperties = (x, y, width, height) =>{
    return{
        x: x,
        y: y,
        width: width,
        height: height,
        src: '',
        resizing: false,
        minimized: false,
        state:  WebFrameState.RequestSource
    }
}
const urlValid = url =>{
    try{
        let result = new URL(url)
    }catch(_){
        return false
    }
    return true
}
const OverFrame = props =>{
    return <div style={{
        position: 'absolute',
        left: '0px',
        right:'0px',
        top: '0px',
        bottom:'0px',
    }}>
        
    </div>
}
const WebFrameHeader = ({app, webFrame}) => {
    return <MovableWindowHeader app={app} entity={webFrame} height={32}>
        <UrlField app={app} webFrame={webFrame}/>
        <CloseButton app={app} webFrame={webFrame}/>
        <MinimizeButton app={app} webFrame={webFrame}/>
    </MovableWindowHeader>
}

const NoSrcFrame = props =>{
    let app = props.app
    let webFrame = props.webFrame
    return <div style={{
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'grey'
    }}>

    </div>

}
const UrlField = props =>{
    let app = props.app
    let webFrame = props.webFrame
    return <div style={{
        position: 'absolute',
        left: '4px',
        width: 'calc(100% - 64px)',
        top: '4px',
        bottom: '8px',
        backgroundColor: 'white',
        borderTopRightRadius: '16px',
        borderBottomRightRadius: '16px'
        
    }}>
    <input type={'text'} rows={1} style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            resize: 'none',
            paddingRight: '0px',
            paddingBottom: '0px',
            paddingLeft: '0px',
            paddingTop: '0px',
            marginRight: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginTop: '0px',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px'

        }} placeholder='https://'
        onKeyDown={e =>{
            if(e.key.toLowerCase() == 'enter'){
                app.setState(state =>{
                    if(urlValid(e.target.value)){
                       webFrame.src = e.target.value
                       webFrame.state = WebFrameState.DisplayFrame 
                    }else{
                        e.target.value
                        webFrame.state = WebFrameState.NoSrcFrame 
                    }
                    
                    return state
                })
            }
        }}>

       </input >

    </div>
}

const WebFrameModeTemplate = ({app, webFrame, children}) =>{
    return<div style={{
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'beige'
    }}>
        {children}
    </div>
}

const EditFrame = props =>{
    return <WebFrameModeTemplate app={props.app} webFrame={props.WebFrame}/>

}

const DisplayFrame = props =>{
    let webFrame = props.webFrame
    return <WebFrameModeTemplate app={props.app} webFrame={props.WebFrame}>
        <iframe src={webFrame.src} width={webFrame.width} height={webFrame.height - 32}/>
    </WebFrameModeTemplate>
}


const CloseButton = ({app,webFrame}) =><HeaderButton 
        app={app}
        webFrame={webFrame} 
        right={'4px'}
        top='50%'
        onClick={e =>{app.setState(state =>{
            app.state.desk.webFrames = app.state.desk.webFrames.filter(wf =>{
                return wf != webFrame
            })
            return state 
        })}}
        imgSrc='../assets/close-button.svg'>
    </HeaderButton> 
    

const MinimizeButton = ({app,webFrame}) =><HeaderButton 
app={app}
webFrame={webFrame} 
right={'24px'}
top='50%'
onClick={e =>{
    app.setState(state =>{
        webFrame.minimized = !webFrame.minimized
        return state
    })}}
imgSrc='../assets/minimize-button.svg'>
</HeaderButton> 

const WebFrameScale = (app, webFrame, direction) =>{
    BoxScale(app, webFrame, 128, 64, direction)
    app.setState(state =>{
        webFrame.resizing = true
        return state
    })
    document.onmouseup = e =>{
        app.setState(state =>{
            webFrame.resizing = false
            return state
        })
        document.onmouseup = e =>{}
        document.onmousemove = e =>{}
        
    }
}


const WebFrameGizmo = ({app, webFrame}) => {
    return <ScaleGizmo app={app} entity={webFrame} scaleFunc={WebFrameScale} minimizable={true}/>
}

export const WebFrameContent = props =>{
    let app = props.app
    let webFrame = props.webFrame

    let content = () =>{
        switch (webFrame.state) {
            case WebFrameState.NoSrcFrame:    
                return <NoSrcFrame app={app} webFrame={webFrame}/>
            case WebFrameState.EditFrame:
                return <EditFrame app={app} webFrame={webFrame}/>
            case WebFrameState.DisplayFrame:
                return <DisplayFrame app={app} webFrame={webFrame}/>
        }
    }

    return <div style={{
        position: 'absolute',
        left: '0px',
        top: '32px',
        width: webFrame.width + 'px',
        height: (webFrame.minimized ? 0 : webFrame.height - 32) + 'px',
    }}>
        { content()}
    </div>
    
}
    
export const WebFrame = props =>{
    let app = props.app
    let webFrame = props.webFrame

    return <div style={{
        position: 'absolute',
        left: webFrame.x + 'px',
        top: webFrame.y + 'px',
        width: webFrame.width + 'px',
        height: (webFrame.minimized ? 32 : webFrame.height) + 'px',
        backgroundColor: 'blue',
    }}>
        
        <WebFrameHeader app={app} webFrame={webFrame}/>
        <WebFrameContent app={app} webFrame={webFrame}/>
        <WebFrameGizmo app={app} webFrame={webFrame}/>
        {webFrame.resizing ? <OverFrame app={app} webFrame={webFrame}/>: null}


    </div>
}