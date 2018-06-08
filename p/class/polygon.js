class Polygon extends Shape {
	constructor(x, y, radius = 50, sides = 6, angle = 0, color = 'blue', colorLine = 'black', lineWidth = 0){

		// k2ivitab Shape(ylemise klassi (extends)) constructori
		super(x,y,color,colorLine);
		this.radius = radius;
		this.sides = sides;
		this.lineWidth = lineWidth;
		this.angle = angle;
	}
/*
	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.colorLine;
		ctx.lineWidth = this.lineWidth;

		var x = this.x;
		var y = this.y;
		var radius = this.radius;
		var sides = this.sides;
		var angle = this.angle;

		var mult = (2 * Math.PI) / sides;
		
		ctx.beginPath();

		ctx.moveTo(
			x + radius * Math.cos(0),
			y + radius * Math.sin()
		);

		for (var i = 0; i < sides;i++) {
			ctx.lineTo(
				x + radius * Math.cos(i * mult),
				y + radius * Math.sin(i * mult)
			);
		}

		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
	*/
	draw (ctx) {
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.colorLine;
		ctx.lineWidth = this.lineWidth;

		var x = this.x;
		var y = this.y;
		var radius = this.radius;
		var sides = this.sides;
		//var angle = this.angle;

		var angle = (360 / sides)+this.angle;

		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.moveTo(x + radius, y);
		for(var i = 0; i < sides; i++) {
			var a = ((i * angle) * Math.PI / 180);
			var vx = x + Math.cos(a) * radius;
			var vy = y + Math.sin(a) * radius;
			ctx.lineTo(vx,vy);
		}
	}
}