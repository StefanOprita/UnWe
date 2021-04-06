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
        //light_mode
    } else {
        setTheme('theme-dark');
        // document.getElementById('theme-icon').innerHTML = 'dark_mode';
        document.getElementsByClassName('theme-dark-button')[0].style.opacity = 1;
        document.getElementsByClassName('theme-light-button')[0].style.opacity = 0;
        //dark_mode
    }
}

setTheme('theme-dark');

window.addEventListener('DOMContentLoaded', (event) => {
    setUX();
    setAnimation();
});

function setUX() {
    setMenu();
    setThemeButton();
    setAddCountyButton();
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

function setMenu() {
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

}
function setThemeButton() {
    document.getElementsByClassName('theme')[0].addEventListener('click', toggleTheme);

}
function setAddCountyButton() {
    addButton = document.getElementsByClassName('item-add-surface')[0];
    selectorContainer = document.getElementsByClassName('county-select-container')[0];
    selectorItems = document.getElementsByClassName('selector-item');

    addButton.addEventListener('click', function() {
        document.getElementsByClassName('county-add-icon')[0].style.margin = 'auto 10px';

        selectorContainer.classList.add('county-select-container--opened');

        console.log("added class")

    });

    document.body.addEventListener('click', function(e) {
        if(addButton.contains(e.target) || selectorContainer.contains(e.target)) return;

        document.getElementsByClassName('county-add-icon')[0].style.margin = 'auto';
        selectorContainer.classList.remove('county-select-container--opened');
    });

    for(var i = 0; i < selectorItems.length; i++) {
        selectorItems[i].addEventListener('click', function() {
            document.getElementsByClassName('county-add-icon')[0].style.margin = 'auto';
            selectorContainer.classList.remove('county-select-container--opened');

            console.log("event listened added");

            // TODO select item
        });
    }
}
