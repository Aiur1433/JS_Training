import {
    BufferGeometry,
    Float32BufferAttribute,
    Mesh,
    MeshBasicMaterial,
    TextureLoader,
    SRGBColorSpace
} from 'three';

const loader = new TextureLoader();

function createLantern() {
    // 模型
    const geometry = new BufferGeometry();
    let vertices = [
        // front
        {pos: [0, 3, 0], norm: [0, 0, 1], uv: [0.5, 1],},
        {pos: [-3, -3, 3], norm: [0, 0, 1], uv: [0, 0],},
        {pos: [3, -3, 3], norm: [0, 0, 1], uv: [1, 0],},

        // right
        {pos: [0, 3, 0], norm: [0, 0, 1], uv: [0.5, 1],},
        {pos: [3, -3, 3], norm: [0, 0, 1], uv: [0, 0],},
        {pos: [3, -3, -3], norm: [0, 0, 1], uv: [1, 0],},

        // back
        {pos: [0, 3, 0], norm: [0, 0, 1], uv: [0.5, 1],},
        {pos: [3, -3, -3], norm: [0, 0, 1], uv: [0, 0],},
        {pos: [-3, -3, -3], norm: [0, 0, 1], uv: [1, 0],},

        // left
        {pos: [0, 3, 0], norm: [0, 0, 1], uv: [0.5, 1],},
        {pos: [-3, -3, -3], norm: [0, 0, 1], uv: [0, 0],},
        {pos: [-3, -3, 3], norm: [0, 0, 1], uv: [1, 0],}
    ];
    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
        uvs.push(...vertex.uv);
    }

    geometry.setIndex([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11
    ]);
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

    // 纹理
    const mater = new MeshBasicMaterial({map: loadColorTexture('images/naonaoiswatching.jpg')})
    const materials = [
        new MeshBasicMaterial({map: loadColorTexture('images/naonaoiswatching.jpg')}),
        new MeshBasicMaterial({map: loadColorTexture('images/naonaoiswatching.jpg')}),
        new MeshBasicMaterial({map: loadColorTexture('images/naonaoiswatching.jpg')}),
        new MeshBasicMaterial({map: loadColorTexture('images/naonaoiswatching.jpg')}),

    ];

    return new Mesh(geometry, mater);
}

function loadColorTexture(path) {
    const texture = loader.load(path);
    texture.colorSpace = SRGBColorSpace;
    return texture;
}

export {createLantern};
