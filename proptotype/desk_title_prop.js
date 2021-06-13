

export class DeskTitleProp{
    static Mode = {
        Display: 0,
        Edit: 1
    }
    constructor(){
        this.title = "untitled desk"
        this.mode = DeskTitleProp.Mode.Display
        this.onDoubleClick = e =>{}
    }
}

export default DeskTitleProp