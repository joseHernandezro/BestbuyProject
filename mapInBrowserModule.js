function retieveIndexLocationInKonyContext(index) {
    browserMapControllerContext.animateOpenStoreDetailBar(index);
}
function closeBarFromKonyView(){
    browserMapControllerContext.animateCloseStoreDetailBar();
}
function sendLocationsToHTML(locations) {
    var JSONLocations = JSON.stringify(locations);
    var jsscript = "locatePins('" + JSONLocations + "')";
    browserMapViewContext.brwMap.evaluateJavaScript(jsscript);
}