var proj4 = require("proj4");
var json = require("./Heimaey-hus-fyrirgos.json");
var bigDecimal = require('js-big-decimal');

//define WGS 84
proj4.defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");

//define EPSG:3057
proj4.defs("EPSG:3057","+proj=lcc +lat_1=64.25 +lat_2=65.75 +lat_0=65 +lon_0=-19 +x_0=500000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

//lesa json
var hus = [];

for(var i=0; i<3; i++) {
    var tmp = [];
    for(var j=0; j<json.features[i].geometry.coordinates[0][0].length; j++) {
        var arr = [];
        console.log(Number.parseFloat(json.features[i].geometry.coordinates[0][0][j][0]));
        console.log(Number.parseFloat(json.features[i].geometry.coordinates[0][0][j][1]).toFixed(16));


        arr.push(n1.getValue());
        arr.push(n2.getValue());
        //tmp.push(proj4('EPSG:3057', 'WGS84', parsefloat));
        
    }
    hus.push(tmp);
    
};

console.log(hus);

//proj4('EPSG:3057', 'WGS84', [ 436831.363512803043704, 326913.244987682381179 ]);

//convert
//proj4('EPSG:3057', 'WGS84', [ 436841.734249254164752, 326900.030814741156064 ]);