import { ContentType } from "./enums";

export class AudioContentProp{
    constructor(){
        this.type = ContentType.Audio;
        this.audioUrl = ""
    }
}

export default AudioContentProp