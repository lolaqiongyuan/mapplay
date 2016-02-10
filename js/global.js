
(function(){

	// create a canvas
	function createCanvas(width, height){
		var canvas = document.createElement('canvas');

		canvas.id = 'Lola\'s adventure';
		canvas.width = width;
		canvas.height = height;
		canvas.style.border = "1px solid #cccccc";
		return canvas;
	};

	// canvas test drive
	var width = window.innerWidth;
    var height = window.innerHeight;
    var state = {width, height};
    var mapSVG = null;
    // var img = null;
    var target = {
        x:0,y:0,
        width: state.width,
        height: state.height,
    }
    var slice = {
    	x:0,y:0,
        width: state.width,
        height: state.height,
    }
	var url = 'dam/africa.svg';
	var canvas = createCanvas(width, height);
	var ctx = canvas.getContext('2d');
	var container = document.getElementById('body');
	canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;
	container.appendChild(canvas);

	
	//return the promise
	function get(url){

		var promise = new Promise(function(resolve, reject){
			var ajax = new XMLHttpRequest();

			ajax.open('GET', url);

			ajax.onload = function(){
				if(ajax.status == 200) {
					resolve(ajax.response);
				} else {
					reject(ajax);
				}
			}
			ajax.send();
		});

		return promise;
	};

	function loadImage(src){
		var promise = new Promise(function(resolve, reject){
			var img = new Image();
			img.addEventListener("load",function(event){
		      resolve(img);
		    });
			img.src = src;
		});
		return promise;
	};

	get(url).then(function(response){
		
		mapSVG = new DOMParser().parseFromString(response,'image/svg+xml');// parse a string(response) into a DOM Document
		mapSVG = Array.from(mapSVG.childNodes).filter(function(node){
            var tag = node.tagName;
            if(typeof tag == 'undefined') return false;
            return tag.toLowerCase() == 'svg';
          })[0]; //only get the svg part from Document 

		console.log(mapSVG);

		loadImage(url).then(function(img){
			// ctx.drawImage(img, 0, 0)
			renderMap(img);
		});
	}).catch(
        // Log the rejection reason
        function(reason) {
        	console.log('Handle rejected promise ('+reason+') here.');
        }
	);


	function drawCanvasSlice(ctx, img, slice, target){
	  var sliceScale={
	    x:img.width/slice.width,
	    y:img.height/slice.height,
	  }
	  var targetSize={
	    width:target.width*sliceScale.x,
	    height:target.height*sliceScale.y
	  }
	  var targetScale={
	    x:targetSize.width/img.width,
	    y:targetSize.height/img.height
	  }

	  ctx.drawImage(
	    img, 
	    Math.round(-slice.x*targetScale.x),
	    Math.round(-slice.y*targetScale.y),
	    Math.round(targetSize.width),
	    Math.round(targetSize.height)	   
	  )
	}


	var mapBuffer = createCanvas(1750,2235);
	var mapBufferCtx = mapBuffer.getContext('2d');

	function drawMapBuffer(ctx, pos, zoom){
		ctx.fillStyle = 'white';
		ctx.fillRect(0,0,800,600);

		// var mapIndex = 0;
		drawCanvasSlice(ctx, pos, slice, target);
		
	}

	function updateMapBuffer(buffer){
		// var buffer = drawMapBuffer();
		// this.mapBufferOffset = buffer.offset;
		drawMapBuffer(ctx, buffer, 2);
	};

	function drawMap(img){
		// var map = drawMapBuffer(mapBufferCtx, slice, 2);
		drawCanvasSlice(ctx, img, slice, target);
	}

	// function drawRoute(){

	// };

	// function initMapBuffer(){

	// };

	function renderMap(img){
		// drawCanvasSlice();
		// updateMapBuffer(slice);
		drawMap(img);
	};

	function updateScroll(){
		// updateMapBuffer();
		// drawRoute();

	};

})();