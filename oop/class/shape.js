class Shape {
	constructor (x,y,color = 'black', colorLine = 'black') {
		this.x = x;
		this.y = y;
		this.color = color;
		this.colorLine = colorLine;
		var _color = color;
		this.getColor = function () {
			return _color;
		}
		this.setcolor = function (c) {
			_color = c;
		}
	}
}