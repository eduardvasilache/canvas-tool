$(window).on("load", function () {

    var pointColor = pointColor = "#" + document.getElementById("colorPickerPoint").value;
    var rectangleColor = rectangleColor = "#" + document.getElementById("colorPickerRectangle").value;
    var rectX = null;
    var rectY = null;

    $("#canvas").click(function (e) {
        getPosition(e);
    });

    $("#checkboxDrawRectangle").click(function (e) {
        rectX = null;
        rectY = null;
    });

    $("#colorPickerPoint").change(function () {
        pointColor = "#" + document.getElementById("colorPickerPoint").value;
    });

    $("#colorPickerRectangle").change(function () {
        rectangleColor = "#" + document.getElementById("colorPickerRectangle").value;
    });

    function getPosition(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        draw(x, y);
    }

    function draw(x, y) {
        var context = document.getElementById("canvas").getContext("2d");

        if (rectX != null && rectY != null) {
            context.rect(rectX, rectY, x - rectX, y - rectY);
            context.fillStyle = rectangleColor;
            context.fill();

            var textHistory = rectX + ' ' + rectY + " " + x + ' ' + y;
            var div = document.getElementById("text");
            div.innerHTML += "<font color=\"" + rectangleColor + "\">" + textHistory + "</font><br>";

            document.getElementById("checkboxDrawRectangle").checked = false;

            rectX = null;
            rectY = null;
        }
        else {
            if (document.getElementById("checkboxDrawRectangle").checked) {
                rectX = x;
                rectY = y;
                context.moveTo(rectX, rectY);
            }
            else {
                var textHistory = x + ' ' + y;
                var div = document.getElementById("text");
                div.innerHTML += "<font color=\"" + pointColor + "\">" + textHistory + "</font><br>";
            }
        }

        context.beginPath();
        context.arc(x, y, 5, 0, Math.PI * 2, true);
        context.fillStyle = pointColor;
        context.fill();

        var textCanvas = "(" + x + ', ' + y + ")";
        context.fillStyle = "white";
        context.fillText(textCanvas, x + 10, y + 3);
    }

});