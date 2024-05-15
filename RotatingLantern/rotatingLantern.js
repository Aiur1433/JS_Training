import {createScene, getMesh} from "./scene.js";
import {createCamera} from "./camera.js";
import {createRenderer} from "./renderer.js";
import {Animation} from "./animation.js";
import {Resize} from "./control.js";
import { GUI } from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';

let renderer;
let camera;

function main() {
    // 初始化
    const gui = new GUI();


    const container = $('#scene-container')[0];
    renderer = createRenderer(container);

    // 创建场景
    const scene = createScene('#fff');

    // 设置镜头
    camera = createCamera(30, 1, 0.1, 100);
    const controls = new Resize(container, camera, renderer);

    // 设置动画
    const animation = new Animation(camera, scene, renderer);
    animation.updatables.push(getMesh());
    gui.add( animation, 'degree', 0, 1000, 10 ).name('转速');
    gui.add( getMesh(), 'height', 0, 10, 0.1 ).name('高度').onChange(getMesh().refresh);


    // 开始渲染
    animation.start();

}


main();
