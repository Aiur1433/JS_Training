import {Clock, MathUtils} from 'three';

const clock = new Clock();

class Animation {
    degree = 90;

    constructor(camera, scene, renderer, gifCreator) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
        this.gifCreator = gifCreator;
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            const delta = clock.getDelta();
            const radiansPerSecond = MathUtils.degToRad(this.degree);
            const range = radiansPerSecond * delta;
            // tell every animated object to tick forward one frame
            this.tick(range);

            // render a frame
            this.renderer.render(this.scene, this.camera);
            if (this.gifCreator.isRecord) {
                let max = this.degree >= 360 ? Math.PI * this.degree / 180 : 2 * Math.PI;
                this.gifCreator.addFrame(this.renderer.domElement, range);
                if (this.gifCreator.rangeCount >= max) {
                    this.gifCreator.render();
                }
            }
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick(range) {
        for (const object of this.updatables) {
            object.rotation.y += range;
        }
    }
}

export {Animation};
