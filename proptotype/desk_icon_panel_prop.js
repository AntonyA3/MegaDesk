import CreateDeskIconProp from "./create_desk_icon_prop";
import DeskIconProp from "./desk_icon_prop";

export class DeskIconPanelProp{
    constructor(){
        this.deskIcons = []
        this.createDeskIcon = new CreateDeskIconProp()
    }
}

export default DeskIconPanelProp