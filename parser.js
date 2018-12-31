class Mesh {
	constructor(id, name, vertices = [], texture_coord = [], vertex_norm = [], space_vert = [], faces = [], lines = []) {
		this.id = id;
		this.name = name;

		// 3D Info
		this.vertices = vertices;
		this.texture_coordinates = texture_coord;
		this.vertex_normals = vertex_norm;
		this.space_vertices = space_vert;
		this.faces = faces;
		this.lines = lines;
	}
}

class Vertice {
	constructor(x, y, z, w = 1) {
		this.x = parseFloat(x);
		this.y = parseFloat(y);
		this.z = parseFloat(z);
		this.w = parseFloat(w);
	}
}

class TextureCoordinate {
	constructor(u, v = 0, w = 0) {
		this.u = u;
		this.v = v;
		this.w = w;
	}
}

class VertexNormal {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class SpaceVertice {
	constructor(u, v, w) {
		this.u = u;
		this.v = v;
		this.w = w;
	}
}

class Face {
	constructor(vertices) {
		this.vertices = vertices;
	}
}

class Line {
	constructor(vertices) {
		this.vertices = vertices;
	}
}

/**
 * @return Mesh mesh - A Mesh object
 */
function parse(mesh_data) {
	let mesh = new Mesh(1, "test");

	let parsed_data = mesh_data.split('\n');
	//console.log(test);

	parsed_data.forEach(function(line) {
		let parsed_line = line.split(" ");
		//console.log(parsed_line);

		switch(parsed_line[0]) {

			// Vertices
			case "v":
				let vert = new Vertice(parsed_line[1], parsed_line[2], parsed_line[3], parsed_line[4]);
				mesh.vertices.push(vert);
				break;

			// Texture coordinates
			case "vt":
				let text_coord = new TextureCoordinate(parsed_line[1], parsed_line[2], parsed_line[3]);
				mesh.texture_coordinates.push(text_coord);
				break;

			// Vertex normals
			case "vn":
				let vert_norm = new VertexNormal(parsed_line[1], parsed_line[2], parsed_line[3]);
				mesh.vertex_normals.push(vert_norm);
				break;

			// Space vertices
			case "vp":
				let space_vert = new SpaceVertice(parsed_line[1], parsed_line[2], parsed_line[3]);
				mesh.space_vertices.push(space_vert);
				break;

			// Faces
			case "f":
				let face_vertices = parsed_line.slice();
				face_vertices.splice(0,1);

				let face = new Face(face_vertices);
				mesh.faces.push(face);
				break;

			// Lines
			case "l":
				let line_vertices = parsed_line.slice();
				line_vertices.splice(0,1);

				let line = new Line(line_vertices);
				mesh.lines.push(line);
				break;
		}
	});

	return mesh;
}

// TEST
let african_head_mesh = parse(african_head);
