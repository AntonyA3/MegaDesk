
const FaceType = {
    TriFace: 0,
    QuadFace: 1
}
export class ObjReader{
    constructor(){

    }

    getVertsNormIndex(contents){
        let rows = contents.split("\n")
        let verticies = []
        let uniqueNormals = []
        let normals = []
        let indicies = []
        let faceRead = (columns) =>{
            let faceType = (columns.length == 4) ? FaceType.TriFace : FaceType.QuadFace
            switch(faceType){
                case FaceType.TriFace:
                    for(let i = 1; i < columns.length; i++){
                        let cells = columns[i].split("/")
                        let index = cells[0] - 1
                        let uqNorm = uniqueNormals[cells[2] - 1]
                        indicies.push(cells[0] - 1)
                        normals[index] = [uqNorm[0], uqNorm[1], uqNorm[2]]
                    
                    }
                    break;
                case FaceType.QuadFace:
                    for(let i = 1; i < columns.length; i++){
                        if (i == 1 || i == 2 || i ==3){
                            let cells = columns[i].split("/")
                            let index = cells[0] - 1 /**The unique normal index */
                            let uqNorm = uniqueNormals[cells[2] - 1]
                            indicies.push(cells[0] - 1)
                            normals[index] = [uqNorm[0], uqNorm[1], uqNorm[2]]
                        }
                    }       
                    for(let i=1; i < columns.length; i++){
                        if(i == 1 || i == 3 || i == 4){
                            let cells = columns[i].split("/")
                            let index = cells[0] - 1
                            let uqNorm = uniqueNormals[cells[2] - 1]
                            indicies.push(cells[0] - 1)
                            normals[index] = [uqNorm[0], uqNorm[1], uqNorm[2]]
                        }
                        
                    }
                    break
            }
            
        }
        rows.forEach(row => {
            let columns = row.split(" ");
            switch(columns[0]){
                case "v":
                    let x = parseFloat(columns[1]);
                    let y = parseFloat(columns[2]);
                    let z = parseFloat(columns[3]);
                    verticies.push([x,y,z]);
                    normals.push([0,0,0]);
                    break;
                case "vn":
                    let nx = parseFloat(columns[1]);
                    let ny = parseFloat(columns[2]);
                    let nz = parseFloat(columns[3]);
                    uniqueNormals.push([nx,ny,nz]);
                    break;
                case "f":
                    faceRead(columns)
                    
            }
        });

        let vArray = []
        for(var i = 0; i < verticies.length; i++){
            vArray.push(
                verticies[i][0], verticies[i][1], verticies[i][2],
                normals[i][0], normals[i][1], normals[i][2]
            )
        }

        return {vertexArray:vArray, indexArray: indicies};
    }   

}

export default ObjReader