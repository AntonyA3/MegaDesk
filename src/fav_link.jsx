
import { HeaderButtonLeft, BoxMove } from './common_components.jsx'
import {addWebFrame} from './Desk.jsx'
const FavLinkMethod ={
    InternalWindow: 0,
    ExternalWindow: 1
}

export const FavLinkProperties = (x,y,width,height) =>{
    return {
        x: x,
        y: y,
        editing: true,
        width: width,
        height: height,
        hyperlink: '',
        faviconLink: '',
        openMethod: FavLinkMethod.ExternalWindow
    }
}
const setHyperlink = (favLinkProp,hyperlink) =>{
    favLinkProp.hyperlink = hyperlink
    let [protocol, host] = favLinkProp.hyperlink.split('//')
    let root = host.split('/')[0]
    favLinkProp.faviconLink = protocol + '//' + root + '/favicon.ico'

}

const urlValid = url =>{
    try {
        let result = new URL(url);
    } catch (_) {
        return false;  
    }
      return true
}



const FavSelector = props =>{
    let favLink = props.favLink
    if(favLink.editing){
        return <IconEdit app={props.app} favLink={props.favLink}/>
    }
    return <Icon app={props.app} favLink={props.favLink}/>
}

const IconEdit = props =>{
    let favLink = props.favLink
    let app = props.app
    return <div>
        <div style={{
            position: 'absolute',
            left: (favLink.x - 16) + 'px',
            top: (favLink.y - 16) +'px',
            width: (128 + 32) + 'px',
            height: (32 + 32) +'px',
            backgroundColor: 'purple'
         }}
        onMouseDown={e =>{
            BoxMove(app, favLink)      
        }}>
            <FavLinkDelete app={app} favLink={favLink}/>
        </div>
        <textarea placeholder='Enter url here' style={
        {
            position: 'absolute',
            left: favLink.x,
            top:favLink.y,
            width: '128px',
            height: '32px',
            backgroundColor: 'orange',
            borderRadius: '10px',
            resize: 'none'
        }
        } onKeyDown={e =>{
        if(e.key.toLowerCase() == 'enter'){
            let url= e.target.value
            if(urlValid(url)){
                app.setState(state =>{
                    setHyperlink(props.favLink,url)
                    favLink.editing = false  
                    return state
                })
            }
        }
    }}>
    </textarea>         

    </div>
     
}
const FavLinkDelete =({app,favLink}) => <HeaderButtonLeft
app={app} entity={favLink} left={'0px'} top={'0px'} onClick={
e =>{
    app.setState(state =>{
        state.desk.favLinks = state.desk.favLinks.filter(fl =>{
            fl != favLink
        })
        return state
    })
    e.stopPropagation()
}

} imgSrc='../assets/close-button.svg'/>

const Icon = props =>{
    let favLink = props.favLink
    let app = props.app
    let title = 'unknown'

    return <div style={{
        position: 'absolute',
        left: favLink.x + 'px',
        top: favLink.y + 'px',
        width: favLink.width + 'px',
        height: favLink.height + 'px',
    }}>
       <div style={{
            position: 'absolute',
            left: -8 + 'px',
            top: -8 +'px',
            width: (64 + 16) + 'px',
            height: (64 + 16) +'px',
            borderStyle: 'dotted',
            borderColor: 'purple',
            borderWidth: '2px'
            }}
        onMouseDown={e =>{
            BoxMove(app, favLink)      
        }}>

            <FavLinkDelete app={app} favLink={favLink}/>
     
        </div>
        
        <a href={favLink.hyperlink} draggable={false} target='_blank'>
            <img draggable={false} src={favLink.faviconLink} width={'64px'} height={'64px'} style={{
                position: 'absolute',
                imageRendering: 'crisp-edges'
            }}></img>
        </a>
        
        
    </div>
    
    
}

export const FavLink = props =>{
    return <div style={{
        position: 'absolute',
        left: props.x + 'px',
        top: props.y + 'px',
        width: props.width + 'px',
        height: props.height + 'px',
        backgroundColor: 'orange'
    }}>
        <FavSelector app={props.app} favLink={props.favLink}/>
    </div>
}