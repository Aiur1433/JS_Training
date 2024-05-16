import {OrbitControls} from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

class Resize {
    container;
    camera;
    renderer;

    constructor(container, camera, renderer) {
        this.container = container;
        this.camera = camera;
        this.renderer = renderer;


        const obtControls = new OrbitControls(camera, renderer.domElement);
        obtControls.enableDampling = false; //使动画循环使用时阻尼或自转 意思是否有惯性
        obtControls.enableZoom = false; //是否允许缩放
        obtControls.enablePan = false; //是否开启鼠标右键拖拽
        obtControls.autoRotate = false; //是否允许自动旋转
        obtControls.dampingFactor = 0.25; //动态阻尼系数：就是鼠标拖拽旋转灵敏度
        obtControls.minDistance = 200; //设置相机距离原点的最近距离；
        obtControls.maxDistance = 1000; //设置相机距离原点的最远距离；

        window.addEventListener("wheel", this.onResize)
        window.addEventListener('resize', this.onResize);
        return obtControls;
    }


    onResize = () => {
        // set the size again if a resize occurs
        this.setSize(this.container, this.camera, this.renderer);
    }

    setSize(container, camera, renderer) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    }

}

export {Resize};
