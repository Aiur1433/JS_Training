import {
    BufferGeometry,
    Float32BufferAttribute, Vector2, Vector3,
} from 'three';

class Model extends BufferGeometry {

    parameters = {}
    indices = [];
    vertices = [];
    normals = [];
    uvs = [];

    constructor(radius = 1, height = 5, radialSegments = 4) {
        super();
        this.type = 'ConeGeometry';

        this.parameters = {
            radius: radius,
            height: height,
            radialSegments: Math.floor(radialSegments),
            heightSegments: 1,
            openEnded: true,
            thetaLength: Math.PI * 2
        };

        // generate geometry
        this.generateTorso();


        // build geometry
        this.setIndex(this.indices);
        this.setAttribute('position', new Float32BufferAttribute(this.vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(this.normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(this.uvs, 2));


    }

    generateTorso() {
        const normal = new Vector3();

        let groupStart = 0;

        let index = 0;
        const halfHeight = this.parameters.height / 2;
        const radius = this.parameters.radius;

        // generate vertices, normals and uvs
        const vertexArray = [];
        const normalArray = [];
        vertexArray.push(new Vector3(0, halfHeight, 0));
        normalArray.push(new Vector3(0, 0, 1));
        for (let i = 0; i < this.parameters.radialSegments; i++) {
            const u = i / this.parameters.radialSegments;
            const theta = u * this.parameters.thetaLength;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            vertexArray.push(new Vector3(radius * sinTheta, -halfHeight, radius * cosTheta));
            normal.set(0, 0, 1).normalize();
            normalArray.push(new Vector3(normal.x, normal.y, normal.z));

        }

        // generate indices
        for (let x = 1; x <= this.parameters.radialSegments; x++) {

            // we use the index array to access the correct indices
            this.setPosition(vertexArray[0], normalArray[0], index++);
            this.setPosition(vertexArray[x], normalArray[x], index++);
            this.setPosition(x === this.parameters.radialSegments ? vertexArray[1] : vertexArray[x + 1], x === this.parameters.radialSegments ? normalArray[1] : normalArray[x + 1], index++);
            // update group counter

            this.addGroup(groupStart, 3, x - 1);
            groupStart += 3;
        }
    }

    uvTemplate = [[0.5, 1], [0, 0], [1, 0]]

    setPosition(vertex, normal, index) {
        this.vertices.push(vertex.x, vertex.y, vertex.z);
        this.normals.push(normal.x, normal.y, normal.z);
        this.uvs.push(...this.uvTemplate[index % 3]);
        this.indices.push(index);
    }

}


export {Model};
