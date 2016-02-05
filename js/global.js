//throttled resize event
(function(){


	// create a canvas
	function createCanvas(width, height){
		var canvas = document.createElement('canvas');

		canvas.id = 'Lola\'s adventure';
		canvas.width = width;
		canvas.height = height;
		canvas.style.border = "1px solid gray";

		return canvas;
	};

	// canvas test drive
	var width = window.innerWidth;
    var height = window.innerHeight;
	var img = document.getElementById("test");
	var canvas = createCanvas(width, height);
	var ctx = canvas.getContext('2d');
	var container = document.getElementById('body');
	canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 0;
	// ctx.beginPath();
	// ctx.arc(95,50,40,0,2*Math.PI);
	// ctx.stroke();
	ctx.drawImage(img,0,0);
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

	get('dam/africa.svg').then(function(response){
		console.log(ctx);
		drawCanvasSlice(ctx,img);
	}).catch(
        // Log the rejection reason
        function(reason) {
        	console.log('Handle rejected promise ('+reason+') here.');
        }
	);


	function drawCanvasSlice(ctx, img){
	  // var sliceScale={
	  //   x:img.width/slice.width,
	  //   y:img.height/slice.height,
	  // }
	  // var targetSize={
	  //   width:target.width*sliceScale.x,
	  //   height:target.height*sliceScale.y
	  // }
	  // var targetScale={
	  //   x:targetSize.width/img.width,
	  //   y:targetSize.height/img.height
	  // }

	  ctx.drawImage(
	    img,
	    // Math.round(-slice.x*targetScale.x),
	    // Math.round(-slice.y*targetScale.y),
	    // Math.round(targetSize.width),
	    // Math.round(targetSize.height)
	    0, 0
	  )
	}

	function drawMap(){
		drawCanvasSlice(ctx, map.map);
	}

	function drawMapBuffer(ctx, pos, zoom){
		ctx.fillStyle = 'white';
		ctx.fillRect(0,0,800,600);

		// var mapIndex = 0;
		drawCanvasSlice(ctx, map.map);
		return ctx;
	}

	function updateMapBuffer(buffer){
		// var buffer = drawMapBuffer();
		// this.mapBufferOffset = buffer.offset;
	};

	// function drawRoute(){

	// };

	// function initMapBuffer(){

	// };

	function renderMap(){
		drawCanvasSlice();
		updateMapBuffer();
		drawMap();
	};

	function updateScroll(){
		// updateMapBuffer();
		// drawRoute();

	};



})();