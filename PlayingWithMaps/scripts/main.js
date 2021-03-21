window.onload = init;


function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    url: 'https://vemaps.com/uploads/img/ro-02.png',
                    crossOrigin: null
                })
            })
        ],
        target: 'js-map'
    })
}



