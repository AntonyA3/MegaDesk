import React from 'react'
import AppState from'./app_state.js'
import AppController from './app_controller.js'
import Desk from './desk.jsx'
import Gui from './gui.jsx'
import Background from './background.jsx'

export class App extends React.Component{
  
    constructor(props){
        super(props)
        this.state = props || new AppState()
        this.controller = new AppController(this)

    }

    componentDidMount(){
        this.setState(this.state)
        this.controller.init()
    }

    render(){
        return <div>
            {
                [
                    Background(this.state.background),
                    /*
                    <svg width={100} height={100} style={{ position:'absolute',}}>
                        <line x1={0} y1={0} x2={100} y2={100} style={{ stroke:'red',strokeWidth:2}}/>
                    </svg>,
                    <svg width={100} height={100} style={{ position:'absolute', left:'200px', top:'200px'}}>
                        <path  d="M0,0 C25,90 100,100 50,50" style={{ fill:'transparent', stroke:'red',strokeWidth:2}}></path>
                    </svg>,
                    */
                    Desk(this.state.desk), 
                    
                    Gui(this.state.gui)

                ]

                    
            }     
        </div>
    }

}



export default App