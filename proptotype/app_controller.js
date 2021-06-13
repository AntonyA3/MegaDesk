import AudioContentProp from './audio_content_prop.js'
import ContentChoiceButtonProp from './content_choice_button_prop.js'
import { ContentType } from './enums.js'
import ImageContentProp from './image_content_prop.js'
import ObjReader from './obj_reader.js'
import PadProp from './pad_prop.js'
import TextContentProp from './text_content_prop.js'
import Model3dProp from './model_3d_prop.js'
import Camera from './camera.js'
import LambertVertexShader from './lambert_vertex_shader.js'
import LambertFragmentShader from './lambert_fragment_shader.js'
import Matrix4x4 from './matrix_4x4.js'
import PadTitleProp from './pad_title_prop.js'
import PadConnectorSplineProp from './pad_connector_spline_prop.js'
import DeskTitleProp from './desk_title_prop.js'


export class AppController{
    constructor(view){
        this.view = view
        this.mouseIsDown = false
        this.shared3dRender = {
            canvas: document.getElementById('canvas'),
            gl: undefined,
            program: -1,
            programData:{}

        }
        this.shared3dRender.gl = this.shared3dRender.canvas.getContext('webgl')
    

        document.body.appendChild(this.shared3dRender.canvas)
        this.shared3dRender.canvas.style.border = '1px solid black'
        this.shared3dRender.canvas.style.zIndex = 100
        let gl = this.shared3dRender.gl

        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader,LambertVertexShader);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(vertexShader));
            gl.deleteShader(vertexShader);
        }
  
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, LambertFragmentShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(fragmentShader));
            gl.deleteShader(fragmentShader);
        }

        let program =  gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
            return null;
        }

        this.shared3dRender.program = program
        this.shared3dRender.programData ={
            vertex: gl.getAttribLocation(this.shared3dRender.program, 'vertex'),
            normal: gl.getAttribLocation(this.shared3dRender.program, 'vertexNormal'),
            modelMatrix: gl.getUniformLocation(this.shared3dRender.program, "modelMatrix"),
            projectionMatrix: gl.getUniformLocation(this.shared3dRender.program, "projectionMatrix"),
            viewMatrix: gl.getUniformLocation(this.shared3dRender.program, "viewMatrix")
        
        }
    }

    
    init(){
        this.view.setState(state =>{
            let pad1 =new PadProp()
            let pad2 = new PadProp()
            state.desk.pads.push(pad1)
            state.desk.pads.push(pad2)
            state.desk.lineConnectors.push(new PadConnectorSplineProp(pad1, pad2))
            return state
        })

        document.onwheel = e =>{
            
        }
        this.view.setState(state =>{
            state.gui.deskTitle.onDoubleClick = e =>{
                this.view.setState(state =>{
                    state.gui.deskTitle.mode = DeskTitleProp.Mode.Edit
                    document.onkeydown = e =>{
                        if(e.key.toLowerCase() == 'enter'){
                            this.view.setState(state =>{
                                state.gui.deskTitle.mode = DeskTitleProp.Mode.Display
                                return state
                            })
                            
                        }
                    }
                    return state
                })
            }
            return state
        })
        this.view.setState(state =>{
            state.desk.onMouseDown = e =>{
                document.onmousemove = e =>{
                    this.view.setState(state =>{
                        state.desk.transform.x += e.movementX
                        state.desk.transform.y += e.movementY
                        return state
                    })
                }
            }

            state.desk.onMouseUp = e =>{
                document.onmousemove = e =>{}
            }
            return state
        })

        document.onmousemove = e =>{}
        document.onmouseup = e =>{
            document.onmousemove = e =>{}

        }

        this.view.setState(state =>{

            let pads = this.view.state.desk.pads
            pads.forEach(pad => {
                this.initializePad(pad)
            });
            return state
        })
            
        this.view.setState(state =>{
            state.gui.contentChoiceMenu.choices[0].text = 'add text'
            state.gui.contentChoiceMenu.choices[0].onClick = e =>{
                state.gui.contentChoiceMenu.active  =false

                this.addTextContentToPanel()
            }
        })

        this.view.setState(state =>{
            state.gui.contentChoiceMenu.choices[1].text = 'add image'
            state.gui.contentChoiceMenu.choices[1].onClick = e =>{
                state.gui.contentChoiceMenu.active = false

                this.addImageContentToPanel()
            }
            return state
        })

        this.view.setState(state =>{
            state.gui.contentChoiceMenu.choices[2].text = 'add audio'
            state.gui.contentChoiceMenu.choices[2].onClick = e =>{
                state.gui.contentChoiceMenu.active = false
                this.addAudioContentToPanel()
            }
            return state
        })

        this.view.setState(state =>{
            state.gui.contentChoiceMenu.choices.push(new ContentChoiceButtonProp())
            state.gui.contentChoiceMenu.choices[3].text = 'add 3d model'
            state.gui.contentChoiceMenu.choices[3].onClick = e =>{
                state.gui.contentChoiceMenu.active = false
                this.addModel3dContentToPanel()
            }
            return state
        })

        this.view.setState(state =>{

            state.gui.sideMenu.buttons[0].onClick = e =>{
                this.view.setState(state =>{
                    let pad = new PadProp()
                    this.initializePad(pad)
                    state.desk.pads.push(pad)
                    return state

                })
            }
            state.gui.sideMenu.buttons.push(new ContentChoiceButtonProp())
            state.gui.sideMenu.buttons[1].onClick = e =>{}
            
            state.gui.sideMenu.buttons.push(new ContentChoiceButtonProp())
            state.gui.sideMenu.buttons[2].onClick = e =>{
                //add new connected pad
            }
            state.gui.sideMenu.buttons.push(new ContentChoiceButtonProp())
            state.gui.sideMenu.buttons[3].onClick = e =>{
                //add new connected pad
            }
            state.gui.sideMenu.buttons.push(new ContentChoiceButtonProp())
            state.gui.sideMenu.buttons[4].onClick = e =>{
                //add new connected pad
            }
            state.gui.sideMenu.buttons.push(new ContentChoiceButtonProp())
            state.gui.sideMenu.buttons[5].onClick = e =>{
                //add new connected pad
            }
            return state
        })
    }

    addImageContentToPanel(){
        let fileElement = document.createElement("input")
        fileElement.type = 'file'
        fileElement.style.display = 'none'

        fileElement.onchange = e =>{
            let reader = new FileReader()
            reader.onload = e =>{
                let url = e.target.result
                let imageProp = new ImageContentProp()
                imageProp.imageUrl = url;
                let image = document.createElement("img")
                image.onload = e =>{
                    imageProp.imageWidth = image.width
                    imageProp.imageHeight = image.height
                    imageProp.aspectRatio = imageProp.imageWidth / imageProp.imageHeight
                    this.view.setState( state =>{
                         let pad = this.contentAction.pad
                         pad.contentProp.cont = imageProp
                         return state
                     }) 
                 }
                image.src = url
                
                
            }
            reader.readAsDataURL(fileElement.files[0])
            
        }
        
        fileElement.click()

    }

    addTextContentToPanel(){
        this.view.setState(state =>{
            let pad = this.contentAction.pad
            pad.contentProp.cont = new TextContentProp()
            return state
        })
        
        

    }

    addAudioContentToPanel(){
        let fileElement = document.createElement("input")
        fileElement.type = 'file'
        fileElement.style.dispvertexNormallay = 'none'

        fileElement.onchange = e =>{
            let reader = new FileReader()

            reader.onload = e =>{
                let url = e.target.result
                let audioProp = new AudioContentProp()
                audioProp.audioUrl = url;

                this.view.setState( state =>{
                    let pad = this.contentAction.pad
                    pad.contentProp.cont = audioProp
                    return state
                })
               
                
            }
            reader.readAsDataURL(fileElement.files[0])
            
        }
        
        fileElement.click()
    }


    initializePad(pad){
        pad.headerProp.onMouseDown = e =>{
            document.onmousemove = e =>{
                this.view.setState(state =>{
                    pad.rect.x += e.movementX
                    pad.rect.y += e.movementY
                    return state
                })  
            }
            e.stopPropagation()
             
        }
        pad.headerProp.titleProp.onMouseDown = e =>{
            e.stopPropagation()
        }
        pad.headerProp.titleProp.onDoubleClick = e =>{
            this.view.setState(state =>{
                pad.headerProp.titleProp.mode = PadTitleProp.Mode.Edit
                document.onkeydown = e =>{
                    if(e.key.toLowerCase() == 'enter'){
                        this.view.setState(state =>{
                            pad.headerProp.titleProp.mode = PadTitleProp.Mode.Display
                            return state
                        })
                        
                    }
                }
                return state
            })
            e.stopPropagation()
            
        }

        pad.scaleTopLeftPulley.onMouseDown = e =>{
            document.onmousemove = e =>{
                this.view.setState(state =>{

                    let moveX = e.movementX
                    let moveY = e.movementY
                    if((pad.rect.width - moveX) < PadProp.MIN_WIDTH){
                        moveX = pad.rect.width - PadProp.MIN_WIDTH 
                    }
                    if((pad.rect.height - moveY) < PadProp.MIN_HEIGHT){
                        moveY = pad.rect.height- PadProp.MIN_HEIGHT 
                    }
                    pad.rect.width -= moveX
                    pad.rect.height -= moveY

                    pad.rect.x += moveX
                    pad.rect.y += moveY
                    
                    return state
                })   
            }
            e.stopPropagation()

        }

        pad.scaleBottomRightPulley.onMouseDown = e =>{
            document.onmousemove = e =>{
                this.view.setState(state =>{
                    pad.rect.width += e.movementX
                    pad.rect.height += e.movementY
                    return state
                })  
            }
            e.stopPropagation()

        }

        pad.headerProp.deleteButtonProp.onClick = e=>{
            this.view.setState(state =>{
                state.desk.lineConnectors = state.desk.lineConnectors.filter(con =>{
                    return pad != con.pad1 && pad != con.pad2
                })
                state.desk.pads = state.desk.pads.filter( t =>{
                    return t != pad
                })
                return state
            })
        }

        switch(pad.contentProp.cont.type){
            case ContentType.Empty:
                pad.contentProp.cont.onClick = e =>{
                    this.view.setState(state =>{
                        state.gui.contentChoiceMenu.active = true
                        this.view.onclick =  e=>{
                            this.view.setState(state =>{
                                state.gui.contentChoiceMenu.active = false
                            })
                        }
                        this.contentAction = {
                            pad: pad
                        }
                        return state
                    })
                }
                break;
        }
    }

    addModel3dContentToPanel(){
        let fileElement = document.createElement("input")
        fileElement.type = 'file'
        fileElement.style.display = 'none'

        fileElement.onchange = e =>{
            let reader = new FileReader()

            reader.onload = e =>{
                let objText = e.target.result
                let meshData = ObjReader.getModelData(objText);
                let vertexArray = meshData.vertexArray
                let normalArray = meshData.normalArray
                let indexArray = meshData.indexArray
                let modelProp = new Model3dProp(this.shared3dRender)
                let gl = this.shared3dRender.gl
                modelProp.verticies = vertexArray.map((vertex, i) =>{
                    return [vertex,  normalArray[i]].flat()
                }).flat()
                modelProp.indicies = indexArray

                modelProp.vbo = gl.createBuffer()
                gl.bindBuffer(gl.ARRAY_BUFFER, modelProp.vbo)
                gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(modelProp.verticies), gl.STATIC_DRAW)

                modelProp.ebo = gl.createBuffer()
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, modelProp.ebo)
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelProp.indicies), gl.STATIC_DRAW)

                modelProp.onMouseDown = e =>{
                    document.onmousemove = e =>{
                        this.view.setState(state =>{
                                modelProp.modelMatrix = Matrix4x4.multiply(
                                Matrix4x4.rotationY(e.movementX * 0.1),
                                modelProp.modelMatrix
                            )
                            return state
                        })
                    }
                }

                modelProp.onMouseUp = e =>{
                    document.onmousemove = e =>{}
                }

                modelProp.camera = new Camera()
                this.view.setState( state =>{
                    let pad = this.contentAction.pad
                    pad.contentProp.cont = modelProp
                    return state
                })          
            }
            reader.readAsText(fileElement.files[0])
            
        }
        
        fileElement.click()
    }

}
export default AppController