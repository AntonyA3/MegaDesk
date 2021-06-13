
import React from 'react'

import DeskIconPanel from './desk_icon_panel.jsx'
import DeskIconPanelProp from './desk_icon_panel_prop.js'
import HomeController from './home_controller.js'

import HomeState from "./home_state"

export class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = props || new HomeState()
        this.controller = new HomeController(this)

    }

    componentDidMount(){
        this.setState(this.state)
        this.controller.init()
    }

    render(){     
        return <div>
            {DeskIconPanel(this.state.deskIconPanel)}
        </div>
        
    }

}

export default Home