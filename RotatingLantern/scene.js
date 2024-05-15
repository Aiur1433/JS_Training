import {Color, Scene} from 'three';
import {Lantern} from "./lantern.js";
import {createLights} from "./lights.js";

let mesh;

let light;



function createScene(backGroundColor) {
    const scene = new Scene();

    // 背景色
    scene.background = new Color(backGroundColor);
    // 展示对象
    mesh = new Lantern();

    // 灯光
    light = createLights();

    scene.add(mesh, light);

    return scene;
}

function getMesh() {
    return mesh;
}

export {createScene, getMesh};
