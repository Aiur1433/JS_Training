import { PerspectiveCamera } from 'three';

function createCamera(fov,aspect,near,far) {
    const camera = new PerspectiveCamera(
        fov, // fov = Field Of View
        aspect, // aspect ratio (dummy value)
        near, // near clipping plane
        far, // far clipping plane
    );

    // move the camera back so we can view the scene
    camera.position.set(0, 0, 20);

    return camera;
}

export { createCamera };
