import App from "./app.jsx"
import Home from "./home.jsx"
import React from 'react'
import AppController from "./app_controller.js"
import RouterController from "./my_router_controller.js"
import MyRouterProp from "./my_router_prop.js"

export class MyRouter extends React.Component{
    constructor(props){
        super(props)
        this.state = new MyRouterProp()
        this.controller = new RouterController(this)
        this.createActiveView = this.createHomeView
    }

    componentDidMount(){
        this.setState(this.state)
        this.controller.init()
    }

    getView(){
        switch (this.state.activeView) {
            case (this.state.homeProp):
                return React.createElement(Home,this.state.homeProp, null)
            case(this.state.appProp):
                return React.createElement(App,this.state.appProp, null)            
        }
    }

    render(){
        return <div>
            {this.getView()}
        </div>
    }
}

export default MyRouter