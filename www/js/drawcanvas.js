// JavaScript Document

	var container = document.createElement("div"); // this is created in a loop
	var col4 = document.createElement("div"); // this is created in a loop 
	var canvas = document.createElement("canvas"); // there should be only 4 canvas elements in each col4
	var grid = document.querySelector("#grid");
	var images = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8"]; 
	for (var i = 0; i < images.length; i++)
	{
		var image = document.createElement("canvas"); 
		var img = document.createElement("img"); 
		img.src = "img/img" + i + ".PNG"; 
		img.alt = "Space image " + i;
		img.onload = function(ev){
					//load to canvas after the image is loaded
					context.drawImage(img, 0,0);
					
		} 
		
		grid.appendChild(image);
		alert("grid items " + grid.childNodes.length); 
		//grid.appendChild(img);
	}
	
	 
	 
	/*
	           <div class="container">
                <!--
                The class names can be anything when you
                are building the grid yourself.
                "col-container" could be "row" or "group".
                As long as you understand what the name
                means.
                -->
            <div class="col-container">
            <div class="col-4 center">
            <canvas id="image">
            </canvas>
            <img src="img/img4.PNG" width="180" alt="" data-ref="1" />
            <input type="button" value="Delete image" /></div>
	*/
	//var canvasImage = document.querySelector("#image");
	//var canvasContext = canvasImage.getContext("2d");
	//var label = "your message"; 
	//canvasContext.fillText(label, 0, 0);
	//canvasContext.fillText(lbl, currentPoint, labelY + 15);