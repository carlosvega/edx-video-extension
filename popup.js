//VUE
//when the document it's ready
var app = undefined;
$(function() {

	//create Vue app
	app = new Vue({
		el: '#app',
		data: {
			sources: [],
			firstTry: false,
			msg: 'Page may reload after click. If so, click afterwards again.'
		},
		mounted: function () {
			console.log('mounted', app)
			this.askForMetadata();	
		},
		methods: {
			// function to handle the response from content.js
			responseCallback(response) {
				if(response != undefined){
					if(response.msg.sources == null){
						this.$set(this, 'msg', 'Page reloaded, please click again to get video sources.')
					}else{
						this.$set(this, 'sources', response.msg.sources);
					}
				}else{ //might hthisen that when we change between tabs we need to ask again the content.js script
					this.$set(this, 'sources', []);
					if(!this.firstTry){
						this.$set(this, 'firstTry', true);
						setTimeout(this.askForMetadata(), 100);
					}
				}
			},
			//Send message to content.js and handle the response with responseCallback
			askForMetadata(){
				var that = this;
				chrome.tabs.query({active: true, currentWindow: true}, 
					function(tabs) {
						if(tabs != undefined){
							//getVideoSources it's an arbitrary string we use to identify what we ask content.js to send us from the DOM.
				  			chrome.tabs.sendMessage(tabs[0].id, {msg: "getVideoSources"}, that.responseCallback);
				  		}
					}
				);
			}
		}
	});

});