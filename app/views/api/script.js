function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    console.log('test theme change')
    if(localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        // document.getElementById('theme-icon').innerHTML = 'light_mode';
        document.getElementsByClassName('theme-dark-button')[0].style.opacity = 0;
        document.getElementsByClassName('theme-light-button')[0].style.opacity = 1;


        document.getElementById("prismCss").href="../../../public/prism-light.css";
        document.getElementById("prismJs").href="../../../public/prism-light.js";
        //light_mode
    } else {
        setTheme('theme-dark');
        // document.getElementById('theme-icon').innerHTML = 'dark_mode';
        document.getElementsByClassName('theme-dark-button')[0].style.opacity = 1;
        document.getElementsByClassName('theme-light-button')[0].style.opacity = 0;


        document.getElementById("prismCss").href="../../../public/prism-dark.css";
        document.getElementById("prismJs").href="../../../public/prism-dark.js";
        //dark_mode
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
    var canvas = document.getElementById('api-canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    screenWidth = canvas.width;
    screenHeight = canvas.height;

    Animation(ctx, false);
}
