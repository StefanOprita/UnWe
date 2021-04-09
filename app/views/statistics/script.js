searchInput = '';
paths = document.getElementsByTagName('path');
var initialColorOfCounty = '?';
var countyIdtoPathMap = new Map();
var countyIdtoNameMap = new Map();
var countyNameToIdMap = new Map();
var countyIdToColorMap = new Map();
var listOfSelectedCountys = [];

var CountyOnClickFunctions = new Array;
var CountyOnMouseEnterFunctions = new Array;
var CountyOnMouseLeaveFunctions = new Array;

// let countyColors = [
//     '#F44336', '#9C27B0', '#2196F3', '#009688', '#FFEB3B', '#795548',
//     '#E91E63', '#673AB7', '#3F51B5', '#03A9F4', '#00BCD4', '#4CAF50',
//     '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#9E9E9E',
//     '#000'
// ];

let countyColors = [
    '#40db71', '#fc4a26', '#fcc726', '#8ce322', '#002e0c',
    '#2e0800', '#67cfc8', '#6847a6', '#f7639c', '#50ad78',
    '#2a2252', '#50ad50', '#f7825c', '#9bf244', '#ca3c25',
    '#008148', '#ef8a17', '#a882dd', '#2d93ad', '#a62375',
    '#7272ab', '#53b3cb', '#2191fb', '#b7b868', '#8fd694',
    '#4f5d75', '#f5cd5f', '#bfc0c0', '#2d3142', '#6247aa',
    '#a06cd5', '#ff88dc', '#91a6ff', '#c46590', '#bf3232',
    '#c897ee', '#c24c61', '#c67ebf', '#da4473', '#ffd942',
    '#2d4200', '#750d37', '#19aabd', '#ff666d'
]

var theme = THEME_DARK;
// var darkGridColor = '#B0B2C3';
// var lightGridColor = '#6D6A7B';
var darkGridColor = '#1F1E25';
var lightGridColor = '#EBEBEB';
var chart;

let availableCountyColors = countyColors;

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;

    theme = themeName;
    Chart.defaults.global.defaultFontColor = (theme == THEME_DARK ? lightGridColor : darkGridColor);
    if(typeof chart !== 'undefined') {
        chart.setGridColor(((theme == THEME_DARK ? lightGridColor : darkGridColor) + '44'));
        chart.getChart().update();
    }

}
function toggleTheme() {
    console.log('test theme change')
    if(localStorage.getItem('theme') === THEME_DARK) {
        setTheme(THEME_LIGHT);
        // document.getElementById('theme-icon').innerHTML = 'light_mode';
        document.getElementsByClassName('theme-dark-button')[0].style.opacity = 0;
        document.getElementsByClassName('theme-light-button')[0].style.opacity = 1;
        //light_mode
    } else {
        setTheme(THEME_DARK);
        // document.getElementById('theme-icon').innerHTML = 'dark_mode';
        document.getElementsByClassName('theme-dark-button')[0].style.opacity = 1;
        document.getElementsByClassName('theme-light-button')[0].style.opacity = 0;
        //dark_mode
    }
}
setTheme(THEME_DARK);

window.addEventListener('DOMContentLoaded', (event) => {
    setUX();
    setAnimation();
    initializeMaps();
    setSearchCountyInput();
});



function setSearchCountyInput() {
    var searchBox = document.getElementsByClassName('search')[0];
    searchBox.addEventListener('input', function(e) {
        console.log(e.target.value);
        searchInput = e.target.value;
        initializeSearchItems();
    })
}

