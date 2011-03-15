var Util = 
{
transformToCartesian : function(context)
											 {
												 context.setTransform(1, 0, 0, -1, 0, context.canvas.height);
											 },

drawLine : function(context, x1, y1, x2, y2)
					 {
						 context.beginPath();
						 context.moveTo(x1,y1);
						 context.lineTo(x2,y2);
						 context.closePath();
						 context.stroke();
					 },

drawCircle : function(context, x, y, radius)
						 {
							 context.beginPath();
							 context.arc(x, y, radius, 0, 2*Math.PI);
							 context.closePath();
							 context.stroke();
						 },

fillCircle : function(context, x, y, radius, fillColor)
						 {
							 context.save();
							 context.beginPath();
							 context.arc(x, y, radius, 0, 2*Math.PI);
							 context.closePath();
							 context.fillStyle = fillColor;
							 context.fill();
							 context.restore();			
						 }
}
/*
	function Trace(destination) 
	{
		var debugDiv = document.createElement('div');
		document.getElementsByTagName("body").appendChild(debugDiv);		
		
		this.destination = document.getElementById('debug');
		
		this.writeLine = function(message)
		{
			this.destination.innerHTML += message + "<br>";
		}
		
		this.clear = function()
		{
			this.destination.innerHTML = "";
		}
	}
*/
