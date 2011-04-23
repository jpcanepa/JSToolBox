function Board(canvas, rows, cols)
{
	
	this.draw = function()
	{
		/* Clear the background */
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		/* Fill the body of the clock */
		this.context.fillStyle = this.backColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		/* Draw the border of the board */
		this.context.strokeStyle = this.foreColor;
		//this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.strokeRect(1, 1, this.canvas.width-2, this.canvas.height-2);
				
		/* Draw lines */
		this.drawLines();
	}
	
	this.drawLines = function()
	{
		this.context.lineWidth = 1;
		
		var rowHeight = this.height / this.rows;
		for(var i = 0 ; i < this.rows - 1 ; ++i)
		{
			Util.drawLine(this.context, 0, (i+1)*rowHeight, this.width, (i+1)*rowHeight);
		}
	
		var colWidth = this.width / this.cols;
		for(var i = 0 ; i < this.cols - 1 ; ++i)
		{
			Util.drawLine(this.context, (i+1)*colWidth, 0, (i+1)*colWidth, this.height);
		}	
	}
	
	this.setColors = function(backColor, foreColor)
	{
		this.foreColor = foreColor;
		this.backColor = backColor;	
	}
	
	/* Number of rows and columns of the board */
	this.rows = rows;
	this.cols = cols;
	
	/* Set default colors */
	this.setColors("#000000", "#ffffff")
	
	/* Canvas elements */
	this.canvas = canvas;
	this.context = canvas.getContext('2d');
	
	/* Sizes */
	this.height = this.canvas.height;
	this.width = this.canvas.width;
}