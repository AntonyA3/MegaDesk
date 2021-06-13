import DeskProp from './deskProp.js'
export const appState = {
    /*
    buttonPanel:{
        x: 0, 
        y: 0,
        width: 64,
        height: 100,
        buttons: [
            {
                x: 4,
                y: 4, 
                width: 56,
                height: 56,
                color: 'yellow',
                onClick: () =>{}, 
                onMouseOver: ()=>{},
                onMouseLeave: ()=>{}

            }
        ]
    },
    */
    desk: new DeskProp(),
    /*
    contentSelectionPanel:{
        boxProp: new BoxProp(256,256,128,128),
        visible: false,
        items:[
            {
                text:"text",
                onClick: () =>{}
            },
            {
                text:"image",
                onClick: () =>{
                }
            },
            
            {
                text:"3d model",
                onClick: () =>{}
            }
        ]
    }
    */

}

export default appState
