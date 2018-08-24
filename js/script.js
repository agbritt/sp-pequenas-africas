console.log("hello, Pete");

/*Basemap with Mapbox Tiles*/

    L.mapbox.accessToken = 'pk.eyJ1IjoiYWdicml0dCIsImEiOiJjamo5N3k4NDQwMzBuM3JvMWtneHlvZmg4In0.CX2x2k7TLPVScK6p3VpZxQ';
    var map = L.mapbox.map('mapid', 'mapbox.streets')
    .setView([-23.555362, -46.643961], 13);

 // document.body.onload = addElement;

        function addNarration () { 
      // create a new div element 
        var commDiv = document.createElement("div"); 
      // tell it to be "narration div"
        commDiv.setAttribute("id", "narration");
      // and give it some content 
        // var commContent = document.createTextNode("Hi there and greetings!"); 
      // add the text node to the newly created div
        // commDiv.appendChild(commContent);  

      // add the newly created element and its content into the DOM 
        var currentDiv = document.getElementById("mapid"); 
        document.body.appendChild(commDiv, currentDiv); 
        }



/*Basemap with Stamen TileLayer*/
    /*var map = L.map('mapid').setView([-23.555362, -46.643961], 16);
    var layer = new L.StamenTileLayer("terrain");
    map.addLayer(layer);*/
    
   /*var baseLayer = new L.StamenTileLayer("terrain");

    var map = L.map('mapid', {
            center: [-23.555362, -46.643961],
            zoom: 13,
            layers: [baseLayer]
        });*/

/*Tile Layers*/
    var saraLibaBelaLayer = L.tileLayer('D:/sara-liba-bela/sara-liba-bela/{z}/{x}/{y}.png?',{maxZoom: 21});

    var vaspLibaBelaLayer = L.tileLayer('D:/vasp-liba-bela/vasp-liba-bela/{z}/{x}/{y}.png?',{maxZoom: 21});

/*Swiper*/

    var controlBox = L.control.layers();
    var swiper = L.control.sideBySide(saraLibaBelaLayer, vaspLibaBelaLayer);
    var saraVaspLibaBelaLayer = L.layerGroup([saraLibaBelaLayer, vaspLibaBelaLayer]);

/*Plano de Avenidas*/
    var esquemaTeorico = L.tileLayer('esquema-teorico/{z}/{x}/{y}.png?');
    var prestesMaia1945 = L.tileLayer('PrestesMaia1945/{z}/{x}/{y}.png?');

/*Saracura*/

    var markerSaracura = L.marker([-23.55793, -46.65179]);
        markerSaracura.bindPopup('<object data="cortiço_saracura.jpg" width="700""></object>', {
        maxWidth : 760
    });
    var map1913Layer = L.tileLayer('1913Map3/{z}/{x}/{y}.png?');
    var lowrieLayer = L.tileLayer('LowrieMap/{z}/{x}/{y}.png?');
    var belaVistaDistrict1948 = new L.Shapefile('belaVistaDistrict1948.zip', {color:"black"});
    var saracuraLayer = L.layerGroup([map1913Layer, lowrieLayer]);

/*Igreja dos Remedios*/

    var antonio_bento_home = new L.Shapefile('antonio_bento_home.zip', {color:"black"});
    var igreja_dos_remedios = new L.Shapefile('igreja_dos_remedios.zip', {color:"black"});
    var prestesMaia1945 = L.tileLayer('PrestesMaia1945/{z}/{x}/{y}.png?');
    var markerIgrejaRemedios = L.marker([-23.55237, -46.6343]);
    var igrejaRemediosImage = '<img src="igreja_remedios.jpg" width="650px">'
    var popupIgrejaRemedios = L.popup({maxWidth : 680, autoPan : true, closeOnClick : false, keepInView : true, autoPanPadding: [5, 5]})
    .setLatLng([-23.5520, -46.6345])
    .setContent(igrejaRemediosImage + "<center>Igreja dos Remédios, Militão Augusto de Azevedo, circa 1887. Acervo Instituto Moreira Salles. Reproduced with permission.</center>");
    var markerPopupIgrejaRemediosLayer = L.layerGroup([markerIgrejaRemedios, popupIgrejaRemedios]);

/*Praça da Bandeira*/

/*Reset function*/
    function reset() {
        controlBox.remove(map);
        swiper.remove(map);
        map.removeLayer(saraLibaBelaLayer);
        map.removeLayer(vaspLibaBelaLayer);
        map.removeLayer(saraVaspLibaBelaLayer);
        map.removeLayer(antonio_bento_home);
        map.removeLayer(igreja_dos_remedios);
        map.removeLayer(prestesMaia1945);
        map.removeLayer(map1913Layer);
        map.removeLayer(lowrieLayer);
        map.removeLayer(belaVistaDistrict1948);
        map.removeLayer(markerSaracura);
        map.removeLayer(markerPopupIgrejaRemediosLayer);
        map.removeLayer(esquemaTeorico);
    }; 

