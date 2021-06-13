

export class AudioLoader{
    constructor(){
        this.audioMap = {}
        this.onComplete = (src, audio) =>{}
    }
    addAudio(src){
        console.log("adding audiop")
        let audio = new Audio()
        audio.onloadeddata =e =>{
            this.audioMap[src] = audio    
            this.onComplete(src, audio)
        }
        audio.src = src
    }

    getAudio(src){

        return this.audioMap[src]
    }
}

export default AudioLoader
