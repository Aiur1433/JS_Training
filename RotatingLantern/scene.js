import {Color, Scene} from 'three';
import {createLantern} from "./lantern.js";
import {createLights} from "./lights.js";

let obj;
let light;

function createScene(backGroundColor,radius, height, radialSegments ) {
    const scene = new Scene();

    // 背景色
    scene.background = new Color(backGroundColor);
    // 展示对象
    obj = createLantern(radius, height, radialSegments );
    // 灯光
    light = createLights();

    scene.add(obj, light);
    return scene;
}

function getObj(){
    return obj;
}

export {createScene,getObj};
