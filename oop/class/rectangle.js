class Rectangle extends Shape {
	constructor(x, y, w, h, color = 'blue', colorLine = 'black', lineWidth = 0){

		// k2ivitab Shape(ylemise klassi (extends)) constructori
		super(x,y,color,colorLine);
		this.width = w;
		this.height = h;
		this.lineWidth = lineWidth;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();

		
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.colorLine;
		ctx.lineWidth = this.lineWidth;
		ctx.rect((this.x),(this.y),(this.width),(this.height));
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}