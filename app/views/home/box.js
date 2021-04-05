var Box = function(element) {
    var rect = element.getBoundingClientRect();

    var checkAndComputeCollision = function(x, y, angle) {
        if(angle < 0) angle = 2 * Math.PI - (-1 * angle);
        let angleSection = parseInt(angle / (Math.PI / 2)) % 4;

        if(y >= rect.top && y <= rect.bottom && x >= rect.left && x <= rect.right) {
            var sidesAction = [() => 2 * Math.PI - angle, () => Math.PI - angle, () => Math.PI - (angle - Math.PI), () => Math.PI - angle];
            var closestArray = [Math.abs(y - rect.top), Math.abs(x - rect.right), Math.abs(y - rect.bottom), Math.abs(x - rect.left)];

            var index = closestArray.indexOf(Math.min(...closestArray));
            console.log(index);
            angle = sidesAction[index]();

            // if(angleSection < 2) { // top side
            //     console.log('test1');
            //     angle = 2 * Math.PI - angle;
            // } else if(angleSection % 3 != 0) { // right side
            //     console.log('test2');
            //     angle = Math.PI - angle;
            // } else if(angleSection > 1) { // bottom side
            //     console.log('test3');
            //     angle = Math.PI - (angle - Math.PI);
            // } else if(angleSection % 3 == 0) { // left side
            //     console.log('test4');
            //     angle = Math.PI - angle;
            // }
        }

        // if(y < 0 && (angleSection == 2 || angleSection == 3)) angle = Math.PI - (angle - Math.PI);
        // if(y > screenHeight && (angleSection == 0 || angleSection == 1)) angle = 2 * Math.PI - angle;
        // if(x < 0 && (angleSection == 1 || angleSection == 2)) angle = Math.PI - angle;
        // if(x > screenWidth && (angleSection == 3 || angleSection == 0)) angle = Math.PI - angle;
        // console.log(angle);
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
