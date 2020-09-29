function getVideoSources(){
  console.log('getVideoSources')
  iframe = document.getElementById('unit-iframe');
  if(iframe != null){
    window.location = iframe.src;
    window.reload();
    return null;
  }
  var list = [];
  let video = $('.video.is-initialized');
  if(video.length > 0){
    let metadata = $('.video.is-initialized').attr('data-metadata');
    if(metadata != undefined){
      let content = JSON.parse(metadata);
      console.log(content)
      if('sources' in content){
        let sources = content.sources;
        for (var i = sources.length - 1; i >= 0; i--) {
          if(sources[i].endsWith('.mp4')){
            //window.open(sources[i], "_blank");
            list.push(sources[i]);
          }
        }
      }
    }
  }
  return list;
}

//wait for popup.js to ask content.js for metadata
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.msg == "getVideoSources"){
      sendResponse({msg: {
      	sources: getVideoSources(),		//get video soiurces
      }});
    }
  }
);