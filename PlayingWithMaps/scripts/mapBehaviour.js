window.onload=initializeJudet
var paths = document.getElementsByTagName("path")
//vectorii de functii ce o sa fie apelate la anumite 
var judetOnClickFunctions= new Array;
var judetOnMouseEnterFunctions= new Array;
var judetOnMouseLeaveFunctions = new Array;

/* 
    Functiile astea merg prin tot vectorul respectiv si apeleaza fiecare functie
*/
function onClickJudet(event) {
    var element = event.target;
    for (let index = 0; index < judetOnClickFunctions.length; index++) {
        const Function = judetOnClickFunctions[index];
        Function(element);
    }
}

function onMouseEnterJudet(event) {
    var element = event.target;
    for (let index = 0; index < judetOnMouseEnterFunctions.length; index++) {
        const Function = judetOnMouseEnterFunctions[index];
        Function(element);
    }
}

function onMouseLeaveFunctions(event) {
    var element = event.target;
    for (let index = 0; index < judetOnMouseLeaveFunctions.length; index++) {
        const Function = judetOnMouseLeaveFunctions[index];
        Function(element);
    }
}


function initializeJudet() {
    for (let index = 0; index < paths.length; index++) {
        const judet = paths[index];
        judet.onclick = onClickJudet;
        judet.onmouseenter = onMouseEnterJudet;
        judet.onmouseleave = onMouseLeaveFunctions;
    }
}


/*
    Functie pe care sa o folosim ca sa schimbam culoarea unui judet
    (cand apesi pe form sa se coloreze singur judetul)
    Momentan toate se schimba in rosu, dar o sa facem noi un vector cu culori pentru fiecare judet
    (ca sa fie frumi)
*/
function changeColorOfJudet(judetName) {
    for (let index = 0; index < paths.length; index++) {
        const element = paths[index];
        //console.log(element.getAttribute('title'));
        if(element.getAttribute('title') == judetName) {
            var style = window.getComputedStyle(element);
            var hexCode = style.getPropertyValue('fill');
            console.log(hexCode);
            if(hexCode == "rgb(204, 204, 204)") {
                element.style['fill'] = 'red';
            } else {
                element.style['fill'] = '#CCCCCC';
            }
            break;
        }
    
        
    }
};



//Asa adaugi o functie la unul dintre vectorii de functii
function addJudetFunction(typeOfEvent, Function){
    if(typeOfEvent == 'onclick') {
        judetOnClickFunctions.push(Function);
    }
    if(typeOfEvent == 'onmouseenter') {
        judetOnMouseEnterFunctions.push(Function);
    }
    if(typeOfEvent == 'onmouseleave') {
        judetOnMouseLeaveFunctions.push(Function);
    }
}


addJudetFunction('onclick', function (element){
    console.log('Ai apasat pe ' + element.getAttribute('title'));
});
addJudetFunction('onmouseenter', function (element) {
    console.log("dai hover pe" + element.getAttribute('title'));
});
addJudetFunction('onmouseleave', function (element) {
    console.log('Ai scos hoverul de pe ' + element.getAttribute('title'));
});

addJudetFunction('onclick', function (element) {
    var style = window.getComputedStyle(element);
    var hexCode = style.getPropertyValue('fill');
    console.log(hexCode);
    if(hexCode == "rgb(204, 204, 204)") {
        element.style['fill'] = 'red';
    } else {
        element.style['fill'] = '#CCCCCC';
    }
    element.style['fill-opacity'] = '1';
});

addJudetFunction('onmouseenter', function (element){
    element.style['fill-opacity'] = '0.5';

});

addJudetFunction('onmouseleave', function (element) {
    element.style['fill-opacity'] = '1';
});