function setUX() {
    setMenu();
    setThemeButton();

    setCounties();
    setMap();

    setChart();
    setCategorySelector();

    setDownloadType();
    setRangePicker();


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

function setCounties() {
    addButton = document.getElementsByClassName('item-add-surface')[0];
    selectorContainer = document.getElementsByClassName('county-selector-container')[0];
    selectorItems = document.getElementsByClassName('selector-item');

    addButton.addEventListener('click', function() {
        document.getElementsByClassName('county-add-icon')[0].style.margin = 'auto 10px';

        selectorContainer.classList.add('county-selector-container--opened');
        console.log('added class')

        initializeSearchItems();

    });

    document.body.addEventListener('click', function(e) {
        if(addButton.contains(e.target) || selectorContainer.contains(e.target)) return;

        document.getElementsByClassName('county-add-icon')[0].style.margin = 'auto';
        selectorContainer.classList.remove('county-selector-container--opened');

        document.getElementsByClassName('search')[0].value = '';
        searchInput = '';
    });

    for(let index = 0; index < paths.length; index++) {
        const County = paths[index];
        County.onclick = onClickCounty;
        County.onmouseenter = onMouseEnterCounty;
        County.onmouseleave = onMouseLeaveCounty;
    }

}

function setMap() {
    var map = document.getElementsByClassName('map-menu')[0];
    var mapButton = document.getElementsByClassName('map-button')[0];

    mapButton.addEventListener('click', function() {
        const map = document.getElementsByClassName('map-menu')[0];
        mapButton.classList.add('map-button--opened');
        mapButton.style.opacity = 0;

        map.classList.add('map-menu--opened');
    });

    document.body.addEventListener('click', function(e) {
        if(map.contains(e.target) || mapButton.contains(e.target)) return;

        map.classList.remove('map-menu--opened');

        var button = document.getElementsByClassName('map-button')[0];
        button.style.opacity = 1;
    });
}

function setChart() {
    Chart.defaults.global.defaultFontFamily = 'Ubuntu';

    var buttons = document.querySelectorAll('.chart-type-container .item');
    var chartElement = document.querySelectorAll('.chart-container .chart')[0];

    var rect = chartElement.getBoundingClientRect();

    var canvas = document.querySelectorAll('.chart .chartCanvas')[0];
    var ctx = canvas.getContext('2d');

    canvas.width = rect.width;
    canvas.height = rect.height;


    chart = MyLineChart(ctx, MAIN_COLORS);
    chart.setSize(canvas.width, canvas.height);
    chart.setGridColor(((theme == THEME_DARK ? lightGridColor : darkGridColor) + '44'));

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            chart.getChart().destroy();
            for(let i = 0; i < buttons.length; i++) {
                if(buttons[i] == button) {
                    buttons[i].classList.add('item--selected');

                    chart = (i == 0 ? MyLineChart(ctx, MAIN_COLORS) : i == 1 ? MyBarChart(ctx, MAIN_COLORS) : MyPieChart(ctx, MAIN_COLORS))
                    chart.setGridColor(((theme == THEME_DARK ? lightGridColor : darkGridColor) + '44'));
                } else {
                    buttons[i].classList.remove('item--selected');
                }
            }
        });
    });



}


function initializeSearchItems() {
    console.log(searchInput);
    var countySelector = document.getElementById('counties-selector');
    countySelector.textContent = '';

    for(var id in countyIdtoNameMap) {
        if(undefined == listOfSelectedCountys.find(function(element) {
                return element === id;
            })) {
            //fac aceste transformari ca sa nu conteze daca scrii cu diacritice sau nu
            var normalizedCountyName = countyIdtoNameMap[id].toLowerCase();
            normalizedCountyName = normalizedCountyName.replace(/ș/g, 's');
            normalizedCountyName = normalizedCountyName.replace(/ț/g, 't');
            normalizedCountyName = normalizedCountyName.replace(/ă/g, 'a');
            normalizedCountyName = normalizedCountyName.replace(/â/g, 'a');
            normalizedCountyName = normalizedCountyName.replace(/î/g, 'i');

            //also, scoatem whitespace-ul
            var normalizedInput = searchInput.toLowerCase().trim();
            normalizedInput = normalizedInput.replace(/ș/g, 's');
            normalizedInput = normalizedInput.replace(/ț/g, 't');
            normalizedInput = normalizedInput.replace(/ă/g, 'a');
            normalizedInput = normalizedInput.replace(/â/g, 'a');
            normalizedInput = normalizedInput.replace(/î/g, 'i');

            if(searchInput.length != 0 && !normalizedCountyName.startsWith(normalizedInput)) continue;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('selector-item');
            itemDiv.setAttribute('value', id);
            itemDiv.innerHTML = countyIdtoNameMap[id];
            itemDiv.addEventListener('click', function() {
                console.log('ai apasat aici\n');
                setTimeout(function() {
                    itemDiv.parentNode.removeChild(itemDiv);
                }, 10);

            });

            const aux = id;
            itemDiv.onclick = function() {
                addCounty(aux);
            }
            countySelector.appendChild(itemDiv);
        }

    }
}

