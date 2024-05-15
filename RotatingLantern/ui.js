import {getMesh} from "./scene.js";
import {GUI} from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';

let gui;

function createUI(animation) {
    gui = new GUI();

    gui.add(animation, 'degree', 0, 1000, 10).name('转速');
    gui.add(getMesh(), 'height', 1, 10, 0.1).name('高度').onChange(getMesh().refresh);
    gui.add(getMesh(), 'radius', 1, 10, 0.1).name('宽度').onChange(getMesh().refresh);
    gui.add(getMesh(), 'radialSegments', 3, 64, 1).name('面数').onChange(getMesh().refresh);

    const folder = gui.addFolder('图片上传');
    const folderParams = {
        function() {
            console.log('hi')
        }
    };
    folder.add(folderParams, 'function');
    return gui;
}

export {createUI};