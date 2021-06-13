

class MainContoller{
    constructor(appController, homeController){
        this.appController = appController
        this.homeController = homeController
        this.activeView = this.homeController.view
    }

    init(){
        this.homeController.view.setState(state =>{
            state.deskIconPanel.createDeskIcon.onClick = e =>{
                this.activeView = state.appController.view
            }
            
            
            
            return state
        })
    }
}