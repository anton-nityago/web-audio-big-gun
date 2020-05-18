
let AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();
let source; 

var eventBus = new Vue();
var app = new Vue({
  components: {'comp-a': compA}, 
  el: '#app',
  data: {
   mydata: [], 
   buff: [], 
   playIndex: -1, 
   isFirst: true, 
   isLoaded: false  
  }, 
	methods:{
		play: function(index){
		  		this.playIndex = index; 
		  		source = context.createBufferSource();
				source.buffer = this.buff[index];
				source.connect(context.destination);
				source.loop = true;
				source.start(); 
  	}
  }, 
		created: function(){
	eventBus.$on("play", (index)=>{
		  		if (!this.isFirst){
		 			source.stop(); 
		 			eventBus.$emit("stop");
		  			this.play(index); 
		  		} else {
		  			this.play(index); 
		  			this.isFirst = false; 
		  		}
		  		this.playIndex = index; 
	    	});
	eventBus.$on("stop", ()=>{
	      		source.stop(); 
    });
    eventBus.$on("loaded", ()=>{
	      		this.isLoaded = true;  
    });
  }, 
		beforeMount: function(){ 
		   this.mydata = JSON.parse(data); 
		   let tempBuffer = [];
		  	let count = this.mydata.length; 
		   this.mydata.forEach((cassete, index)=>{
			    var req = new XMLHttpRequest();
			    req.open( "GET", "Public/" + cassete.audio, true );
			    req.responseType = "arraybuffer";    
			    req.onreadystatechange = function (e) {
				if (req.readyState == 4) {
					if(req.status == 200) {
							context.decodeAudioData(req.response, function(buffer) {
						 	tempBuffer[index] = buffer;

						 	if (tempBuffer.length == count){
						 		eventBus.$emit("loaded");
						 	}
						})
					} else alert('error during the load.Wrong url or cross origin issue');
				}} ;
				req.send();
		})

		   this.buff = tempBuffer; 
	}
})
