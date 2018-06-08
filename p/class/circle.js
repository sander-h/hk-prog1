class Circle extends Shape {
	constructor(x, y, radius, color = 'blue', colorLine = 'black', lineWidth = 0){

		// k2ivitab Shape(ylemise klassi (extends)) constructori
		super(x,y,color,colorLine,lineWidth);
		this.radius = radius;
		this.lineWidth = lineWidth;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.colorLine;
		ctx.lineWidth = this.lineWidth;
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}