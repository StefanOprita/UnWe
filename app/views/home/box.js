var Box = function(element) {
    var rect = element.getBoundingClientRect();

    var checkAndComputeCollision = function(x, y, angle) {
        if(angle < 0) angle = 2 * Math.PI - (-1 * angle);
        let angleSection = parseInt(angle / (Math.PI / 2)) % 4;

        if(y >= rect.top && x >= rect.left && x <= rect.right && angleSection < 2) angle = 2 * Math.PI - angle;
        if(x <= rect.right && y >= rect.top && y <= rect.bottom && angleSection % 3 != 0) angle = Math.PI - angle;
        if(y <= rect.bottom && x >= rect.left && x <= rect.right && angleSection > 1) angle = Math.PI - (angle - Math.PI);
        if(x >= rect.left && y >= rect.top && y <= rect.bottom && angleSection % 3 == 0) angle = Math.PI - angle;

        let c = 2 * Math.PI;

        // if(y < 0 && (angleSection == 2 || angleSection == 3)) angle = Math.PI - (angle - Math.PI);
        // if(y > screenHeight && (angleSection == 0 || angleSection == 1)) angle = 2 * Math.PI - angle;
        // if(x < 0 && (angleSection == 1 || angleSection == 2)) angle = Math.PI - angle;
        // if(x > screenWidth && (angleSection == 3 || angleSection == 0)) angle = Math.PI - angle;
        return angle;

    };

    var draw = function(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = teal;
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
    };

    return {
        checkAndComputeCollision: checkAndComputeCollision,
        draw: draw
    };
};
