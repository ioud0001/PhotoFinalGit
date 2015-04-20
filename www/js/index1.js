/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
		
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
		
		
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('DOMContentLoaded');
		//app.receivedEvent('deviceready');
		
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
		var parentElement = document.getElementById(id);
       // var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

	var s = document.createElement("script");
    s.setAttribute("src", "http://code.jquery.com/jquery-2.1.0.min.js");
	document.querySelector("head").appendChild(s); 
	app.drawCanvas();
    },
	drawCanvas: function(){
		alert("draw canvas works");
		
		var divCanvas = document.querySelector("#grid");
		var label = "your message"; 
		
		var container = document.createElement("div"); // this is created in a loop
		var col4 = document.createElement("div"); // this is created in a loop 

		var images = ["img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8"];
		 /*
		for (var i = 1; i <= images.length; i++)
		{
				
			}*/
		//fetch an image
				  //image must be from the same domain as the HTML page or you will get a security error and this will fail
				  //load it into the Canvas
				  var img;
				  var canvas, context;
				  for (var i = 1; i <= images.length; i++)
				  {
					  img = document.createElement("img");
					  canvas = document.createElement("canvas");
					  //good idea to set the size of the canvas in Javascript in addition to CSS
					  canvas.height = h = 100;
					  canvas.width = w = 180;
					  context = canvas.getContext("2d");
						img.crossOrigin = "Anonymous";
						img.onload = function(){
					//load to canvas after the image is loaded
					context.drawImage(img, 0,0);
						}
						img.src = "http://localhost/semester2/mad9022/photofinal/www/img/img" + i + ".PNG"; 
					grid.appendChild(canvas); 
					//grid.appendChild(canvas);
					//in this sample the original is 300px x 430px
					//we want to resize it to fill the height of our canvas - 600px;
					//alert( i.width + " " + i.height)
					/*
					var imgWidth = ev.currentTarget.width;
					var imgHeight = ev.currentTarget.height;
					var aspectRatio = imgWidth / imgHeight;
					//alert(aspectRatio)
					ev.currentTarget.height = canvas.height;
					ev.currentTarget.height = canvas.height * aspectRatio;
					var w = canvas.height * aspectRatio;
					var h = canvas.height;
					console.log("width: ", w, " height: ", h, " aspect ratio: ", aspectRatio);
					canvas.width = w;
					canvas.style.width = w + "px";
					
					
					//extract the base64 version of the image into the output div
					
					var dataURL = canvas.toDataURL("image/jpeg");
					grid.innerHTML = dataURL;
					*/
					//THIS EXAMPLE FAILS BECAUSE OF SECURITY RESTRICTIONS
					//IMG SRC and HTML SOURCE ARE DIFFERENT
					//NO DATAURL ALLOWED IF THIS IS THE CASE
					}
					
					//context.drawImage(img, 0, 0, w, h);
					
				//the crossOrigin property will let you use images from different domains IF the SERVER allows it
				//and if you are using Chrome or Firefox
				//https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
				
			}
				  
		}


app.initialize();


