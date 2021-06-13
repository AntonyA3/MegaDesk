


export const HomeButton = props =>{
    let rect = props.rect
    let style ={
        position: 'absolute',
        left: 256 + 'px',
        top: 0 + 'px',
        width: 64+ 'px',
        height: 64+ 'px',
        backgroundColor: 'purple'
    }

    return <div style={style} onClick={props.onClick}>

    </div>
}

export default HomeButton