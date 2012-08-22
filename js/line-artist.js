(function() {
	var lines = [],
		current = null,
		data = function() {
			document.getElementById('data').innerHTML = JSON.stringify(lines);
		};
	function drawGrid(ctx) {
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

	window.addEventListener("load", function() {
		var canvas = document.getElementById('game'),
			context = canvas.getContext('2d');
		drawGrid(context);

		canvas.addEventListener("click", function(e) {
			var x = (e.clientX / 10 - 32) | 0,
				y = (e.clientY / 10 - 32) | 0;
			if(current) {
				context.lineWidth = 10;
				context.strokeStyle = "black";
				context.beginPath();
				context.moveTo(current.X * 10 + 320, current.Y * 10 + 320);
				context.lineTo(x * 10 + 320, y * 10 + 320);
				console.log({X: current.X * 10 + 320, Y: current.Y * 10 + 320});
				console.log({X: x * 10 + 320, Y: y * 10 + 320 });
				context.stroke();
				lines.push([current, {X: x, Y:y}]);
				data();
				current = null;
			} else {
				current = {X: x, Y: y};
			}
		});
	});
}());