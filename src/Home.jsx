import {Tab} from './enums'

export const Home = props =>{
    return <div className='home-container'>
        <div className='home-box' onAnimationEnd={e =>{
            props.app.setState(state =>{
                state.tab = Tab.MainMenu
                return state
            })
        }}>
        </div>
    </div>   
}

export default Home