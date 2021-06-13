import BackgroundProp from "./background_prop"
import DeskProp from "./desk_prop"
import GuiProp from './gui_prop'

export class AppState{
    constructor(){
        this.desk = new DeskProp()
        this.background = new BackgroundProp()
        this.gui = new GuiProp()
    }
}

export default AppState