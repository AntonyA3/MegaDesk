
export class PadConnectorSplineProp{
    static ConnectionSide ={
        Left: 0,
        Right: 1,
        Top: 2,
        Bottom: 3
    }
    constructor(pad1, pad2){
        this.pad1 = pad1
        this.pad2 = pad2
        this.pad1Side = PadConnectorSplineProp.ConnectionSide.Left
        this.pad2Side = PadConnectorSplineProp.ConnectionSide.Right

        


    }
}

export default PadConnectorSplineProp