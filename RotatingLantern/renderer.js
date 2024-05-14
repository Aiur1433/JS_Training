import { WebGLRenderer } from 'three';

function createRenderer(container) {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.physicallyCorrectLights = true;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.append(renderer.domElement);
    return renderer;
}

export { createRenderer };
