import { BoxMove, MovableWindowHeader_2 } from "./common_components.jsx"
import { HeaderButtonLeft } from "./common_components.jsx"
const NoteState = {
    ReadNote: 0,
    WriteNote: 1
}
export const NoteProperties = (x, y, width, height) =>{
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        text: '',
        color: '#FFFF88',
        overClickMe: false,
        state: NoteState.ReadNote

    }
}

const NoteDragger = ({app, note}) =>{
    return <MovableWindowHeader_2 app={app} 
    entity={note} 
    height={(note.height * 0.3) + 'px'} 
    width={(note.width * 0.8) + 'px'} backgroundColor='transparent'>
        <NoteDelete app={app} note={note}/>
        <NoteActionButton app={app} note={note}/>
    </MovableWindowHeader_2>

}

const NoteActionButton = ({app,note}) =><HeaderButtonLeft 
app={app}
entity={note} 
left={'24px'}
top='50%'
onClick={e =>{
    app.setState(state =>{
        switch(note.state){
            case NoteState.ReadNote:
                note.state = NoteState.WriteNote
                break
            case NoteState.WriteNote:
                note.state = NoteState.ReadNote
                break
        }
        return state
    })
}}
imgSrc='../assets/edit-button.svg'>
</HeaderButtonLeft> 

const NoteWriter = props =>{
    let note = props.note
    let app  = props.app

    return <div width={note.width} height={note.height} style={{
        left: note.x,
        top: note.y,
        content: '../assets/sticky-note.svg',
        position:'absolute'}}>

            <img draggable={false} width={note.width} height={note.height} 
            src='../assets/sticky-note.svg'
            style={{
                userSelect: 'none',
                position: 'absolute'
            }}>
            </img>
            <textarea style={{
                position: 'absolute',
                left: (0.05 * note.height) +'px',
                top: (0.3 * note.height) +'px',
                width: (note.width * 0.8) + 'px',
                height: (note.height * 0.6) + 'px',
                backgroundColor: note.color,
                resize: 'none'
            }} onChange={e =>{
                app.setState(state =>{
                    note.text = e.target.value
                    if(e.target.value.length > 64){
                        note.text = e.target.value.substring(0,64)
                        e.target.value = note.text
                    }
                    return state
                })
            }}>
                {note.text}

            </textarea>
            <span style={{
                position: 'absolute',
                left: (0.1* note.height) +'px',
                top: (0.15 * note.height) +'px',
                width: '64px',
                height:'16px',
                fontSize:'12px'
            }}>{note.text.length}/64</span>
            <NoteDragger app={app} note={note}/>
            


    </div>
}

const NoteDelete = ({app,note}) =><HeaderButtonLeft 
app={app}
entity={note} 
left={'4px'}
top='50%'
onClick={e =>{
    app.setState(state =>{
        app.state.desk.notes = app.state.desk.notes.filter(n =>{
            return n != note
        })
        return state
    })
}}
imgSrc='../assets/close-button.svg'>
</HeaderButtonLeft> 

const NoteReader = props =>{
    let note = props.note
    let app  = props.app
    return <div style={{ 
            left: note.x,
            top: note.y,
            content: '../assets/sticky-note.svg',
            position:'absolute'}}>
                <NoteDragger app={app} note={note}/>
                <img draggable={false}  width={note.width} height={note.height} src='../assets/sticky-note.svg' 
                style={{
                    userSelect: 'none'
                }}/>   
                <abbr title="Click to Edit Note">
                    <p style={{
                    position: 'absolute',
                    left: (0.05 * note.height) +'px',
                    top: (0.2 * note.height) +'px',
                    width: (note.width * 0.8) + 'px',
                    height: (note.height * 0.6) + 'px',
                    resize: 'none',
                    overflowWrap: 'break-word',
                    fontSize: '12px',
                    borderStyle: note.overClickMe ? 'outset' : 'none'    
                    }}
                    onClick={e =>{
                        app.setState(state =>{
                            note.state = NoteState.WriteNote
                            return state
                        })
                    }}
                    onMouseOver={e =>{
                        app.setState(state =>{
                            note.overClickMe = true
                            return state
                        })
                    }}
                    onMouseLeave={e =>{
                        app.setState(state =>{
                            note.overClickMe = false
                            return state
                        })
                    }}>
                        {note.text}
                    </p>
                </abbr>
   
        </div>
    
}

const NoteSelector = props =>{
    let note = props.note
    let app  = props.app

    switch (note.state) {
        case NoteState.ReadNote:
            return <NoteReader note={note} app={app}/>
        case NoteState.WriteNote:
            return <NoteWriter note={note} app={app}/>
    }
}

export const Note = props =>{
    let note = props.note
    let app = props.app
    return <NoteSelector note={note} app={app}/>
    
    
}