

export const Background = props =>{
    let style = {
        position: 'absolute',
        left: '0px',
        right: '0px',
        top: '0px',
        bottom: '0px',
        backgroundColor: props.color,
        backgroundImage: 'url(../background.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    }

    return <div style={style}></div>
}

export default Background