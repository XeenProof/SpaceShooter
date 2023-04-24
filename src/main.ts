import Game from "./Wolfie2D/Loop/Game";
import MainMenu from "./game/scenes/MenuScenes/MainMenu";
import WelcomeScence from "./game/scenes/MenuScenes/WelcomeScence";
import RegistryManager from "./Wolfie2D/Registry/RegistryManager";
import BubbleShaderType from "./game/shaders/BubbleShaderType";
import LaserShaderType from "./game/shaders/LaserShaderType";
import { Inputs, cheats } from "./constants/gameoptions";

// The main function is your entrypoint into Wolfie2D. Specify your first scene and any options here.
(function main(){
    
    // Set up options for our game
    let options = {
        canvasSize: {x: 1200, y: 900},          // The size of the game
        clearColor: {r: 0.1, g: 0.1, b: 0.1},   // The color the game clears to
        inputs: Inputs,
        useWebGL: false,                        // Tell the game We hate Webgl
        showDebug: false                       // Whether to show debug messages. You can change this to true if you want
    }

    // Create a game with the options specified
    const game = new Game(options);

    // Start our game
    game.start(WelcomeScence, {cheats: []});
    // cheats.INVINSIBLE
})();
