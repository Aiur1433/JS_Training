import '../node_modules/gif.js/dist/gif.js';

class GifCreator {
    isRecord = false;
    rangeCount = 0;

    constructor() {

    }

    onFinish = (blob) => {
        const eleLink = document.createElement('a')
        eleLink.download = this.fileName + '.gif';
        eleLink.style.display = 'none';
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }

    createGif(container, fileName) {
        let gif = new GIF({
            workers: 2,
            quality: 10,
            workerScript: '../node_modules/gif.js/dist/gif.worker.js',
            width: container.clientWidth,
            height: container.clientHeight
        });
        gif.on('finished', this.onFinish);
        this.gif = gif;
        this.isRecord = true;
        this.fileName = fileName;
    }

    addFrame(container, range) {
        this.gif.addFrame(container, {copy: true, delay: 16});
        this.rangeCount += range;
    }

    render() {
        this.gif.render();
        this.isRecord = false;
        this.rangeCount = 0;
    }
}


export {GifCreator}