function addCounty(countyId) {
    var element = document.getElementById(countyId);
    changeColorOfCounty(element);
}

function removeCounty(countyId) {
    var element = document.getElementById(countyId);
    changeColorOfCounty(element);
}


function initializeMaps() {
    //cel mai probabill o sa facem un apel la server aici, dar sau putem lasa asa....
    //nu cred ca se schimba numarul de Countye prea curand
    countyIdtoNameMap['AB'] = 'Alba'
    countyIdtoNameMap['AG'] = 'Argeș'
    countyIdtoNameMap['AR'] = 'Arad'
    countyIdtoNameMap['BC'] = 'Bacău'
    countyIdtoNameMap['BH'] = 'Bihor'
    countyIdtoNameMap['BN'] = 'Bistrița-Năsăud'
    countyIdtoNameMap['BR'] = 'Brăila'
    countyIdtoNameMap['BT'] = 'Botoșani'
    countyIdtoNameMap['B'] = 'București'
    countyIdtoNameMap['BV'] = 'Brașov'
    countyIdtoNameMap['BZ'] = 'Buzău'
    countyIdtoNameMap['CL'] = 'Călărași'
    countyIdtoNameMap['CS'] = 'Caraș-Severin'
    countyIdtoNameMap['CT'] = 'Constanța'
    countyIdtoNameMap['CV'] = 'Covasna'
    countyIdtoNameMap['DB'] = 'Dâmbovița'
    countyIdtoNameMap['DJ'] = 'Dolj'
    countyIdtoNameMap['GJ'] = 'Gorj'
    countyIdtoNameMap['GL'] = 'Galați'
    countyIdtoNameMap['GR'] = 'Giurgiu'
    countyIdtoNameMap['HD'] = 'Hunedoara'
    countyIdtoNameMap['HR'] = 'Harghita'
    countyIdtoNameMap['IF'] = 'Ilfov'
    countyIdtoNameMap['IL'] = 'Ialomița'
    countyIdtoNameMap['IS'] = 'Iași'
    countyIdtoNameMap['MH'] = 'Mehedinți'
    countyIdtoNameMap['MM'] = 'Maramureș'
    countyIdtoNameMap['MS'] = 'Mureș'
    countyIdtoNameMap['NT'] = 'Neamț'
    countyIdtoNameMap['OT'] = 'Olt'
    countyIdtoNameMap['PH'] = 'Prahova'
    countyIdtoNameMap['SB'] = 'Sibiu'
    countyIdtoNameMap['SJ'] = 'Sălaj'
    countyIdtoNameMap['SM'] = 'Satu Mare'
    countyIdtoNameMap['SV'] = 'Suceava'
    countyIdtoNameMap['TL'] = 'Tulcea'
    countyIdtoNameMap['TM'] = 'Timiș'
    countyIdtoNameMap['TR'] = 'Teleorman'
    countyIdtoNameMap['VL'] = 'Vâlcea'
    countyIdtoNameMap['VN'] = 'Vrancea'
    countyIdtoNameMap['VS'] = 'Vaslui'

    for(var id in countyIdtoNameMap) {
        countyNameToIdMap[countyIdtoNameMap[id]] = id;
    }

    for(var id in countyIdtoNameMap) {
        for(let index = 0; index < paths.length; index++) {
            const element = paths[index];
            var idOfElement = element.getAttribute('id');
            if(id === idOfElement) {
                countyIdtoPathMap[id] = element;
                break;
            }

        }
    }

    for(var id in countyIdtoNameMap) {
        countyIdToColorMap[id] = '?'
    }
}

