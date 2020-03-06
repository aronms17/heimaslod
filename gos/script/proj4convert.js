var proj4 = require("proj4");
var husjson = require("./Heimaey-hus-fyrirgos.json");
var goturjson = require("./Heimaey-gotur-fyrirgos.json");
var bigDecimal = require('js-big-decimal');

var fs = require('fs');
//define WGS 84
proj4.defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");

//define EPSG:3057
proj4.defs("EPSG:3057","+proj=lcc +lat_1=64.25 +lat_2=65.75 +lat_0=65 +lon_0=-19 +x_0=500000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

//lesa json
// var hus = [];

// for(var i=0; i<3; i++) {
//     var tmp = [];
//     for(var j=0; j<husjson.features[i].geometry.coordinates[0][0].length; j++) {
//         var arr = [];
//         console.log(Number.parseFloat(json.features[i].geometry.coordinates[0][0][j][0]));
//         console.log(Number.parseFloat(husjson.features[i].geometry.coordinates[0][0][j][1]).toFixed(16));

//         arr.push(n1.getValue());
//         arr.push(n2.getValue());
//         //tmp.push(proj4('EPSG:3057', 'WGS84', parsefloat));
//     }
//     hus.push(tmp);
// };

var obj = {
    hus: [],
    gotur: []
}

for(var i=0; i<husjson.features.length; i++) {
    arr = [];
    for(var j=0; j<husjson.features[i].geometry.coordinates[0][0].length; j++) {
        //console.log(husjson.features[i].geometry.coordinates[0][0][j]);
        //console.log(proj4('EPSG:3057', 'WGS84', husjson.features[i].geometry.coordinates[0][0][j]));

        var a = (proj4('EPSG:3057', 'WGS84', [husjson.features[i].geometry.coordinates[0][0][j][0] , husjson.features[i].geometry.coordinates[0][0][j][1]]));
        var b = {longitude: a[0], latitude: a[1]}
        arr.push(b);
    }
    obj.hus.push({
        id: husjson.features[i].properties.gid,
        address: ' ',
        text: ' ',
        image: ' ',
        coordinates: arr
    });
};

for(var i=0; i<goturjson.features.length; i++) {
    arr = [];
    for(var j=0; j<goturjson.features[i].geometry.coordinates[0][0].length; j++) {
        //console.log(goturjson.features[i].geometry.coordinates[0][0][j]);
        //console.log(proj4('EPSG:3057', 'WGS84', goturjson.features[i].geometry.coordinates[0][0][j]));

        var a = (proj4('EPSG:3057', 'WGS84', [goturjson.features[i].geometry.coordinates[0][0][j][0] , goturjson.features[i].geometry.coordinates[0][0][j][1]]));
        var b = {longitude: a[0], latitude: a[1]}
        arr.push(b);
    }
    obj.gotur.push({
        id: goturjson.features[i].properties.gid,
        address: ' ',
        text: ' ',
        image: ' ',
        coordinates: arr
    });
};


obj.hus.sort(function(a, b){
    return a.id - b.id;
});
obj.gotur.sort(function(a, b){
    return a.id - b.id;
});
var json = JSON.stringify(obj, null, 4);

fs.writeFileSync('jsonfile.json', json, 'utf8');


//proj4('EPSG:3057', 'WGS84', [ 436831.363512803043704, 326913.244987682381179 ]);

//convert
//proj4('EPSG:3057', 'WGS84', [ 436841.734249254164752, 326900.030814741156064 ]);