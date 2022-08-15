define({
    firstCapture: true,
    init: function() {
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;
        signatureFormView = this.view;
        signatureFormContext = this;
        this.view.imgSignature.isVisible = false;
    },
    preShow: function() {},
    postShow: function() {
        this.view.btnSignature.onClick = saveBtnFromKonyClicked;
    },
    onSaveClick: function(svgImg) {
        if(this.firstCapture){
            this.view.imgSignature.isVisible = true;
            this.view.forceLayout();
            this.firstCapture = !this.firstCapture;
        }
        this.view.imgSignature.base64 = svgImg;
        console.log(this.view.imgSignature.base64);  
    }
});