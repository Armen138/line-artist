(function() {
	var lines = [],
		current = null,
		data = function() {
			document.getElementById('data').innerHTML = JSON.stringify(lines);
		};
	function drawGrid() {
		var canvas = document.getElementById('grid'),
			ctx = canvas.getContext('2d');
		ctx.lineWidth = 1;
		ctx.strokeStyle = "black";
		ctx.beginPath();
		for(var i = 0; i < 65; i++) {
			ctx.moveTo(i * 10, 0);
			ctx.lineTo(i* 10, 640);
			ctx.moveTo(0, i * 10);
			ctx.lineTo(640, i * 10);
		}
		ctx.stroke();
		ctx.strokeStyle = "red";
		ctx.strokeRect(160, 160, 320, 320);
	}

	function redraw(context) {
			context.clearRect(0, 0, 640, 640);
			context.lineWidth = 10;
			context.strokeStyle = "black";
			context.beginPath();
			for(var i = 0; i < lines.length; i++) {
				context.moveTo(lines[i][0].X * 10 + 320, lines[i][0].Y * 10 + 320);
				context.lineTo(lines[i][1].X * 10 + 320, lines[i][1].Y * 10 + 320);
			}
			context.stroke();
	}

	window.addEventListener("load", function() {
		var canvas = document.getElementById('game'),
			context = canvas.getContext('2d');
		drawGrid();

		canvas.addEventListener("click", function(e) {
			var x = (e.clientX / 10 - 32) | 0,
				y = (e.clientY / 10 - 32) | 0;
			if(current) {
				lines.push([current, {X: x, Y:y}]);
				data();
				redraw(context);
				current = null;
			} else {
				current = {X: x, Y: y};
			}
		});
		canvas.addEventListener("mousemove", function(e) {
			var x = (e.clientX / 10 - 32) | 0,
				y = (e.clientY / 10 - 32) | 0;
			if(current) {
				redraw(context);
				context.lineWidth = 10;
				context.strokeStyle = "grey";
				context.beginPath();
				context.moveTo(current.X * 10 + 320, current.Y * 10 + 320);
				context.lineTo(x * 10 + 320, y * 10 + 320);
				context.stroke();
			}
		});
	});
}());