$('html, body').animate({
    scrollTop: $("#elementtoScrollToID").offset().top
}, 2000);





// stuff to scrape Artsy
function allTheScroll(){
    // only works here https://www.artsy.net/user/saves
    var numberOfSavesLong = $('.settings-quasi-infinite div.settings-quasi-infinite__total').text();
    var numberOfSaves = numberOfSavesLong.substring(0, 3)
    var numberPages = Math.round(numberOfSaves/10);
        var counter = 0;
        var ticker = setInterval(function(){
            $('.js-settings-quasi-infinite__more__button').click()
            counter ++;
            console.log("tick", counter);
            if (counter === numberPages){
                console.log("done ticking!");
                clearInterval(ticker)
                scapeArtsy()
            }
        },999)
}


function scapeArtsy(){
    var savedWorks = [];
    var lastScrapeArtsy = Date.now();
    $('.settings-quasi-infinite__collection figure').each( function(node){
        var img1 = $(this).find('.artwork-item-image img').attr("src")
        var artsyLink = $(this).find('.artwork-item-image-link').attr("href")
        var artist = $(this).find('figcaption.artwork-item-caption .artwork-item-artist').text()
        var title = $(this).find('figcaption.artwork-item-caption .artwork-item-title em').text()
        var yearLong = $(this).find('figcaption.artwork-item-caption .artwork-item-title').text()
        var yearShort = yearLong.substr(yearLong.length - 4);
        var gallery = $(this).find('figcaption.artwork-item-caption .artwork-item-partner a').text()
        var galleryLinkArtsy = $(this).find('figcaption.artwork-item-caption .artwork-item-partner a').attr("href")
        var price = $(this).find('figcaption.artwork-item-caption p.artwork-item-sale-price').text();
        var artistLinkArtsy = $(this).find('figcaption.artwork-item-caption .artwork-item-artist a').attr("href");

        var newPiece = {
                img1: img1,
                artist: artist,
                title: title,
                medium: "",
                dimensions: "",
                date: yearShort,
                gallery: gallery,
                galleryLinkArtsy: galleryLinkArtsy,
                price: price,
                artsyLink: artsyLink,
                artistLinkArtsy: artistLinkArtsy,
                lastScrapeArtsy: lastScrapeArtsy,
                notes: ""
        }
        savedWorks.push(newPiece)
    })
    console.log(savedWorks);

    function exportJsonBtn(){
            // console.log(JSON.stringify(data));
            var csvContent = "data:application/json;charset=utf-8,";
            csvContent += JSON.stringify(savedWorks)
            var encodedUri = encodeURI(csvContent);
            // window.open(encodedUri);
            var timestamp = Math.floor(Date.now() / 1000);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data_" + timestamp + ".json");
            link.click(); 
    }
    exportJsonBtn();
}





function scapeArtsyLocation(whatLocation){
    var savedGalleryLocation = [];
    var lastScrapeArtsy = Date.now();
    $('.galleries-institutions-results-grid .partner-cell').each( function(node){
        var locationScraped = "new-york-ny-usa";
        var link1 = $(this).find('a.partner-featured-image').attr("href");
        var thumb1 = $(this).find('div.hoverable-image').attr("style");
        if (typeof thumb1 == "string"){
            var thumbUrl = thumb1.substr(22, thumb1.length-3);
            // still returns a ); at the end. dont know why
            console.log("ok ", thumbUrl);
        } else {
            var thumbUrl = undefined
        }
        var galleryName = $(this).find('div.partner-cell-name').text();
        var location1 = $(this).find('div.partner-cell-location').text();

        var newGallery = {
                locationScraped: whatLocation,
                link1: link1,
                thumbUrl: thumbUrl,
                galleryName: galleryName,
                location1: location1,
                lastScrapeArtsy: lastScrapeArtsy
        }
        savedGalleryLocation.push(newGallery)
    })
    console.log(savedGalleryLocation);
    function exportJsonBtn(){
            // console.log(JSON.stringify(data));
            var csvContent = "data:application/json;charset=utf-8,";
            csvContent += JSON.stringify(savedGalleryLocation)
            var encodedUri = encodeURI(csvContent);
            // window.open(encodedUri);
            var timestamp = Math.floor(Date.now() / 1000);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data_scapeArtsyLocation_" + whatLocation + 
            "_" + timestamp + ".json");
            link.click(); 
    }
    exportJsonBtn();
}
scapeArtsyLocation("new-york-ny-usa");
