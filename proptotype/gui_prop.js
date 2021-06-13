import ContentChoiceMenuProp from './content_choice_menu_prop'
import DeskTitleProp from './desk_title_prop'
import HomeButtonProp from './home_button_prop'
import SideMenuProp from './side_menu_prop'
export class GuiProp{
    constructor(){
        this.contentChoiceMenu = new ContentChoiceMenuProp()
        this.sideMenu = new SideMenuProp()
        this.deskTitle = new DeskTitleProp()
        this.homeButton = new HomeButtonProp();

    }
}

export default GuiProp