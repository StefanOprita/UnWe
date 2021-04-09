var Animation = function(ctx) {

    var count = 0;
    var delta = 0;
    var oldMillisecond = 0;

    var boxes = [];
    initBoxes();

    dots = [];
    dots.push(Dot(boxes));

    setInterval(function() {
        var millisecond = new Date().getMilliseconds();
        delta = millisecond - oldMillisecond;
        oldMillisecond = millisecond;
        if(delta < 0) delta += 1000;

        count += delta;
        if(count > 200 && dots.length < 10) {
            dots.push(Dot(boxes));
            count = 0;
        }

        for(let i = 0; i < dots.length; i++) {
            dots[i].update(delta);
        }




        ctx.clearRect(0, 0, screenWidth, screenHeight);
        for(let i = 0; i < dots.length; i++) {
            dots[i].draw(ctx);
        }
        // for(var i = 0; i < boxes.length; i++) {
        //     boxes[i].draw(ctx);
        // }

    }, minDelta);


    function initBoxes() {
        Array.from(document.getElementsByClassName('collision-box'), (elem) => boxes.push(Box(elem)));
    };

};
