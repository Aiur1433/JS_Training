import {
    BufferGeometry,
    Float32BufferAttribute,
} from 'three';

class Model extends BufferGeometry {

    constructor(height) {
        super();
        const topPoint = [0, height, 0];

        let vertices = [
            // front
            {pos: topPoint, norm: [0, 0, 1], uv: [0.5, 1],},
            {pos: [-3, -4, 3], norm: [0, 0, 1], uv: [0, 0],},
            {pos: [3, -4, 3], norm: [0, 0, 1], uv: [1, 0],},

            // right
            {pos: topPoint, norm: [0, 0, 1], uv: [0.5, 1],},
            {pos: [3, -4, 3], norm: [0, 0, 1], uv: [0, 0],},
            {pos: [3, -4, -3], norm: [0, 0, 1], uv: [1, 0],},

            // back
            {pos: topPoint, norm: [0, 0, 1], uv: [0.5, 1],},
            {pos: [3, -4, -3], norm: [0, 0, 1], uv: [0, 0],},
            {pos: [-3, -4, -3], norm: [0, 0, 1], uv: [1, 0],},

            // left
            {pos: topPoint, norm: [0, 0, 1], uv: [0.5, 1],},
            {pos: [-3, -4, -3], norm: [0, 0, 1], uv: [0, 0],},
            {pos: [-3, -4, 3], norm: [0, 0, 1], uv: [1, 0],}
        ];
        const positions = [];
        const normals = [];
        const uvs = [];
        for (const vertex of vertices) {
            positions.push(...vertex.pos);
            normals.push(...vertex.norm);
            uvs.push(...vertex.uv);
        }

        this.setIndex([
            0, 1, 2,
            3, 4, 5,
            6, 7, 8,
            9, 10, 11
        ]);
        this.setAttribute('position', new Float32BufferAttribute(positions, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

        this.addGroup(0, 3, 0);
        this.addGroup(3, 3, 1);
        this.addGroup(6, 3, 2);
        this.addGroup(9, 3, 3);


    }

}


export {Model};
