let imageBlock = $("#image")
let interval;
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3da384aaf3f6d01937c5fac1c919a8b4&tags=tag&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
  }


$("#search-button").click(function(){
    let value = $('#tag-input').val();
    settings.url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3da384aaf3f6d01937c5fac1c919a8b4&tags=${value}&format=json&nojsoncallback=1`
    $.ajax(settings).done(function (data) {
        clearInterval(interval);
        console.log(data)
        let photos = data.photos.photo;
        let i = 0;
        interval = setInterval(function(){
            let src = `https://farm${photos[i].farm}.staticflickr.com/${photos[i].server}/${photos[i].id}_${photos[i].secret}.jpg`
            imageBlock.attr("src", src);
            i++;
        }, 3000)
      });
})