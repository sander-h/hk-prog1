class Stage {
	constructor(canvas,w,h) {
		this.canvas = canvas;
		this.canvas.width = w || this.canvas.width;
		this.canvas.height = h || this.canvas.height;
		this.ctx = this.canvas.getContext("2d");

		this.children = [];
		this.draw = this.draw.bind(this);
		this.draw();

	}

	add(obj) {
		this.children.push(obj);
	}

	draw(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].draw(this.ctx);
		};

		requestAnimationFrame(this.draw);
	}
}