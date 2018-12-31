var c = document.getElementById("canvas");
var width = c.width;
var height = c.height;
var ctx = c.getContext("2d");
// Adds a half pixel (see https://stackoverflow.com/a/7531540/4840882)
ctx.translate(0.5, 0.5);
ctx.lineWidth = 1;

/**
 * This function reverts the canvas vertically, making 0,0 the bottom left instead of the top left
 */
function line(x0, y0, x1, y1, ctx, color = "#000000") {
	let height = ctx.canvas.height;
	x0 = x0; //Math.round(x0);
	y0 = height - y0; //Math.round(height - y0);
	x1 = x1; //Math.round(x1);
	y1 = height - y1; //Math.round(height - y1);

	ctx.moveTo(x0, y0);
	//ctx.strokeStyle = color;
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

//line(20, 40, 250, 400, "#FF0000");

function drawMesh(mesh, context, width, height) {
	let start_time = performance.now();
	let facesCount = mesh.faces.length;
	let linesCount = 0;

	let facesDrawn = 0;
	let progress = 0;

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
			linesCount++;
		}
		
		facesDrawn++;
		let progressNow = Math.round((facesDrawn / facesCount)*100);
		if(progressNow != progress) {
			console.log("Rendering: " + progress + "%");
		}
		progress = progressNow;
	});

	let end_time = performance.now();

	console.log("=== Rominou's TinyRenderer ===");
	console.log("| Total Render Time: " + ((end_time-start_time)/1000).toFixed(2) + "s");
	console.log("| Total Lines: " + linesCount);
	console.log("| Total faces: " + facesCount);
}

window.onload = function() {
	drawMesh(african_head_mesh, ctx, width, height);
};