/*Plano de Avenidas*/

    var buttonAA = L.Control.SimpleButton.extend({
    options: {
        text: 'The Avenues Plan',
        id: 'planodeavenidas',
    }
    });

    var buttonBB = new buttonAA ({
    click: function(evt) {
        reset();
        map.flyTo([-23.54715, -46.63518], 13, {duration :2.5});
        var baseMaps = {
            "Contemporary Basemap": map,
        };
        var overlayMaps = {
            "Esquema Teórico": esquemaTeorico,
            "Plano de Avenidas, 1945": prestesMaia1945
        };
        esquemaTeorico.addTo(map);
        controlBox = L.control.layers(null, overlayMaps);
        controlBox.addTo(map);   
        }
        });
 
    buttonBB.addTo(map);

/*Saracura*/    

    var button3 = L.Control.SimpleButton.extend({
    options: {
        text: 'Saracura',
        id: 'saracura',
        /*position: 'bottomright'*/
    }
    });

    var button4 = new button3 ({
    click: function(evt) {
        reset();
        map.flyTo([-23.55805, -46.65181], 16, {duration :2.5});
        addNarration();
        var baseMaps = {
            "Contemporary Basemap": map,
        };
        var overlayMaps = {
            "1913 Mapa de São Paulo": map1913Layer,
            "Mapa do Samuel Lowrie": lowrieLayer,
            "Bela Vista District, 1948": belaVistaDistrict1948,
            "Saracura": markerSaracura
        };
        controlBox = L.control.layers(null, overlayMaps).addTo(map);   
        }
        });
 
    button4.addTo(map);
    
/*Igreja dos Remédios*/

    var button1 = L.Control.SimpleButton.extend({
    options: {
        text: 'Igreja dos Remédios',
        id: 'igrejadosremed',
        /*position: 'bottomright'*/
    }
    });

    var button2 = new button1 ({
    click: function(evt) {
        reset();
        map.flyTo([-23.5502, -46.63397], 17, {duration :2});
        var baseMaps = {
            "Contemporary Basemap": map,
        };
        var overlayMaps = {
            "Photo of the Church": markerPopupIgrejaRemediosLayer,
            "1929/1930 Map": saraLibaBelaLayer,
            "Church Building": igreja_dos_remedios,
            "Antônio Bento's House": antonio_bento_home,
            "Avenues Plan Demolitions, 1945": prestesMaia1945
        };
        controlBox = L.control.layers(null, overlayMaps);
        controlBox.addTo(map);
        setTimeout(function() {
        markerPopupIgrejaRemediosLayer.addTo(map);
        }, 2001);
        }
        });
 
    button2.addTo(map);

/*Igreja dos Remédios*/

    var buttonX = L.Control.SimpleButton.extend({
    options: {
        text: 'Praça da Bandeira',
        id: 'pracadabandeira',
    }
    });

    var buttonY = new buttonX ({
    click: function(evt) {
        reset();
        map.flyTo([-23.55253, -46.63397], 17);
        var baseMaps = {
            "Contemporary Basemap": map,
        };
        var overlayMaps = {
            "1929/1930 Map": vaspLibaBelaLayer,
            "Igreja dos Remédios": igreja_dos_remedios,
            "Antônio Bento's House": antonio_bento_home,
            "Avenues Plan Demolitions, 1945": prestesMaia1945
        };
        controlBox = L.control.layers(null, overlayMaps);
        controlBox.addTo(map);   
        }
        });
 
    buttonY.addTo(map);

/*RESET MAP BUTTON*/

    var button6 = L.Control.SimpleButton.extend({
    options: {
        text: 'Reset Map',
        id: 'reset',
        position: 'bottomright'
        }
    });

    var button4 = new button6 ({
    click: function(evt) {
        reset();
        map.flyTo([-23.555362, -46.643961], 13);
        }
    });
    button4.addTo(map);

/*Swiper in Bela and Liba*/

    var buttonA = L.Control.SimpleButton.extend({
    options: {
        text: 'Swiper: 1930/1954',
        id: 'reset',
        position: 'bottomright'
    }
    });

    var buttonC = new buttonA ({
    click: function(evt) {
    reset();
    map.flyTo([-23.558, -46.63865], 16);
    /*saraVaspBrasaLayer.addTo(map);*/
    swiper.addTo(map);
    var baseMaps = {
        "Contemporary Basemap": map,
    };
    var overlayMaps = {
        "SARA, 1929/1930": saraLibaBelaLayer,
        "VASP, 1954": vaspLibaBelaLayer
    };
    saraLibaBelaLayer.addTo(map);
    vaspLibaBelaLayer.addTo(map);
    controlBox = L.control.layers(null, overlayMaps).addTo(map);
    }
    });
    buttonC.addTo(map);


/*Insert Coordinates*/
    L.control.mousePosition().addTo(map);

/*Standalone popup*/
/*    var popup = L.popup()
    .setLatLng([-23.55985, -46.64644])
    .setContent("I am a standalone popup.")
    .openOn(map);
*/