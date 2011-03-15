function Clock(canvas)
{
	// Set the lengths and values to use when rendering
	this.setMetrics = function()
	{
		this.radius = this.sizeFactor * Math.min(this.canvas.height, this.canvas.height) / 2.0;

		this.secondsLength = this.radius;
		this.minutesLength = 0.9 * this.radius;
		this.hoursLength = 0.7 * this.radius;

		this.tickLength = 0.05 * this.radius;
	}

	this.setColors = function(bodyBack, faceBack, fore)
	{
		this.bodyBackColor = bodyBack;
		this.faceBackColor = faceBack;
		this.foreColor     = fore;
	}

	this.changeSizeFactor = function(value)
	{
		this.sizeFactor = value;
		this.setMetrics();
	}

	this.draw = function()
	{
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// Fill the body of the clock
		this.context.fillStyle = this.bodyBackColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Draw the border of the clock 
		this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);

		// Save the original state of the canvas
		this.context.save();

		// Put the coordinate axis origin in the lower left cords
		this.context.save();
		Util.transformToCartesian(this.context);

		// Move the context to the center of the canvas
		this.context.translate(this.canvas.width / 2.0, this.canvas.height / 2.0);

		// Clock face
		Util.fillCircle(this.context, 0, 0, this.radius, this.faceBackColor);
		Util.drawCircle(this.context, 0, 0, this.radius);

		this.context.strokeStyle = this.foreColor;

		// Get the current time
		var now = new Date();
		var seconds = now.getSeconds();
		var minutes = now.getMinutes();
		var hours   = now.getHours();

		// Angle of the seconds hand
		var secondsTheta = 
			(2*Math.PI) * (1 - seconds / 60.0) + Math.PI / 2.0;

		// Draw the seconds hand
		Util.drawLine(this.context, 0, 0, 
				this.secondsLength * Math.cos(secondsTheta), 
				this.secondsLength * Math.sin(secondsTheta)); 

		// Angle of the minutes hand
		var minutesTheta = 
			Math.PI*(2*(1 - 1 / 60.0 * minutes) + 1.0 / 2.0 - seconds * 2 / 3600.0);

		// Draw the minutes hand
		Util.drawLine(this.context, 0, 0, 
				this.minutesLength * Math.cos(minutesTheta), 
				this.minutesLength * Math.sin(minutesTheta)); 

		// The angle of the hours hand
		var hoursTheta = 
			(2*Math.PI - 2*Math.PI / 12.0 * hours) + Math.PI / 2.0 -
			minutes / 60.0 * 2 * Math.PI / 12.0;

		// Draw the hours hand
		Util.drawLine(this.context, 0, 0, 
				this.hoursLength * Math.cos(hoursTheta), 
				this.hoursLength * Math.sin(hoursTheta)); 

		// Draw ticks
		for(var theta = 0 ; theta < 2*Math.PI ; theta += 2*Math.PI / 12.0)
		{
			var o = this.radius - this.tickLength;
			var ct = Math.cos(theta);
			var st = Math.sin(theta);
			Util.drawLine(this.context, o * ct, o * st, this.radius * ct, this.radius * st);
		}

		// Restore the state of the canvas
		this.context.restore(); // Translate to center
		this.context.restore();	// Transform to cartesian
	}

	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	// The radius of the face of the clock.
	this.sizeFactor = 0.9;
	this.setMetrics();
	this.setColors("#000000", "#ffffff", "#000000");
}
