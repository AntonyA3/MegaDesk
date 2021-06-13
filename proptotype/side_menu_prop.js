import Rect from "./rect";
import SideMenuButtonProp from "./side_menu_button_prop";


export class SideMenuProp{
    constructor(){
        this.rect = new Rect(0,0, 64, 100)
        this.buttons = [
            new SideMenuButtonProp()
        ]
    }
}

export default SideMenuProp