var c = document.getElementById("canvas");
var width = c.width;
var height = c.height;
var ctx = c.getContext("2d");

/**
 * This function reverts the canvas vertically, making 0,0 the bottom left instead of the top left
 * It also starts at the half pixel (see https://stackoverflow.com/a/7531540/4840882)
 */
function line(x0, y0, x1, y1, ctx, color = "#000000") {
	let height = ctx.canvas.height;
	x0 = x0 + 0.5;
	y0 = height - y0 + 0.5;
	x1 = x1 + 0.5;
	y1 = height - y1 + 0.5;

	ctx.moveTo(x0, y0);
	ctx.strokeStyle = color;
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

//line(20, 40, 250, 400, "#FF0000");

function drawMesh(mesh, context, width, height) {
	mesh.faces.forEach(function(face) {
		let coords = [];

		let vertices_index = face.vertices;
		vertices_index.forEach(function(vert_ind) {
			let list_ind = vert_ind.split("/");
			let ind = parseInt(list_ind[0]);

			let vertice = mesh.vertices[ind-1];
			coords.push(vertice);

		});

		for(i = 0; i < coords.length; i++) {
			let first_vert = coords[i];
			let last_vert = coords[(i+1) % coords.length];

			line((first_vert.x+1)*width/2, (first_vert.y+1)*height/2, (last_vert.x+1)*width/2, (last_vert.y+1)*height/2, context);
		}

		/*
		context.moveTo((coords[0].x+1)*width/2, (coords[0].y+1)*height/2);
		console.log(coords[0]);
		for(i = 1; i < coords.length; i++) {
			context.lineTo((coords[i].x+1)*width/2, (coords[i].y+1)*height/2);
			context.stroke();
			//console.log(coords[i]);
		}
		context.lineTo((coords[0].x+1)*width/2, (coords[0].y+1)*height/2);
		context.stroke();
		*/
	});
}

drawMesh(african_head_mesh, ctx, width, height);
