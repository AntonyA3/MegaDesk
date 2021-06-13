import {Tab} from './enums'

export const MainMenu = props =>{
    let app = props.app
    return <div className='main-menu-background' >
        <div className='text-border'>
            <div className='main-menu-header'>
                <div className='main-menu-title-container'>
                    <h1 className='main-menu-header'>Mega Desk</h1>
                </div>
            </div>

            <div className='main-menu-content'>
                <div className='main-menu-left-content'>
                    <h2>Welcome To Mega Desk</h2>
                    <p>A desktop is an abstraction of an office desk. </p>
                    <p>But a <span>Mega Desk</span> is more than an abstraction of more than an office desk</p>
                </div>
                <div className='main-menu-right-content'>
                    <div><h2>Your Mega Desk</h2>
                    <div className='main-menu-new-mega-desk' onClick={
                        e => app.setState(state =>{
                            state.tab = Tab.Desk
                            return state
                        })
                    }>
                        New Mega Desk
                    </div>
                    
                    </div>
                </div>
               
            </div>
        </div>
        

    </div>
}

export default MainMenu