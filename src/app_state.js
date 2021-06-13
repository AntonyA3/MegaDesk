import {Tab} from './enums'
export class AppState{
    constructor(){
        this.tab = Tab.Home
        this.contentSelectorMenu = false
        this.lastEmptyPad = null
        this.desk = {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            targetX: 0,
            targetY: 0,
            pads: [],
            favLinks:[],
            notes: [],
            webFrames: [],
            background:{
                contentType: 'image',
                content:{},
                allowAnimation: true,
                moveModeX: 'dynamic',
                moveModeY: 'static',
                stretchX: false,
                stretchY: false,
                repeatX: true,
                repeatY: true

            }
        }
        this.deskPanelButtons = []
        this.settingsButton = null
    }
}
export default AppState