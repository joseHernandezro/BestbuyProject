let sig;
        $(document).ready(function () {
            //the signature is retieved
            sig = $('#sig').signature();
            //SET THE GUIDELINE
            sig.signature({ guideline: true, guidelineOffset: 25, guidelineIndent: 20, guidelineColor: '#ff0000' });
            //sendSignatureToKonyContext();
            //SETTING THE EVENTS
            //function when disable button is clicked
            $('#disable').click(function () {
                var disable = $(this).text() === 'Disable';
                $(this).text(disable ? 'Enable' : 'Disable');
                sig.signature(disable ? 'disable' : 'enable');
            });
            //function when clear button is clicked
            $('#clear').click(function () {
                sig.signature('clear');
            });
            //function when save button is clicked
            $('#json').click(function () {
                var jsonImg = sig.signature('toJSON');

            });
            //function when svg button is clicked
            $('#svg').click(function () {

            });
            $("#save").click(function () {
                sendSignatureToKonyContext();
            });
        });
        function sendSignatureToKonyContext() {
            var jsonImg = sig.signature('toJSON');
            var svgImg = sig.signature('toSVG');
            var pngImg = sig.signature('toDataURL');
            svgImg = { svgImg };
            svgImg = JSON.stringify(svgImg);
            console.log("Printing from browser");
            console.log(typeof(pngImg));
            console.log(pngImg);
            // console.log("type of jsonImg: " + typeof(jsonImg));
            // console.log("type of svgImg: " + typeof(svgImg));
            // console.log(svgImg);
            kony.evaluateJavaScriptInNativeContext("retrieveImageToKonyContext('" + jsonImg + "'," + svgImg + ",'" + pngImg + "')");
            // kony.evaluateJavaScriptInNativeContext('retrieveImageToKonyContext('+ jsonImg +')');
        }