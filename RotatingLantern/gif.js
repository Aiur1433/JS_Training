import '../node_modules/gif.js/dist/gif.js';

class GifCreator {
    isRecord = false;
    frameCount = 0;

    constructor() {
        let gif = new GIF({
            workers: 2,
            quality: 10,
            workerScript: '../node_modules/gif.js/dist/gif.worker.js',
        });


        gif.on('finished', function (blob) {
            this.gifUrl = window.open(URL.createObjectURL(blob));
        });

        this.gif = gif;
    }

    createGif(container) {
        this.gif.options.width = container.clientWidth;
        this.gif.options.height = container.clientHeight;
        this.isRecord = true;
    }

    addFrame(container) {
        this.gif.addFrame(container, {copy: true});
        this.frameCount++;
    }

    render() {
        this.gif.render();
        this.isRecord = false;
        this.frameCount = 0;
    }
}


export {GifCreator}
