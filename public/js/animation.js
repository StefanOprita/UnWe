var Animation = function(ctx) {

    var count = 0;
    var delta = 0;
    var oldMillisecond = 0;

    var boxes = [];
    initBoxes();

    dots = [];
    dots.push(Dot())

    setInterval(function() {
        var millisecond = new Date().getMilliseconds();
        delta = millisecond - oldMillisecond;
        oldMillisecond = millisecond;
        if(delta < 0) delta += 1000;

        count += delta;
        if(count > 200 && dots.length < 10) {
            dots.push(Dot());
            count = 0;
        }


        for(let i = 0; i < dots.length; i++) {
            dots[i].update(delta);
            for(let j = 0; j < boxes.length; j++) {
                dots[i].setAngle(boxes[j].checkAndComputeCollision(dots[i].getX(), dots[i].getY(), dots[i].getAngle()));
            }
        }




        ctx.clearRect(0, 0, screenWidth, screenHeight);
        for(let i = 0; i < dots.length; i++) {
            dots[i].draw(ctx);
        }
        // for(var i = 0; i < boxes.length; i++) {
        //     boxes[i].draw(ctx);
        // }

        // checkCollisions();

    }, minDelta);


    function initBoxes() {
        // boxes.push(
            // Box(document.getElementsByClassName('title')[0]),
            // Box(document.getElementsByClassName('menu')[0]),
            // Box(document.getElementsByClassName('showcase-hint')[0])
            // Box(document.getElementsByClassName('info-box__button-box')[0])
        // );
        Array.from(document.getElementsByClassName('collision-box'), (elem) => boxes.push(Box(elem)));
        // Array.from(document.getElementsByClassName('info-box__button'), (elem) => boxes.push(Box(elem)));
        // var array = document.getElementsByClassName('info-box__info');
        // for(let i = 0; i < array.length; i++) {
        //     boxes.push(Box(array[i]));
        // }
    };

    // var checkCollisions = function() {
    //
    // };

};
