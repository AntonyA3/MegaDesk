import AppState from "./app_state";
import HomeState from "./home_state";


export class MyRouterProp{
    constructor(){
        this.homeProp = new HomeState()
        this.appProp = new AppState()
        this.activeView = this.homeProp
    }
}

export default MyRouterProp