function addCountyToList(countyId) {
    listOfSelectedCountys.push(countyId);
    const itemDiv = document.createElement('div');

    itemDiv.classList.add('item');

    itemDiv.innerHTML = `
        <span class="county-text">${countyId}</span>
        <div class="close-button" onclick = "removeCounty(\'${countyId}\')"></div>
        <span class="county-text material-icons">close</span>
    `;
    var oldMargin = itemDiv.style.marginRight;
    itemDiv.style.opacity = 0;
    var countiesBar = document.getElementsByClassName('counties-bar')[0];
    countiesBar.insertBefore(itemDiv, countiesBar.children[1]);

    setTimeout(function() {
        itemDiv.style.opacity = 1;

    }, 200);

}

function removeCountyFromList(countyId) {
    console.log(countyId);
    var countiesBar = document.getElementsByClassName('counties-bar')[0];
    var items = countiesBar.getElementsByClassName('item');
    for(let index = 0; index < items.length; index++) {
        const element = items[index];
        //console.log(element);
        var spans = element.getElementsByTagName('span');
        if(spans.length != 0) {
            var id = spans[0].innerHTML;
            console.log(id);
            if(id === countyId) {
                element.style.marginRight = '-' + element.offsetWidth + 'px';
                element.style.opacity = 0;


                setTimeout(function() {
                    countiesBar.removeChild(element);

                }, 250);

                listOfSelectedCountys = listOfSelectedCountys.filter(
                    function(value, index, arr) {
                        return value != countyId;
                    }
                );


                break;
            }
        }

    }
}

function onClickCounty(event) {
    var element = event.target;
    for(let index = 0; index < CountyOnClickFunctions.length; index++) {
        const Function = CountyOnClickFunctions[index];
        Function(element);
    }
}

function onMouseEnterCounty(event) {
    var element = event.target;
    for(let index = 0; index < CountyOnMouseEnterFunctions.length; index++) {
        const Function = CountyOnMouseEnterFunctions[index];
        Function(element);
    }
}

function onMouseLeaveCounty(event) {
    var element = event.target;
    for(let index = 0; index < CountyOnMouseLeaveFunctions.length; index++) {
        const Function = CountyOnMouseLeaveFunctions[index];
        Function(element);
    }
}

function addCountyFunction(typeOfEvent, func) {
    if(typeOfEvent == 'onclick') {
        CountyOnClickFunctions.push(func);
    }
    if(typeOfEvent == 'onmouseenter') {
        CountyOnMouseEnterFunctions.push(func);
    }
    if(typeOfEvent == 'onmouseleave') {
        CountyOnMouseLeaveFunctions.push(func);
    }
}

function changeColorOfCounty(element) {
    var elementId = element.id;
    var style = window.getComputedStyle(element);
    var hexCode = style.getPropertyValue('fill');
    console.log(hexCode);
    if(initialColorOfCounty === '?') {
        initialColorOfCounty = hexCode;
    }

    if(hexCode == initialColorOfCounty) {
        var color = extractColor();
        console.log(color, availableCountyColors);
        element.style['fill'] = color;
        countyIdToColorMap[elementId] = color;
        addCountyToList(elementId);
    } else {
        availableCountyColors.push(hexCode);
        element.style['fill'] = initialColorOfCounty;
        countyIdToColorMap[elementId] = '?';
        removeCountyFromList(elementId);
    }
}

function extractColor() {
    var randomIndex = Math.floor(Math.random() * availableCountyColors.length);
    var color = availableCountyColors[randomIndex];
    availableCountyColors = availableCountyColors.filter(function(value, index, arr) {
        return index != randomIndex;
    });
    return color;
}


