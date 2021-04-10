var Box = function(element) {
    var rect = element.getBoundingClientRect();

    function intersects(line1X1, line1Y1, line1X2, line1Y2, line2X1, line2Y1, line2X2, line2Y2) {
        var det, gamma, lambda;
        det = (line1X2 - line1X1) * (line2Y2 - line2Y1) - (line2X2 - line2X1) * (line1Y2 - line1Y1);
        if(det === 0) {
            return false;
        } else {
            lambda = ((line2Y2 - line2Y1) * (line2X2 - line1X1) + (line2X1 - line2X2) * (line2Y2 - line1Y1)) / det;
            gamma = ((line1Y1 - line1Y2) * (line2X2 - line1X1) + (line1X2 - line1X1) * (line2Y2 - line1Y1)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    };

    var checkIfInside = function(x, y) {
        return (y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right);
    }

    // var checkAndComputeCollision = function(x, y, angle) {
    var checkAndComputeCollision = function(oldX, oldY, x, y, angle) {
        if(angle < 0) angle = 2 * Math.PI - (-1 * angle);
        let angleSection = parseInt(angle / (Math.PI / 2)) % 4;

        if(y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right) {
            var sidesAction = [
                () => 2 * Math.PI - angle,
                () => Math.PI - angle,
                () => Math.PI - (angle - Math.PI),
                () => Math.PI - angle
            ];

            var lineCollisionArray = [
                intersects(rect.left, rect.top, rect.right, rect.top, oldX, oldY, x, y),
                intersects(rect.right, rect.top, rect.right, rect.bottom, oldX, oldY, x, y),
                intersects(rect.left, rect.bottom, rect.right, rect.bottom, oldX, oldY, x, y),
                intersects(rect.left, rect.top, rect.left, rect.bottom,  oldX, oldY, x, y)
            ];

            var multipleCollisions = 0;
            lineCollisionArray.forEach(collision => multipleCollisions += (collision ? 1 : 0));

            var index = lineCollisionArray.indexOf(true);
            if(multipleCollisions == 1) angle = sidesAction[index]();

        }

        return angle;

    };

    var draw = function(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = teal;
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
    };

    return {
        checkIfInside: checkIfInside,
        checkAndComputeCollision: checkAndComputeCollision,
        draw: draw
    };
};
