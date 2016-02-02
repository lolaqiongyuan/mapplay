//throttled resize event
(function(){
	
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
		var id = document.getElementById('map');
		$(response).appendTo(id);

	}).catch(
        // Log the rejection reason
        function(reason) {
        	console.log('Handle rejected promise ('+reason+') here.');
        });

})();