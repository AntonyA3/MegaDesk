import Rect from './rect'
import { PadProperties, Pad } from './Pad.jsx'
import { FavLink,FavLinkProperties} from './fav_link.jsx'
import {DeskPanelButtonType, DragButtonState} from './enums'
import { NoteProperties, Note } from './notes.jsx'
import {WebFrameProperties, WebFrame} from './web_frame.jsx'
const DraggableButton = (imagePath, addItemFunc) =>{
    return {
        type: DeskPanelButtonType.Draggable,
        x: 0, 
        y: 0,
        width: 54,
        height: 54,
        originX: 0,
        originY: 0,
        scale: 1,
        state: DragButtonState.NotDragging,
        imagePath: imagePath,
        addItemFunc: addItemFunc
    }
}

const ClickButton = (imagePath, actionFunc) =>{
    return {
        x: 0, 
        y: 0,
        width: 54,
        height: 54,

        scale: 1,
        imagePath: imagePath,
        actionFunc: actionFunc
    }
}
const normalizeVector = (v) =>{
    let m = 1/Math.sqrt(v[0] * v[0] + v[1] * v[1])
    return [v[0] * m, v[1] * m]
}
const subtractVector = (v0, v1) =>{
    return [v0[0]- v1[0], v0[1] - v1[1]]
}
const addVector = (v0, v1) =>{
    return [v0[0] + v1[0], v0[1] + v1[1]]
}

const scaleVector = (v, s) =>{
    return [v[0] * s, v[1] * s]
}
const dotProduct = (v0, v1) =>{
    return v0[0] * v1[0] + v0[1] * v1[1]
}
const addBoxEntity = (app, x, y, width, height, array, propFunc) =>{
    let halfWidth = width * 0.5
    let halfHeight = height * 0.5
    app.setState(state =>{
        array.push(
            propFunc(x - halfWidth, y - halfHeight, width, height)
        )
        return state
    }) 
}

const addPad = (app, x, y) => addBoxEntity(app, x, y, 144, 144,app.state.desk.pads,PadProperties)
const addFavLink = (app, x, y) =>  addBoxEntity(app, x, y, 64, 64,app.state.desk.favLinks,FavLinkProperties)
const addNote = (app, x, y) => addBoxEntity(app, x, y, 128, 128,app.state.desk.notes,NoteProperties)
const openSetting = (app, button) =>{
    buttonScale(app, button, 0.6, 10)

}

export const addWebFrame = (app, x, y) => addBoxEntity(app, x, y, 128, 128,app.state.desk.webFrames, WebFrameProperties)
export const buttonScale = (app,button, target, rate) =>{
    let v = 0
    if(target < button.scale){
        v = -rate * 0.016
    }else{
        v = rate * 0.016
    }
    let scale = setInterval(() =>{
        app.setState(state =>{
            button.scale += rate
            let pred = (rate < 0) ? (button.scale <= target): (button.scale >= target)
            if(pred){
                button.scale = target
                clearInterval(scale)
            } 
            return state
        })
    }, 16)
}

export const initDesk = (app) =>{
    let buttons = [
        DraggableButton('../assets/add-pad-button.svg', addPad),
        DraggableButton('../assets/add-icon-button.svg', addFavLink),
        DraggableButton('../assets/add-notes-button.svg', addNote),
        DraggableButton('../assets/add-web-frame.svg', addWebFrame)
    ]
     
    app.setState(state =>{
        state.deskPanelButtons = buttons
        state.settingsButton = ClickButton('../assets/settings-button.svg',openSetting)
        return state
    })
}

const SettingsButton = props =>{
    let button = props.button
    let app = props.app
    button.x = 4
    button.y = app.state.deskPanelButtons.length * 64 + 4
    return<img src={button.imagePath} width={'100%'} height={'auto'} 
        style={{
            userSelect: 'none',
            position: 'absolute',
            left: button.x + 'px',
            top: button.y + 'px',
            width: button.width + 'px',
            height: button.height + 'px',
            transform: `scale(${button.scale},${button.scale})`
        }}
        onClick={e =>{
            button.actionFunc(app, button)
        }}
        onMouseEnter={e =>{
            buttonScale(app, button, 1.2,10)
        }}
        onMouseLeave={e =>{
            buttonScale(app, button, 1.0,10)
        }}>
    </img>
}

