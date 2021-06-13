import React from 'react'
import {Tab, ContentType, DragButtonState} from './enums'
import './app.css'
import './Home.jsx'
import Home from './Home.jsx'
import MainMenu from './MainMenu.jsx'
import { Desk, initDesk } from './Desk.jsx'
import AudioLoader from './audio_loader'
import ShaderProgram from './shader_program'
import ColorShader from './color_shader'
import ObjReader from './obj_reader'
import {DeskPanelButtonType} from './enums'

export class App extends React.Component{
    constructor(props){
        super(props)
        this.state={};
        this.refs = React.createRef()
        this.canvas3d = document.createElement('canvas')
        this.gl = this.canvas3d.getContext('webgl') 
        this.audioLoader = new AudioLoader()
        this.objReader = new ObjReader()
        this.shaderPrograms =[];
    }

    componentDidMount(){
        this.setState(state =>{

            state = this.props
            initDesk(this)

            return state
        })
   
        let gl = this.gl
        let program = ShaderProgram.createShaderProgram(gl,ColorShader.vertexShader,ColorShader.fragmentShader)
        this.shaderPrograms.push(
            {program: program, attribs:{
                vertex: gl.getAttribLocation(program, 'vertex'),
                vertexNormal: gl.getAttribLocation(program, 'vertexNormal'),
                modelMatrix: gl.getUniformLocation(program, 'modelMatrix'),
                projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix'),
                viewMatrix: gl.getUniformLocation(program, 'viewMatrix')
                }
            }
        )

    }


    restoreMoveEvent(){
        document.onmouseup = e =>{}
        document.onmousemove = e =>{}
    }

  
  

    getDeskContentMenuData(){
        let closePanel = () => this.setState(state =>{
            state.contentSelectorMenu = false
            return state
        })
        return [
            {text: 'addText', 
                onClick: e =>{
                    console.log("text added") 
                    this.setState(state =>{
                       state.lastEmptyPad.contentType = ContentType.Text
                       state.lastEmptyPad.content = {text: ""}
                       state.lastEmptyPad = null
                       return state
                    })
                    closePanel()
                }
            },
            {text: 'addImage', 
                onClick: e =>{

                    let fileElement = document.createElement('input')
                    fileElement.type = 'file'
                    fileElement.style.display = 'none'
                    fileElement.accept = 'image/*'
                    fileElement.onchange = e =>{
                        let file = fileElement.files[0]
                        let filereader = new FileReader();
                        filereader.readAsDataURL(file)
                        filereader.onloadend = e =>{
                            let tempImage = document.createElement('img');
                            tempImage.onload = e =>{
                                this.setState(state =>{
                                    state.lastEmptyPad.contentType = ContentType.Image
                                    state.lastEmptyPad.content = {
                                        url: filereader.result,
                                        width: tempImage.width,
                                        height:tempImage.height,     
                                    }
                                    state.lastEmptyPad = null
                                    return state
                                })
                            }
                            tempImage.src = filereader.result 
                        }
                    }
                    fileElement.click();
                    closePanel()
                }
            },
            {text: 'addJukebox', 
                onClick: e =>{
                    let fileElement = document.createElement('input')
                    fileElement.type = 'file'
                    fileElement.style.display = 'none'
                    fileElement.onchange = e=>{
                        let file = fileElement.files[0]
                        let filereader = new FileReader();
                        filereader.readAsDataURL(file)
                        filereader.onloadend = e =>{
                            let audioUrl =  filereader.result

                            this.audioLoader.onComplete =(src, audio) =>{
                                console.log(src)
                                this.setState(state =>{
                                    state.lastEmptyPad.content = {
                                        src: src
                                    }
                                    state.lastEmptyPad.contentType = ContentType.JukeBox
                                    return state
                                })
                            }
                            this.audioLoader.addAudio(audioUrl)

                            
                      
                        }
                    }
                    fileElement.click()
                    closePanel()
                }
            },
            {text: 'add3DModel', 
                onClick: e =>{
                    let gl = this.gl
                    let fileElement = document.createElement('input')
                    fileElement.type = 'file'
                    fileElement.style.display = 'none'
                    fileElement.onchange = e=>{
                        let file = fileElement.files[0]
                        let filereader = new FileReader();
                        filereader.readAsText(file)
                        filereader.onloadend = e =>{
                            let objText =  filereader.result
                            let {vertexArray, indexArray} = this.objReader.getVertsNormIndex(objText)
                            this.setState(state =>{
                                let pad = state.lastEmptyPad
                                pad.content = {
                                    vertexArray: vertexArray,
                                    indexArray: indexArray,
                                    vertexBuffer: this.gl.createBuffer(),
                                    indexBuffer: this.gl.createBuffer()
                                }
                                gl.bindBuffer(this.gl.ARRAY_BUFFER, pad.content.vertexBuffer)
                                gl.bufferData(
                                    gl.ARRAY_BUFFER,
                                    new Float32Array(pad.content.vertexArray),
                                    gl.STATIC_DRAW
                                );

                                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, pad.content.indexBuffer)
                                this.gl.bufferData(
                                    this.gl.ELEMENT_ARRAY_BUFFER,
                                    new Uint16Array(pad.content.indexArray),
                                    gl.STATIC_DRAW
                                );
                                state.lastEmptyPad.contentType = ContentType.Model3D

                                return state
                            })
                        }
                    }
                    fileElement.click()
                    closePanel()
                }
            }
        ]
    }

    renderContentMenu(pad){
        if(this.state.contentSelectorMenu){
            let data = this.getDeskContentMenuData(pad)
            return <div className='desk-content-selector-menu'>
                {data.map((d, i) =>{
                    return <div className='desk-content-selector-menu-button' onClick={d.onClick}>
                        {d.text}
                    </div>
                })}
            </div>

        }
            
    }
   

    renderTab(){
        switch (this.state.tab) {
            case Tab.Home:
                return <Home app={this}/>
            case Tab.MainMenu:
                return <MainMenu app={this}/>             
            case Tab.Desk:
                return <Desk app={this}/>
        }
    }

    render(){
        return <div>
            {this.renderTab()}
        </div>
    }
}

export default App