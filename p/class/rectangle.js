class Rectangle extends Shape {

	// tood just use object as params and replace normal params
	constructor(x, y, w, h, color = 'blue', colorLine = 'black', lineWidth = 0, desc, isClickable){

		// get params from params object
		// this allows for params to be in any order, also default value check etc.
		if ((typeof x) == "object") {
			let _params = x;
			x = Fun.getObjParam(_params,'x',0,[0]);
			y = Fun.getObjParam(_params,'y',0,[0]);
			w = Fun.getObjParam(_params,'w',0,[0]);
			h = Fun.getObjParam(_params,'h',0,[0]);
			color = Fun.getObjParam(_params,'color','blue',['']);
			colorLine = Fun.getObjParam(_params,'colorLine','black',['']);
			lineWidth = Fun.getObjParam(_params,'lineWidth',0,[0]);
			desc = Fun.getObjParam(_params,'desc',undefined,['',undefined]);
			isClickable = Fun.getObjParam(_params,'isClickable',false,[false]);
		};


		// k2ivitab Shape(ylemise klassi (extends)) constructori
		super(x,y,color,colorLine);
		this.width = w;
		this.w = w;
		this.height = h;
		this.h = h;
		this.lineWidth = lineWidth;
		this.desc = desc;
		this.isClickable = isClickable;
	}

	draw(ctx) {

		// check every 10 frames
		if (stage.time % 10 == 0) {

			if ((typeof stage.toolTip) != 'undefined' && this.desc) {
				let isInArea = Fun.isMouseInArea(this);
				if (isInArea) {
					//console.log(this);
					stage.toolTip.text = this.desc;
					stage.toolTip.deleteAt = stage.time + 30;
				};
			};
		};

		// --- check clickable objects
		if (this.isClickable) {
			if (window.click) {
				if (Fun.isMouseInArea(this,window.click.pos)) {
					this.desc = 'hahaha';
					window.click = undefined;
				};
			};
		};


		if (this.color == 'blue') {

			let pulseData = Fun.pulse(this);
			ctx.shadowColor = pulseData.color;
			ctx.shadowBlur = pulseData.current;
			if (pulseData.stroke) {
				this.lineWidth = Math.max((pulseData.current/10),0.1);
			};
			//ctx.shadowOffsetX = 3;
		} else {
			ctx.shadowColor = 'black';
			ctx.shadowBlur = 0;
			this.lineWidth = 1;
			//ctx.shadowOffsetX = -3;			
		};

		// if textbox
		if (this.isToolTip) toolTip: {

			// if tooltip has no text break and make the tooltip invisible
			if (!this.text) {
				this.w = 0;
				this.h = 0;

				break toolTip;
			};

			// make words into lines to see how big the texbox has to be
			let words = this.text.split(" ");
			let lines = [];

			//let width = (ctx.measureText(this.text).width);

			// measure longest line to determine width of toolTip
			let longestLine = 0;

			// loop through words and add them into a line as long as they are < 175 wide
			let line = "";
			for (var i = 0; i <= words.length - 1; i++) {
				let lineWidth = (ctx.measureText(line + words[i])).width;

				if (lineWidth < 175) {
					line = line + words[i]+ ' ';
				} else {
					lines.push(line);
					line = words[i] + ' ';
				};

				lineWidth = ctx.measureText(line).width;
				if (lineWidth > longestLine) {
					longestLine = lineWidth;
				};
			};
			// push the last line to the lines as well
			lines.push(line);

			// save lines and update size of tooltip
			this.lines = lines;
			this.w = longestLine + 30;
			this.h = lines.length * 18;
			if (lines.length == 1) {
				this.h = this.h + 5;
			};

			// --- see if the tooltip should be moved away from edge
			let xClose = false;
			let yClose = false;

			// make sure the box doesn't leave the canvas
			// A
			/*
			if (this.x + this.w > 500) {
				this.x = this.x - (this.x + this.w - 500);
			};
			if (this.y + this.h > 500) {
				this.y = this.y - (this.y + this.h - 500);
			};
			*/
			// B
			if (this.x + this.w > 500) {
				this.x = this.x -this.w;
				xClose = true;
			};
			if (this.y + this.h > 500) {
				this.y = this.y - this.h;
				yClose = true;
			};

			if (!xClose && !yClose) {

				this.x = this.x + 10;
				this.y = this.y + 10;
			};
			if (yClose) {
				this.y = this.y - 10;
			};
			if (xClose) {
				this.x = this.x - 10;
			};
		};

		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		ctx.closePath();

		
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.colorLine;
		ctx.lineWidth = this.lineWidth;
		ctx.rect((this.x),(this.y),(this.w),(this.h));
		ctx.fill();
		ctx.stroke();
		ctx.closePath();

		// tooltip text will be created
		if (this.isToolTip) toolTip: {

			// if there is no text break.
			if (!this.text) {
				break toolTip;
			};
			let lines = this.lines;

			ctx.font = "12px Arial";
			ctx.fillStyle = 'black';

			// if it's time to delete the text, delete it
			if (this.deleteAt < stage.time) {
				this.text = undefined;
			};

			// draw all the lines 1 by 1
			for (var i = 0; i <= lines.length - 1; i++) {
				ctx.fillText(lines[i],this.x+(15),this.y+(15)+(i*12));
			};

			//ctx.fillText("Hello World",this.x+(this.w /6),this.y+(this.h /6));
		};
	}
}