export const Desk = props =>{
    let app = props.app
    return <div style={{backgroundColor: 'pink',
        overflowY:'hidden',
        overflowX:'hidden'
    }}>
        <div className='desk-background' 
            onMouseDown={e =>{
                document.onmousemove = e =>{
                    app.setState(state =>{
                        state.desk.x += e.movementX
                        state.desk.y += e.movementY
                        return state
                    })

                    
                }
                document.onmouseup = e =>{
                    document.onmousemove = e=>{}
                    document.onmouseup = e =>{}
                }
            }}
            style={{
                transform: `translate(${app.state.desk.x}px, ${app.state.desk.y}px)`
            }}>
        </div>
        <div className='desk-container' style={{
            transform: `translate(${app.state.desk.x}px, ${app.state.desk.y}px)`
        }}>
            {[
                app.state.desk.pads.map((pad, i) =>{
                    return <Pad pad={pad} app={app}/>               
                }),
                app.state.desk.favLinks.map((favLink, i) =>{
                    return <FavLink app={app} favLink={favLink}/>
                }),
                app.state.desk.notes.map((note, i) =>{
                    return <Note app={app} note={note}/>
                }),
                app.state.desk.webFrames.map((webFrame, i) =>{
                    return <WebFrame app={app} webFrame={webFrame}/>
                })
            ]}
        </div>

        <div className='desk-panel-left'>
            {app.state.deskPanelButtons.map((button,i) =>{
                let onMouseEnter = e =>{}
                let onMouseLeave = e =>{}
                button.originX = 4
                button.originY = i * 64 + 4
                if(button.state == DragButtonState.NotDragging){
                    button.x = 4
                    button.y = i * 64 + 4
                    onMouseEnter = e =>{
                        buttonScale(app, button, 1.2, 10)
                    }
                    onMouseLeave = e =>{
                        buttonScale(app, button, 1.0, 10)
                    }

                
                }
                
                
                return <div>
                    <img src={button.imagePath} width={'100%'} height={'auto'} 
                        style={{
                            userSelect: 'none',
                            position: 'absolute',
                            left: button.x + 'px',
                            top: button.y + 'px',
                            width: button.width + 'px',
                            height: button.height + 'px',
                            transform: `scale(${button.scale},${button.scale})`
                        }}>
                    </img>
                    <div 
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseDown={e =>{
                        buttonScale(app, button, 0.6, 10)
                        document.onmousemove = e =>{
                            app.setState(state =>{
                                button.x += e.movementX
                                button.y += e.movementY
                                button.state = DragButtonState.Dragging
                                return state
                            })
                        }
                        document.onmouseup = e =>{
                            let x = button.x + button.width * 0.5 - app.state.desk.x
                            let y = button.y + button.height * 0.5 - app.state.desk.y
                            button.addItemFunc(app, x, y)
                            buttonScale(app, button, 1.0, 10)
                            let move = setInterval(() =>{
                                let pos = [button.x, button.y]
                                let target = [button.originX, button.originY]
                                let direction = normalizeVector(subtractVector(target, pos))
                                let speed = 5000 * 0.016                        
                                pos = addVector(pos, scaleVector(direction, speed))
                                app.setState(state =>{
                                    button.x = pos[0]
                                    button.y = pos[1]
                                    if(dotProduct(direction, subtractVector(target,pos)) <= 0){
                                        button.x = target[0]
                                        button.y = target[1]
                                        clearInterval(move)
                                        button.state = DragButtonState.NotDragging
                                    }
                                    return state
                                })
                            },16)
                
                            document.onmouseup = e =>{}
                            document.onmousemove = e =>{}
                        }
                    }}
                    
                    style={{
                            position: 'absolute',
                            left: button.x + 'px',
                            top: button.y + 'px',
                            width: button.width + 'px',
                            height: button.height + 'px',
                            transform: `scale(${button.scale},${button.scale})`}}>
                    </div>
                </div>
                    
            })}
            {
            app.state.settingsButton == null ? null : 
                <SettingsButton app={app} button={app.state.settingsButton }></SettingsButton>

            }
        </div>  


        
        {app.renderContentMenu()}

    </div>
}


export default Desk
