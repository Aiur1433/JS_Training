import {
    BoxGeometry,
    Color,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    DirectionalLight,
    Clock,
    MathUtils
} from 'three';



// Get a reference to the container element that will hold our scene
const container = $('#scene-container')[0];
// create a Scene
const scene = new Scene();
// Set the background color
scene.background = new Color('skyblue');

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane
const camera = new PerspectiveCamera(fov, aspect, near, far);
// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// create a geometry
const geometry = new BoxGeometry(2, 2, 2);
// create a default (white) Basic material
const material = new MeshStandardMaterial({color: 'purple'});
// create a Mesh containing the geometry and material
const cube = new Mesh(geometry, material);
// cube.rotation.set(-0.5, -0.1, 0.8);


// Create a directional light
const light = new DirectionalLight('white', 8);
// move the light right, up, and towards us
light.position.set(10, 10, 10);

// add the mesh to the scene
scene.add(cube, light);


// create the renderer
const renderer = new WebGLRenderer({antialias: true});
// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);
// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

const radiansPerSecond = MathUtils.degToRad(30);

// this method will be called once per frame
cube.tick = (delta) => {
    // increase the cube's rotation each frame
    // cube.rotation.z += radiansPerSecond * delta;
    // cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
};

const clock = new Clock();
let updatables = [cube];
renderer.setAnimationLoop(() => {
    // tell every animated object to tick forward one frame

    const delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    for (const object of updatables) {
        object.tick(delta);
    }

    // render a frame
    renderer.render(scene, camera);
});
