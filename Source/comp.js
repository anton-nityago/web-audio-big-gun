
var compA =  {
  props: [
    'cassete', 
    'index'
  ], 
  data: function () {
    return {
      animate: '',
      style1: 'margin-top: 41px; margin-left: -231px; height: 100px; width: 100px;', 
      style2: 'margin-top: 41px; margin-left: 13px; height: 100px; width: 100px;',  
      isPlay: false, 
      casseteFace: "",
      isLoaded: false
    }
  },

    methods:{

      onClick: function(){
        if(this.isLoaded){
          if (!this.isPlay){
            eventBus.$emit("play", this.index);
            this.animate = "animation: rotation 5s infinite linear; ";
            this.isPlay = true; 
          } else {
            eventBus.$emit("stop", this.index);
            this.animate = "animation: rotation 5s infinite linear paused;"; 
            this.isPlay = false; 
          }
      }
      }, 
      stop: function(){
          this.animate = "animation: rotation 5s infinite linear paused;"; 
          this.isPlay = false;
      }
  }, 

    created(){
      eventBus.$on("stop", ()=>{
      this.stop();
  });
      eventBus.$on("loaded", ()=>{
      this.isLoaded = true;
  });
  
      this.casseteFace = "Public/" + this.cassete; 
}, 
  template:'\
  <div style="height: 250px; width: 250px; display: flex;">\
  <img class="im3" @mousedown="onClick" :src="casseteFace" style="z-index: 1; ">\
  <img class="im1" src="Public/wheel.png" v-bind:style="animate + style1">\
  <img class="im2" src="Public/wheel.png" v-bind:style="animate + style2">\
  </div>' 
}
