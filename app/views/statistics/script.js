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
    addSelectedCounty('SV');
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


        //cod pentru a face etichetele cu judetele sa fie sub search items
        countyItems = document.getElementsByClassName('item');
        
        for (let index = 0; index < countyItems.length; index++) {
            const element = countyItems[index];
            element.style.zIndex = -1;
        }

    });

    document.body.addEventListener('click', function(e) {
        if(addButton.contains(e.target) || selectorContainer.contains(e.target)) return;

        document.getElementsByClassName('county-add-icon')[0].style.margin = 'auto';
        selectorContainer.classList.remove('county-select-container--opened');
        countyItems = document.getElementsByClassName('item');
        
        //facem reverse-ul la ce am facut mai devreme
        for (let index = 0; index < countyItems.length; index++) {
            const element = countyItems[index];
            element.style.zIndex = 0;
        }
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

var listOfSelectedCountys = [];

function addSelectedCounty(countyId) {
    listOfSelectedCountys.push(countyId);
    const itemDiv = document.createElement('div');

    itemDiv.classList.add('item');

    itemDiv.innerHTML = `
        <span class="county-text"> ${countyId} </span>
        <div class="close-button"></div>
        <span class="county-text material-icons">close</span>
    `;
    // <div class="item">
    //             <span class="county-text">SV</span>
    //             <div class="close-button"></div>
    //             <span class="county-text material-icons">close</span>
    //         </div>

    document.getElementsByClassName('counties-bar')[0].appendChild(itemDiv);

}



