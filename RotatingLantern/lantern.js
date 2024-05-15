import {
    Mesh,
    MeshBasicMaterial,
    TextureLoader,
    SRGBColorSpace, WireframeGeometry
} from 'three';
import {Model} from './model.js'

const loader = new TextureLoader();


class Lantern extends Mesh {


    height = 3;
    model;

    constructor() {
        const mesh = super()
        mesh.material = [
            new MeshBasicMaterial({map: loadColorTexture('images/naonaoiswatching.jpg')}),
            new MeshBasicMaterial({color: 'blue'}),
            new MeshBasicMaterial({map: loadColorTexture('images/blackcat.jpg')}),
            new MeshBasicMaterial({color: 'yellow'}),
        ];
        mesh.geometry = this.createModel(this.height);
    }

    createModel() {
        this.model = new Model(this.height);
        return this.model;
    }

    refresh = () => {
        this.geometry = this.createModel();
    }
}


function loadColorTexture(path) {
    const texture = loader.load(path);
    texture.colorSpace = SRGBColorSpace;
    return texture;
}

export {Lantern};
