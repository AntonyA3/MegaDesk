import { Direction } from "./enums"


export const MovableWindowHeader = ({app,entity,height,children}) =>{
    return MovableWindowHeader_2({app,entity,height, width:'100%', children, backgroundColor:'purple'})
}
export const MovableWindowHeader_2 = ({app,entity,height, width ,children, backgroundColor}) =>{
    let style = {
        position: 'absolute',
        top: '0px',
        width: width,
        height: height,
        backgroundColor: backgroundColor
    }
    let grabbing = false
    return <div className='desk-pad-header' style={style}
    onMouseDown={e =>{   
        BoxMove(app, entity)
        grabbing = true

    }}
    onMouseUp={e =>{
        e.target.style.cursor = 'grab'
        grabbing = false
    }}
    onMouseEnter={e =>{
        if(!grabbing){
            e.target.style.cursor = 'grab'
        }else{
            e.target.style.cursor = 'grabbing'
        }
    }}
    onMouseLeave={e =>{
        if(!grabbing){
            e.target.style.cursor = 'grab'
        }else{
            e.target.style.cursor = 'grabbing'
        }
    }}>
        {children}
    </div>
}


export const VerticalSplitPlane = (leftContent, rightContent, topHeight, bottomHeight) =>{
    return <div style={{
        position:'absolute',
        left: '0px',
        top: '0px',
        right:'0px',
        bottom:'0px'
    }}>
        <div style={{
            position:'absolute',
            left: '0px',
            top: '0px',
            width: '100%',
            height: topHeight
        }}>
            {leftContent()}
        </div>
        <div style={{
            position:'absolute',
            left: '0px',
            top: topHeight,
            width: '100%',
            height: bottomHeight

        }}>
            {rightContent}
        </div>

    </div>
}

export const HeaderButton = ({app, entity, right, top, onClick, imgSrc}) => {
    return HeaderButtonTemplate({app, entity, x:right, top, onClick, imgSrc,side:'right'}) 

}

export const HeaderButtonTemplate = ({app, entity, x, top, onClick, imgSrc, side}) =>{
    let style ={
        position:'absolute',
        top: top,
        transform: 'translateY(-50%)',
        width: '16px',
        height: '16px',
    }
    
    switch(side){
        case 'left':
            style.left = x
            break;
        case 'right':
            style.right = x
            break
    }
    return <div style={style} 
        onClick={onClick}
        onMouseOver={e =>{
            e.target.style.cursor = 'pointer'
        }}
        onMouseLeave={e =>{
            e.target.style.cursor ='initial'
        }}>
        <img draggable={false} src={imgSrc} width='100%' height={'auto'}  style={{
            userSelect:'none',
            MozUserSelect:'none',
            WebkitUserSelect:'none'
        }}>

        </img>
    </div>
}

export const HeaderButtonLeft = ({app, entity, left, top, onClick, imgSrc}) =>{
    return HeaderButtonTemplate({app, entity, x:left, top, onClick, imgSrc, side:'left'}) 
}

export const ScaleGizmo =({app,entity,scaleFunc, minimizable}) =>{
    if(minimizable){
        if(entity.minimized){
            return <div>
                <div className='desk-pad-west-pulley' onMouseDown={ e=>{
                    scaleFunc(app, entity, Direction.W)
                }}></div>
                <div className='desk-pad-east-pulley' onMouseDown={ e=>{
                    scaleFunc(app, entity, Direction.E)
                }}></div>
            </div>
        }   
    }
    return <div>
        <div className='desk-pad-north-pulley' onMouseDown={ e=>{
            scaleFunc(app, entity, Direction.N)
        }}></div>
        <div className='desk-pad-south-pulley' onMouseDown={ e=>{
            scaleFunc(app, entity, Direction.S)
        }}></div>
        <div className='desk-pad-west-pulley' onMouseDown={ e=>{
            scaleFunc(app, entity, Direction.W)
        }}></div>
        <div className='desk-pad-east-pulley' onMouseDown={ e=>{
            scaleFunc(app, entity, Direction.E)
        }}></div>
        <div className='desk-pad-north-west-pulley' onMouseDown={ e=>{
            scaleFunc(app, entity, Direction.NW)
        }}></div>
        <div className='desk-pad-south-west-pulley' onMouseDown={ e=>{
            scaleFunc(app, entity, Direction.SW)
        }}></div>
        <div className='desk-pad-south-east-pulley' onMouseDown={ e=>{
            scaleFunc(app, entity, Direction.SE)
        }}></div>
        <div className='desk-pad-north-east-pulley' onMouseDown={ e=>{
            scaleFunc(app, entity, Direction.NE)
        }}></div>
    </div>

} 

export const BoxScale = (app, boxEntity,minWidth, minHeight, direction) =>{
    let f = e =>{};
    switch (direction) {
        case Direction.N:
            f = e =>{
                let dy = Math.min(e.movementY, boxEntity.height - minHeight)
                boxEntity.height -= dy
                boxEntity.y += dy
            }
            break;
        case Direction.NE:
            f = e =>{
                boxEntity.width = Math.max(boxEntity.width + e.movementX, minWidth)
                let  dy = Math.min(e.movementY, boxEntity.height - minHeight)
                boxEntity.y += dy
                boxEntity.height -= dy
            }
            break
        case Direction.E:
            f = e =>{
                boxEntity.width = Math.max(boxEntity.width + e.movementX, minWidth)
            }
            break
        case Direction.SE:
            f = e =>{
                boxEntity.width = Math.max(boxEntity.width + e.movementX, minWidth)
                boxEntity.height = Math.max(boxEntity.height + e.movementY, minHeight)
            }
            break
        case Direction.S:
            f = e =>{
                boxEntity.height = Math.max(boxEntity.height + e.movementY, minHeight)
            }
            break
        case Direction.SW:
            f = e =>{
                let dx = Math.min(e.movementX, boxEntity.width - minWidth)
                boxEntity.x += dx
                boxEntity.width -= dx
                boxEntity.height = Math.max(e.movementY + boxEntity.height, minHeight)
            }
            break
        case Direction.W:
            f = e =>{
                let dx = Math.min(e.movementX, boxEntity.width - minWidth)
                boxEntity.x += dx
                boxEntity.width -= dx
            }
            break
        case Direction.NW:
            f = e =>{
                let dx = Math.min(e.movementX, boxEntity.width - minWidth)
                let dy = Math.min(e.movementY, boxEntity.height - minHeight)
                boxEntity.x += dx
                boxEntity.width -= dx
                boxEntity.y += dy
                boxEntity.height -= dy
            }
            break
    }

    document.onmousemove = e =>{
        app.setState(state =>{
            f(e)
            return state
        })
    }

    document.onmouseup = e =>{
        document.onmousemove = e =>{}
        document.onmouseup = e =>{}
    }

}


export const BoxMove = (app, boxEntity) =>{
    document.onmousemove = e =>{
        app.setState(state =>{
            boxEntity.x += e.movementX
            boxEntity.y += e.movementY 
            return state
        })
    }
    document.onmouseup = e =>{               
        document.onmouseup = e =>{}
        document.onmousemove = e =>{}
    }

}
