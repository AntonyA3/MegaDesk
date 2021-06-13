import DeskIconProp from "./desk_icon_prop"
import DeskModel from "./desk_model"
import DeskProp from "./desk_prop"


export class RouterController{
    constructor(view){
        this.view = view
        this.currentDesk = -1
    }
    
    init(){
        let desks = localStorage.getItem('desks')
        if(desks == null){
            localStorage.setItem('desks',JSON.stringify([]))
            desks = localStorage.getItem('desks')
            
        }
        let deskData = JSON.parse(desks)

        for(var i = 0; i < deskData.length; i++){
          this.view.setState(state =>{
            this.view.state.homeProp.deskIconPanel.deskIcons.push(new DeskIconProp())
            return state
          })  
        }
        
       
        this.setClickers()


        this.view.state.homeProp.deskIconPanel.createDeskIcon.onClick = e =>{
            this.view.setState(state =>{
                this.view.state.homeProp.deskIconPanel.deskIcons.push(new DeskIconProp())
                state.activeView = state.appProp
                deskData.push(new DeskProp())
                localStorage.setItem('desks', JSON.stringify(deskData))

            
                return state
            })
        }
        this.view.state.appProp.gui.homeButton.onClick = e =>{
            this.view.setState(state =>{
                state.activeView = state.homeProp
                let deskData = JSON.parse(localStorage.getItem('desks'))
                deskData[this.currentDesk] = this.view.state.appProp.desk
                localStorage.setItem('desks', JSON.stringify(deskData))
                this.setClickers()

                
                return state
            })
        }
        
    }

    setClickers(){
        this.view.state.homeProp.deskIconPanel.deskIcons.map((icon,i) => {
            this.view.setState(state =>{
                icon.onClick = e =>{
                    this.currentDesk = i
                    this.view.setState(state =>{
                        state.appProp.desk = JSON.parse(localStorage.getItem('desks'))[i]
                        console.log(state.appProp.desk)
                        state.activeView = state.appProp
                        return state
                    })
                    
                }
                return state
            })

        })
        
    }
}

export default RouterController