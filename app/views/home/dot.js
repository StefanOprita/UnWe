var Dot = function() {
    var x = Math.random() * screenWidth;
    var y = Math.random() * screenHeight;
    var radius = 5;
    var speed = 3;
    var angle = Math.random() * 2 * Math.PI;
    var trailX = [];
    var trailY = [];
    // var trailCount = 50;
    var trailCount = 50;
    var image = document.getElementById("dot");


    var draw = function(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(x, y);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();

        for(var i = 1; i < trailX.length; i++) {
            ctx.strokeStyle = 'rgba(' + tealRgb + ', ' + (1 - i / trailCount) / 10 + ')';
            // ctx.strokeStyle = 'rgba(251, 70, 79, ' + (1 - i / trailCount) / 50 + ')';
            // ctx.strokeStyle = 'rgba(255, 247, 71, ' + 1 + ')';
            ctx.moveTo(trailX[i - 1], trailY[i - 1]);
            ctx.lineTo(trailX[i], trailY[i]);
            ctx.stroke();

        };

        ctx.closePath()
        // console.log(trailX.length);
    };

    var update = function(delta) {
        if(angle > 2 * Math.PI) angle -= 2 * Math.PI;

        speed = delta / 10 * 5;
        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;

        let c = 2 * Math.PI;
        if(angle < 0) angle = 2 * Math.PI - (-1 * angle);
        let angleSection = parseInt(angle / (Math.PI / 2)) % 4;

        if(y < 0 && (angleSection == 2 || angleSection == 3)) angle = Math.PI - (angle - Math.PI);
        if(y > screenHeight && (angleSection == 0 || angleSection == 1)) angle = 2 * Math.PI - angle;
        if(x < 0 && (angleSection == 1 || angleSection == 2)) angle = Math.PI - angle;
        if(x > screenWidth && (angleSection == 3 || angleSection == 0)) angle = Math.PI - angle;

        if(trailX.length < trailCount) {
            trailX.unshift(x);
            trailY.unshift(y);
        } else {
            trailX.pop();
            trailX.unshift(x);
            trailY.pop();
            trailY.unshift(y);
        }
    };

    return {
        getX: () => x,
        getY: () => y,
        getAngle: () => angle,
        draw: draw,
        update: update,
    };
}
