
function fetchImg(ev){
	 
	var device_id = "1A3B25B5-1EEE-4F46-893C-1433D7BCC4CB"; // this should be global 
	var imageId = ev.target.getAttribute("id");
	var target = ev.target.split("#"); 
	alert(target[0]);
	var url = "http://m.edumedia.ca/ioud0001/mad9022/final/get.php?dev=" + device_id + "&img_id=" + imageId;
	// part of the url should be global: http://m.edumedia.ca/ioud0001/mad9022/final/
	console.log(url); 
	sendRequest(url, modalImg, null);
	var nodeName = ev.target.nodeName;
	 
	 if (target[0] == "btn")
	 {
		 alert("targetting btn");
	 } else
	 {
		 alert("not targeting btn"); 
	 }
	 /*
	 switch (nodeName)
	 {
		 case "IMG":
		 	sendRequest(url, modalImg, null);
			break;
		case "INPUT":
			ev.preventDefault(); 
			taps.delimage(ev); 
			//ev.removeEventListener("img", "Tap", false);
			break;
	 }
	 alert(nodeName); 
	 */
	
}

function modalImg(xhr){
	var json = JSON.parse(xhr.responseText);
	
	var modal =  document.querySelector("[data-role=modal]"); 
	modal.innerHTML = ""; // clears the modal to prevent multiple images from showing up
	var div = document.getElementById("fullImage"); 
	var img = document.createElement("img");
	img.src = json.data;
	
	
	var backBtn = document.createElement("input");
	backBtn.type = "button"; 
	backBtn.className = "close";
	backBtn.value = "Close Image"; 
	
	modal.appendChild(img); 
	modal.appendChild(backBtn);
	
	modal.style.display = "block";  
	
	taps.btnhide(); 
}

function downloadGrid(){
	var device_id = "1A3B25B5-1EEE-4F46-893C-1433D7BCC4CB"; 
	var url = "http://m.edumedia.ca/ioud0001/mad9022/final/list.php?dev=" + device_id; 
	sendRequest(url, imgReturned, "GET");
}

// returns the images and initializes the tap event for each image
function imgReturned(xhr){
	
	var json = JSON.parse(xhr.responseText);
	var img, button; 
	var ul = document.createElement("ul"); 
	ul.className ="container"; 
	ul.setAttribute("data-role", "listview");
	var br = document.createElement("br");  
	for(var i=0; i<json.thumnbails.length; i++)
	{
								  img = document.createElement("img");
								  button = document.createElement("input"); 
								  var li = document.createElement("li"); 
								  li.className = "col-4"; 
								  
								  button.id = "btn" + i; 

								  img.crossOrigin = "Anonymous";
								  button.id = "btn" + i;
								  img.id = json.thumnbails[i].id;
								  
								  img.width = "180";
								  img.height = "200";
								  img.src = json.thumnbails[i].data;
								  img.setAttribute("data-ref", json.thumnbails[i].id);
								  button.type = "button"; 
								  button.value = "Delete image!";
								  
								  li.appendChild(img);
								  li.appendChild(br);
								  li.appendChild(button); 
								  ul.appendChild(li); 
								  
								  // create event listeners for each image and target these
								  // create event listeners for each button and target these 
								  
	}
	document.querySelector("#grid").appendChild(ul); 
	taps.init(); // initilizes the tap event listeners
}

var taps = {
init: function(){
	 var modal = document.querySelector("[data-role=modal]").style.display = "none";
	 
	 var selectImage = document.querySelector("[data-role=listview]"); 
	 var mc = new Hammer.Manager(selectImage);
	 mc.add( new Hammer.Tap({ event: 'singletap' }) );
	 mc.on("singletap", fetchImg); 
	 
  },
  btnhide: function(ev){
	  // initializes an event listener on the cancel button in the modal 
	  var btn = document.querySelector(".close"); 
	  var mc = new Hammer.Manager(btn);
	  mc.add( new Hammer.Tap({ event: 'singletap' }) );
	  mc.on("singletap", taps.hidemodal);
  },
  hidemodal: function(ev){
	   // hides the modal
	   var modal = document.querySelector("[data-role=modal]");
	   modal.style.display = "none";
	   modal.innerHTML = ""; // clears the modal html 
	   
  },
  delimage: function(ev){
	  
  }
}
