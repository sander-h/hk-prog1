// contains functions that mite be useful

class Fun {
		
	// gets param value from object of params
	static getObjParam (params = {}, paramName = "", defaultValue, expectedTypes = ['',true,2,[],{}]) {
		if (paramName == "" || (typeof paramName != "string")) {
			throw new Error('Wrong param name');
		};

		// determine which types are allowed (Defaults to all types)
		let allowedTypes = [];
		for (var i = expectedTypes.length - 1; i >= 0; i--) {
			allowedTypes.push(typeof expectedTypes[i])
		};

		let paramValue = params[paramName];

		// if the type of param value is in allowedTypes, return the param value
		// undefined is a possible typeof return, therefor empty variable will not pass
		if (allowedTypes.includes(typeof paramValue)) {
			return paramValue;
		};	
		return defaultValue;
	}

	static pulseInit (obj) {
		let pulseData = {
			last: 0,		// how long since last pulse
			current: 0,		// how big is the shadow currently
			state: 'offPause',	// state
			color: Fun.getObjParam(obj,'pulseColor','red',['']),	// color of the shadow used
			offPause: Fun.getObjParam(obj,'pulseOffPause',10,[1]),// how many frames to pause when shadow is off
			onPause: Fun.getObjParam(obj,'pulseOnPause',30,[1]),	// how many frames to pause when shadow is on
			max: Fun.getObjParam(obj,'pulseMax',50,[1]),			// max effect
			min: Fun.getObjParam(obj,'pulseMin',0,[1]),			// min effect
			change: Fun.getObjParam(obj,'pulseChange',1,[1]),		// effect speed *how much is the pulse changed per frame
			stroke: Fun.getObjParam(obj,'pulseStroke',true,[true])	// enable pulsing stroke
		};
		obj.pulseData = pulseData;
		return pulseData;
	}

	static pulse (obj) {

		// first time setup if data not defined
		let pulseData = obj.pulseData;
		if ((typeof pulseData) == "undefined") {
			pulseData = Fun.pulseInit(obj);
		};

		pulseData.last = pulseData.last + 1;

		// do an action based on state

		// offPause means the shadow is off and waiting for offPause time
		if (pulseData.state == 'offPause') {

			// if waited enough, update state
			if (pulseData.last > pulseData.offPause) {
				pulseData.state = 'up';
				pulseData.last = 0;
			};
			return pulseData;
		};

		// up means the shadow is going up
		if (pulseData.state == 'up') {

			// raise the shadow
			pulseData.current = pulseData.current + pulseData.change;

			// current shadow is bigger or equal to max shadow, change the state.
			if (pulseData.current >= pulseData.max) {
				pulseData.state = 'onPause';
				pulseData.last = 0;
			};
			return pulseData;
		};

		// onPause means the shadow is on and waiting for onPause timer
		if (pulseData.state == 'onPause') {

			if (pulseData.last > pulseData.onPause) {
				pulseData.state = 'down';
				pulseData.last = 0;
			};

			return pulseData;
		};

		// down means the shadow is going down
		if (pulseData.state == 'down') {

			pulseData.current = pulseData.current - pulseData.change;

			if (pulseData.current <= pulseData.min) {
				pulseData.state = 'offPause';
				pulseData.last = 0;
			};

			return pulseData;
		};

		throw error ('state not found');
		return pulseData;
	}



	// check if mosue inside a object
	static isMouseInArea (obj,mousePos){
		if (!mousePos) {
			// if mouse pos doesn't exist, return false
			if ((typeof window.mousePos) == 'undefined') {
				return false;
			};
			mousePos = window.mousePos;
		};

		

		let mouseX = Fun.getObjParam(mousePos,'x',-10,[0]);
		let mouseY = Fun.getObjParam(mousePos,'y',-10,[0]);

		if (
			(mouseX >= obj.x && mouseX <= (obj.x + obj.w)) &&
			(mouseY >= obj.y && mouseY <= (obj.y + obj.h))
		) {
			return true;
		};

		return false;
	}
}

