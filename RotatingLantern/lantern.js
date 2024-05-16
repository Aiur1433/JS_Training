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
    textures = [];

    constructor() {
        const mesh = super()

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
            let rt = this.textures[i % this.textures.length];
            if(rt){
                material.push(new MeshBasicMaterial({map: loadColorTexture(rt)}));
            }else {
                material.push(new MeshBasicMaterial({color:'#000'}));
            }
        }
        return material;
    }

    refresh = () => {
        this.geometry = this.createModel();
        this.material = this.createMaterials();
    }

    addFile = (tempUrl) => {
        this.textures.push(tempUrl);
        this.refresh();
    }

    delFile = (tempUrl) => {
        this.textures.splice(this.textures.indexOf(tempUrl),1);
        this.refresh();
    }
}


function loadColorTexture(path) {
    const texture = loader.load(path);
    texture.colorSpace = SRGBColorSpace;
    return texture;
}

export {Lantern};
