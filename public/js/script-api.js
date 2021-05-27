window.addEventListener('DOMContentLoaded', (event) => {
    setUX();

    setAnimation();
});

function setUX() {
    menuBtn = document.getElementsByClassName('menu-button')[0];
    nav = document.getElementsByClassName('menu')[0];

    menuBtn.addEventListener('click', function() {
        nav.classList.add('menu--opened');
        menuBtn.classList.add('menu-button--opened');
    });

    document.body.addEventListener('click', function(e) {
        if(menuBtn.contains(e.target) || nav.contains(e.target)) {
            return;
        }
        nav.classList.remove('menu--opened');
        menuBtn.classList.remove('menu-button--opened');

    });

    document.getElementsByClassName('theme')[0].addEventListener('click', () => toggleTheme(true));
}

function setAnimation() {
    var canvas = document.getElementById('api-canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    screenWidth = canvas.width;
    screenHeight = canvas.height;

    Animation(ctx, false);
}
