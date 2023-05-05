import Scene from "../../Wolfie2D/Scene/Scene";
import { LoadData, LoadType, neverUnload } from "../../constants/load";


export default class SPScene extends Scene{
    unloadScene(): void {
        console.log("SPScene unload called")
        for(let data of neverUnload){
            this.autokeeper(data)
        }
    }

    protected autokeeper (data: LoadData) {
		let {KEY, TYPE} = data;
		switch(TYPE){
			case LoadType.IMAGE:
				this.load.keepImage(KEY);
				break;
			case LoadType.AUDIO:
				this.load.keepAudio(KEY);
				break;
			case LoadType.SPRITESHEET:
				this.load.keepSpritesheet(KEY);
				break;
		}
	}
}