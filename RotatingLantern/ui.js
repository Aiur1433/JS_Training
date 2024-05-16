import {getMesh} from "./scene.js";
import {GUI, Controller} from '../node_modules/three/examples/jsm/libs/lil-gui.module.min.js';

let gui;
GUI.prototype.addInput = function () {
    return new FileInputControl(this, ...arguments)
}
GUI.prototype.addImg = function () {
    return new ImgControl(this, ...arguments)
}


function createUI(animation, renderer, gifCreator) {
    gui = new GUI({title: '走马灯'});
    const setting = gui.addFolder('形状');
    setting.add(animation, 'degree', 90, 3600, 45).name('转速(°/s)');
    setting.add(getMesh(), 'height', 1, 10, 0.1).name('高度').onChange(getMesh().refresh);
    setting.add(getMesh(), 'radius', 1, 10, 0.1).name('半径').onChange(getMesh().refresh);
    setting.add(getMesh(), 'radialSegments', 3, 8, 1).name('面数').onChange(getMesh().refresh);

    const folder = gui.addFolder('图片（点击小图删除）');

    const fileList = {};
    folder.addInput(getMesh(), 'file').name('选择图片').onChange((value) => {
        let tempUrl = window.URL.createObjectURL(value);
        fileList[value.name] = tempUrl;
        folder.addImg(fileList, value.name).name('');
        getMesh().addFile(tempUrl);
    })

    const control = gui.addFolder('操作');
    const folderParams = {
        filename:'unnamed',
        function() {
            gifCreator.createGif(renderer.domElement,folderParams.filename);
        }
    };
    control.add(folderParams, 'filename').name('文件名');
    control.add(folderParams, 'function').name('下载');
    return gui;
}

class ImgControl extends Controller {

    //默认类型为text
    //list是为了配合datalist使用，这里可以先不关注
    constructor(parent, object, property) {
        super(parent, object, property, `img`)

        this.$img = document.createElement('img')
        this.$img.setAttribute('src', object[property])
        this.$img.setAttribute('class', 'preview')
        this.$img.setAttribute('aria-labelledby', this.$name.id)
        this.$img.addEventListener('click', (e) => {
            let tempUrl = object[property];
            getMesh().delFile(tempUrl);
            delete object[property];
            URL.revokeObjectURL(tempUrl);
            this.destroy()
        })
        this.$widget.appendChild(this.$img)
        this.$disable = this.$img
        this.updateDisplay()
    }

    updateDisplay() {
        return this;
    }

}

class FileInputControl extends Controller {

    constructor(parent, object, property) {
        super(parent, object, property, `input-file`)

        this.$input = document.createElement('input')
        this.$input.setAttribute('type', 'file')
        this.$input.setAttribute('aria-labelledby', this.$name.id)
        this.$input.addEventListener('input', (e) => {
            const file = e.target.files[0];
            let tempUrl = window.URL.createObjectURL(file)
            this.setValue(file)
        })
        this.$widget.appendChild(this.$input)
        this.$disable = this.$input
        this.updateDisplay()
    }

    updateDisplay() {
        this.$input.value = ""
        return this;
    }

}

export {createUI};