import ContentChoiceMenu from './content_choice_menu.jsx'
import DeskTitle from './desk_title.jsx'
import HomeButton from './home_button.jsx'
import SideMenu from './side_menu.jsx'

export const Gui = props =>{
    return<div>
        {[
            SideMenu(props.sideMenu),
            ContentChoiceMenu(props.contentChoiceMenu),
            DeskTitle(props.deskTitle),
            HomeButton(props.homeButton)
        ]}
    </div>

}

export default Gui