import {
    Mesh,
    MeshBasicMaterial,
    TextureLoader,
    SRGBColorSpace, WireframeGeometry
} from 'three';
import {Model} from './model.js'

const loader = new TextureLoader();


class Lantern extends Mesh {


    height = 5;
    radius = 3;
    radialSegments = 4;
    model;
    textures;

    constructor() {
        const mesh = super()

        this.textures = ['images/naonaoiswatching.jpg', 'images/blackcat.jpg'];

        mesh.geometry = this.createModel(this.height);
        mesh.material = this.createMaterials();
    }

    createModel() {
        this.model = new Model(this.radius, this.height, this.radialSegments);
        return this.model;
    }

    createMaterials() {
        let material = [];
        for (let i = 0; i < this.radialSegments; i++) {
            material.push(new MeshBasicMaterial({map: loadColorTexture(this.textures[i % this.textures.length])}));
        }
        return material;
    }

    refresh = () => {
        this.geometry = this.createModel();
        this.material = this.createMaterials();
    }
}


function loadColorTexture(path) {
    const texture = loader.load(path);
    texture.colorSpace = SRGBColorSpace;
    return texture;
}

export {Lantern};
