class Stage {
	constructor(canvas,w,h) {
		this.canvas = canvas;
		this.canvasPos = canvas.getBoundingClientRect();

		this.canvas.width = w || this.canvas.width;
		this.canvas.height = h || this.canvas.height;
		this.ctx = this.canvas.getContext("2d");

		this.time = 0;

		this.children = [];
		this.draw = this.draw.bind(this);
		this.draw();

	}

	// returns mouse position inside the stage
	mousePos(mouse){
		return {
			x: mouse.x - this.canvasPos.left,
			y: mouse.y - this.canvasPos.top
		}
	}

	add(obj) {
		if (obj.length == null) {
			this.children.push(obj);			
		} else {
			for(var i = 0; i < obj.length;i++) {
				this.children.push(obj[i]);
			};
		}
	}

	draw(){

		// keep track of time(frames)
		this.time = this.time + 1;

		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].draw(this.ctx);
		};

		// drraw the tooltop(ontop)
		let toolTip = this.toolTip;
		if ((typeof toolTip) == "undefined") {
            this.toolTip = new Rectangle(0,0,170,100,'white');
            toolTip = this.toolTip;
            toolTip.text = 'Lorem Ipsum bla bla Lorem Ipsum';
            toolTip.deleteAt = this.time + 5;
            toolTip.isToolTip = true;
		};
		if (this.time > 30) {

			let mouseX = Fun.getObjParam(window.mousePos,'x',-10,[0]);
			let mouseY = Fun.getObjParam(window.mousePos,'y',-10,[0]);
			toolTip.x = mouseX;
			toolTip.y = mouseY;
			toolTip.draw(this.ctx);
		};

		requestAnimationFrame(this.draw);
	}
}