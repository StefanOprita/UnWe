var Dot = function(boxes) {
    var x = Math.random() * screenWidth;
    var y = Math.random() * screenHeight;
    var radius = 5;
    var speed = Math.random() * 2 + 1;
    var angle = Math.random() * 2 * Math.PI;
    var radius = 5;
    var trailX = [];
    var trailY = [];
    // var trailCount = 50;
    var trailCount = 50;
    var image = document.getElementById("dot");

    spawnDot();

    function spawnDot() {
        var insideBox = false;
        do {
            insideBox = false;
            x = Math.random() * screenWidth;
            y = Math.random() * screenHeight;
            for(var i = 0; i < boxes.length; i++) {
                if(boxes[i].checkIfInside(x, y)) {
                    insideBox = true;
                    break;
                }
            }
        } while(insideBox);
    }

    var setAngle = function setAngle(newAngle) {
        angle = newAngle;
    }

    var draw = function(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(x, y);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
        // ctx.fillStyle = teal;
        // ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        // ctx.fill();

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
        for(let j = 0; j < boxes.length; j++) {
            angle = boxes[j].checkAndComputeCollision(x, y, getNextX(), getNextY(), angle);
        }
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

    var getNextX = () => x + Math.cos(angle) * speed;
    var getNextY = () => y + Math.sin(angle) * speed;

    return {
        getX: () => x,
        getY: () => y,
        getNextX: getNextX,
        getNextY: getNextY,
        getAngle: () => angle,
        setAngle: setAngle,
        draw: draw,
        update: update,
    };
}
