//var url = "http://localhost/semester2/mad9022/photofinal/www/";
var url = "http://m.edumedia.ca/ioud0001/mad9022/final/";
//var device_id = device.UUID;
var device_id = app.deviceID; // this device id 
var image_id; 
// the image id is global so it can be re-used in the modals - to view an image and to remove an image from the list and database 
// the image id is declared in the fetchImg function and changes each time an image is clicked

var json; // I personally think it makes sense to make the json data global so it could be accessed from anywhere in the app 
var message = "";  // status message telling you an image was deleted 
var timeout; // timeout variable - the message will disappear 

function downloadGrid(){
	var path = url + "list.php?dev=" + device_id;  
	sendRequest(path, imgReturned, "GET");
}

function fetchImg(ev){
	image_id  = ev.target.parentElement.firstElementChild.id;
	var thisClick = ev.target.nodeName; 

	var path = url + "get.php?dev=" + device_id + "&img_id=" + image_id;

	 if (thisClick == "IMG")
	 {
		sendRequest(path, modalImg, null); // display the full image 
	 } else
	 {
		  grid.modaldel(ev); // remove the image 
		  ev.preventDefault();  
		 return; 
	 }
}

function modalImg(xhr){
	var json = JSON.parse(xhr.responseText);
	
	var modal =  document.querySelector("[data-role=modal]"); 
	modal.innerHTML = ""; // clears the modal to prevent multiple images from showing up
	var div = document.getElementById("fullImage"); 
	var img = document.createElement("img");
	img.src = json.data;
	image_id = img.id = json.id; 
	
	var p = document.createElement("p"); 
	
	var backBtn = document.createElement("input");
	backBtn.type = "button"; 
	backBtn.className = "close";
	backBtn.value = "Close Image"; 
	
	modal.appendChild(img);
	modal.appendChild(p); 
	modal.appendChild(backBtn);
	
	modal.style.display = "block";  
	
	grid.btnhide(); 
}



// returns the images and initializes the tap event for each image
function imgReturned(xhr){
	
	json = JSON.parse(xhr.responseText);
	var img, button; 
	var ul = document.createElement("ul"); 
	ul.className ="container"; 
	ul.setAttribute("data-role", "listview");
	var br = document.createElement("br");  
	for(var i=0; i<json.thumbnails.length; i++)
	{
								  img = document.createElement("img");
								  button = document.createElement("input"); 
								  var li = document.createElement("li"); 
								  var id = json.thumbnails[i].id;
								  li.setAttribute("data-ref", id);
								  
								  img.crossOrigin = "Anonymous";
								  img.width = "180";
								  //img.height = "";
								  img.src = json.thumbnails[i].data;
								  img.id = id;
								  
								  button.id = "btn" + id;
								  button.type = "button"; 
								  button.value = "Delete image!";
								  button.className = "button"; 
								  li.className = "col-4"; 
								  
								  li.appendChild(img);
								  li.appendChild(br);
								  li.appendChild(button); 
								  ul.appendChild(li); 
								  
	}
	var status = document.createElement("p"); 
	status.className = "status"; 
	status.innerHTML = ""; 
	document.querySelector("#grid").appendChild(status); // loads a status when images have been deleted 
	document.querySelector("#grid").appendChild(ul); 
	grid.init(); // initilizes the tap event listeners
}

var grid = {
init: function(){
	 var modal = document.querySelector("[data-role=modal]").style.display = "none";
	 
	 var selectImage = document.querySelector("[data-role=listview]"); 
	 var mc = new Hammer.Manager(selectImage);
	 mc.add( new Hammer.Tap({ event: 'singletap' }) );
	 mc.on("singletap", fetchImg); 
	 
  },
  // initializes an event listener on the close button in the modal 
  btnhide: function(ev){
	  var btn = document.querySelector(".close"); 
	  var mc = new Hammer.Manager(btn);
	  mc.add( new Hammer.Tap({ event: 'singletap' }) );
	  mc.on("singletap", grid.hidemodal);
  },
  // adds the "delete content" button to the modal 
  modaldel: function(ev){
	  var modal =  document.querySelector("[data-role=modal]");
	  modal.innerHTML = ""; 
	  modal.style.display = "block"; 
	  
	  var h3 = document.createElement("h3");
	  h3.innerHTML = "Are you sure you want to remove this image?";
	  var btnCancel; var btnDelete; // Cancel and delete buttons 
	  
	  btnCancel = document.createElement("input");
	  btnDelete = document.createElement("input"); 
	  btnCancel.type = btnDelete.type = "button"; 
	  btnCancel.id = "cancel"; 
	  btnCancel.value = "Cancel";
	  
	  btnDelete.value = "Confirm Delete"; 
	btnDelete.id="delete"; 
		modal.appendChild(h3);
		modal.appendChild(btnCancel);
		modal.appendChild(btnDelete); 
	
	grid.listenBtns(image_id); 
  }, // listens for the delete or cancel buttons to be clicked (in the delete modal) 
  listenBtns: function(id){ 
	var btnCancel = document.querySelector("#cancel"); 
	var btnDelete = document.querySelector("#delete"); 
	
	 var cancelTap = new Hammer.Manager(btnCancel);
	 cancelTap.add( new Hammer.Tap({ event: 'singletap' }) );
	 cancelTap.on("singletap", function(ev){
		 grid.hidemodal(); 
	 }); 
	 
	 var deleteTap = new Hammer.Manager(btnDelete);
	 deleteTap.add( new Hammer.Tap({ event: 'singletap' }) );
	 deleteTap.on("singletap", function(ev){
		ev.preventDefault(); 
		grid.deleteImage(ev); 
	 }); 
	 
  },
  // call this in any button event listeners to hide the modal - this prevents duplication
  hidemodal: function(ev){
	   var modal = document.querySelector("[data-role=modal]");
	   modal.style.display = "none";
	   modal.innerHTML = ""; // clears the modal html - there will be new things appended to the modal each time it is displayed 
	   
  },
  deleteImage: function(ev){
	  document.querySelector("[data-ref='" + image_id + "']").remove(image_id);
	  document.querySelector("[data-role=modal]").style.display = "none";
	  // call the delete.php files with the appropriate parameters 
	  var path = url + "delete.php";

	  var postData = path + "?dev=" + device_id + "&img_id=" + image_id;
	  console.log("Deleting image " + path + "?" + postData); 
	  sendRequest(postData, imgDelete, "GET");
  }
}

// this function will clear the "deleted message" status after 10 seconds 
function imgDelete(xhr){
	timeout = setTimeout('status_clear()', 10000); // clears the status after 10 seconds; 
    message = JSON.parse(xhr.responseText);
	document.querySelector(".status").innerHTML = message.message; // displays a message to the user if image was deleted successfully or not
}

function status_clear() {
    clearTimeout(timeout);
    document.querySelector(".status").innerHTML = ""; // clears the status message 

}