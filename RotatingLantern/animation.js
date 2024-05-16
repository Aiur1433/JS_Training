import {Clock, MathUtils} from 'three';

const clock = new Clock();

class Animation {
    degree = 150;

    constructor(camera, scene, renderer, gifCreator) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
        this.gifCreator = gifCreator;
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            // tell every animated object to tick forward one frame
            this.tick();

            // render a frame
            this.renderer.render(this.scene, this.camera);
            if (this.gifCreator.isRecord) {
                this.gifCreator.addFrame(this.renderer.domElement);
                if(this.degree*this.gifCreator.frameCount===21600){
                    this.gifCreator.render();
                }
            }
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        // only call the getDelta function once per frame!
        const delta = clock.getDelta();

        for (const object of this.updatables) {
            const radiansPerSecond = MathUtils.degToRad(this.degree);
            object.rotation.y += radiansPerSecond * delta;
        }
    }
}

export {Animation};
