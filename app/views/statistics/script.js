function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    console.log('test theme change')
    if(localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

setTheme('theme-dark');

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

    document.getElementsByClassName('theme')[0].addEventListener('click', toggleTheme);

}

function setAnimation() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    screenWidth = canvas.width;
    screenHeight = canvas.height;

    Animation(ctx);
}