function setCategorySelector(e) {
    var selector = document.querySelectorAll('.chart-options .category-selector')[0];
    var text = document.querySelectorAll('.chart-options .category-selector .top .text')[0];
    var optionsList = document.querySelectorAll('.category-selector .options-list')[0];
    var options = Array.from(optionsList.children);

    var categoriesList = document.querySelectorAll('.chart-options .categories-list')[0];

    selector.addEventListener('click', function(e) {
        if(optionsList.contains(e.target)) return;

        optionsList.classList.add('options-list--opened');
        // Array.from(options).forEach(option => {
        options.forEach(option => {
            option.classList.add('option--opened');
        });
    });


    document.body.addEventListener('click', function(e) {
        if(selector.contains(e.target) || optionsList.contains(e.target)) return;

        optionsList.classList.remove('options-list--opened');
    });


    categoriesList.innerHTML = "";
    categoriesList.innerHTML +=
        "<label class='label' for='category" + 0 + "'>" +
            "<input id='category" + 0 + "' type='checkbox' name='favorite1' value='" + options[0].innerHTML + "' checked onclick='categoryItemChecked(this)'/>" +
            "<span>" + options[0].innerHTML + "</span>" +
        "</label>";
    categoriesList.innerHTML +=
        "<label class='label' for='category" + 1 + "'>" +
            "<input id='category" + 1 + "' type='checkbox' name='favorite1' value='" + options[0].innerHTML + "' checked onclick='categoryItemChecked(this)'/>" +
            "<span>" + options[0].innerHTML + "</span>" +
        "</label>";
    categoriesList.innerHTML +=
        "<label class='label' for='category" + 2 + "'>" +
            "<input id='category" + 2 + "' type='checkbox' name='favorite1' value='" + options[0].innerHTML + "' checked onclick='categoryItemChecked(this)'/>" +
            "<span>" + options[0].innerHTML + "</span>" +
        "</label>";

    for(var i = 0; i < options.length; i++) {
        const option = options[i];
        option.addEventListener('click', function() {
            text.innerHTML = option.innerHTML;
            optionsList.classList.remove('options-list--opened');

            categoriesList.innerHTML = "";
            categoriesList.innerHTML +=
                "<label class='label' for='category" + i + "'>" +
                    "<input id='category" + i + "' type='checkbox' name='favorite1' value='" + option.innerHTML + "' checked onclick='categoryItemChecked(this)'/>" +
                    "<span>" + option.innerHTML + "</span>" +
                "</label>";
            categoriesList.innerHTML +=
                "<label class='label' for='category" + 1 + "'>" +
                    "<input id='category" + 1 + "' type='checkbox' name='favorite1' value='" + option.innerHTML + "' checked onclick='categoryItemChecked(this)'/>" +
                    "<span>" + option.innerHTML + "</span>" +
                "</label>";
            categoriesList.innerHTML +=
                "<label class='label' for='category" + 2 + "'>" +
                    "<input id='category" + 2 + "' type='checkbox' name='favorite1' value='" + option.innerHTML + "' checked onclick='categoryItemChecked(this)'/>" +
                    "<span>" + option.innerHTML + "</span>" +
                "</label>";
        });
    }

}

function categoryItemChecked(element) {
    if(element.checked) element.parentElement.classList.remove('label--unchecked');
    else element.parentElement.classList.add('label--unchecked');
}


function setDownloadType() {
    var downloadButton = document.querySelectorAll('.chart-options .download-options .download')[0];
    var options = document.querySelectorAll('.chart-options .download-options .option');

    downloadButton.addEventListener('mouseenter', function() {
        document.querySelectorAll('.chart-options .download-options .material-icons')[0].classList.add('material-icons--hover');
    });
    downloadButton.addEventListener('mouseleave', function() {
        document.querySelectorAll('.chart-options .download-options .material-icons')[0].classList.remove('material-icons--hover');
    });

    options.forEach(option => {
        option.addEventListener('click', function() {
            var index = Array.from(options).indexOf(option);
            for(let i = 0; i < options.length; i++)
                options[i].classList.remove('option--selected');
            options[index].classList.add('option--selected');
        });
    });
}
function setRangePicker() {
    
}

addCountyFunction('onclick', changeColorOfCounty);
