function retrieveImageToKonyContext(jsonImg, svgImg, pngImg) {
    pngImg = pngImg.slice(22);
    signatureFormContext.onSaveClick(pngImg);
}

function saveBtnFromKonyClicked() {
    var jsscript = "sendSignatureToKonyContext()";
    signatureFormView.browserSignature.evaluateJavaScript(jsscript);
}