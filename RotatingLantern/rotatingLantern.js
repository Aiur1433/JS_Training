import {createScene, getObj} from "./scene.js";
import {createCamera} from "./camera.js";
import {createRenderer} from "./renderer.js";
import {Animation} from "./animation.js";
import {Resize} from "./control.js";

let renderer;
let camera;

function main() {
    // 初始化
    const container = $('#scene-container')[0];
    renderer = createRenderer(container);

    // 创建场景
    const scene = createScene('#fff', 3, 8, 4);

    // 设置镜头
    camera = createCamera(30, 1, 0.1, 100);
    const controls = new Resize(container, camera, renderer);

    // 设置动画
    const animation = new Animation(camera, scene, renderer);
    animation.updatables.push(getObj());
    // 开始渲染
    animation.start();
}


main();
