/* coding: utf-8 */
/*
 * This demo illustrates the coordinate system used to display map tiles in the
 * API.
 *
 * Tiles in Google Maps are numbered from the same origin as that for
 * pixels. For Google's implementation of the Mercator projection, the origin
 * tile is always at the northwest corner of the map, with x values increasing
 * from west to east and y values increasing from north to south.
 *
 * Try panning and zooming the map to see how the coordinates change.
 */

/** @constructor */
function CoordMapType(tileSize) {
  this.tileSize = tileSize;
}

CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
  var div = ownerDocument.createElement('div');
  div.innerHTML = coord;
  div.style.width = this.tileSize.width + 'px';
  div.style.height = this.tileSize.height + 'px';
  div.style.fontSize = '10';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px';
  div.style.borderColor = '#AAAAAA';
  return div;
};

var overlay;
TransitiveOverlay.prototype = new google.maps.OverlayView();

/** @constructor */
function TransitiveOverlay(map) {

  // Initialize all properties.
  this.map_ = map;

  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
TransitiveOverlay.prototype.onAdd = function() {
  
  // var div = document.createElement('div');
  // this.div_ = div;
  // div.style.borderStyle = 'none';
  // div.style.borderWidth = '0px';
  // div.style.position = 'absolute';

  // var img = document.createElement('img');
  // img.src = 'https://developers.google.com/maps/documentation/javascript/images/control-positions.png';
  // img.style.width = '100%';
  // img.style.height = '100%';
  // img.style.position = 'absolute';
  // div.appendChild(img);

  
  var transitive_div = document.createElement('div');
  // transitive_div.style.backgroundColor  = 'transparent';
  // transitive_div.style.position = 'absolute';
  transitive_div.style.top = '0';
  transitive_div.style.left = '0';
  transitive_div.style.height = '400px';
  transitive_div.style.width = '400px';
  //div.appendChild(transitive_div);

  // var d3 = require('d3');
  var Transitive = require('transitive');
  // var OtpProfiler = require('otp-profiler');
  
  this.transitive = new Transitive({
    el: transitive_div,
    // これは路線説明欄を表示するためにある
    // legendEl: document.getElementById('legend'),
    data: DATA,
    styles: STYLES,
    drawGrid: false,
    gridCellSize: 100, // http://nm.zaq1.net/?p=130
    useDynamicRendering: true,
    // initialBounds: [
    //   [-100, 100],
    //   [-120, 120]
    // ],
    // displayMargins: {
    //   right: 400,
    //   bottom: 50
    // },
    // draggableTypes: ['PLACE']
    // autoResize: true,
  });

  // var pos = this.map_.getBounds();
  // var north = pos.getNorthEast().lat(); // 北
  // var east  = pos.getNorthEast().lng(); // 東
  // var south = pos.getSouthWest().lat(); // 南
  // var west = pos.getSouthWest().lng(); // 西
  // this.transitive.setDisplayBounds( [[west, south],[east, north]]);
  // var z = map.getZoom();
  // document.getElementById("map-pos2").innerHTML = "北"+latNE+"、東"+lngNE+"、南"+latSW+"、西"+lngSW+"、ズーム"+z;
  // .setDisplayBounds(llBounds)
  // Sets the lon/lat bounding box for the display, expressed as [ [west, south], [east, north] ]
  

  
  // Add the element to the "overlayLayer" pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(transitive_div);
};

TransitiveOverlay.prototype.draw = function() {
  this.transitive.render();

  // We use the south-west and north-east
  // coordinates of the overlay to peg it to the correct position and size.
  // To do this, we need to retrieve the projection from the overlay.
//  var overlayProjection = this.getProjection();

  // Retrieve the south-west and north-east coordinates of this overlay
  // in LatLngs and convert them to pixel coordinates.
  // We'll use these coordinates to resize the div.
//  var sw = overlayProjection.fromLatLngToDivPixel(this.div_.getSouthWest());
//  var ne = overlayProjection.fromLatLngToDivPixel(this.div_.getNorthEast());

  // Resize the image's div to fit the indicated dimensions.
//  var div = this.div_;
//  div.style.left = '0px';
//  div.style.top = '0px';
//  div.style.width = '300px';
//  div.style.height = '300px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
TransitiveOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};



var map;
var center = new google.maps.LatLng(35.00904999253169, 135.91976173437504);

function initialize() {

 // Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
  
  var mapOptions = {
    zoom: 12,
    center: center,
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_TOP
    },
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
  };
  var map_canvas = document.getElementById('map-canvas');
  map_canvas.style.width = '400px';
  map_canvas.style.height = '400px';

  // map = new google.maps.Map(document.getElementById('map-canvas'),
  //                           mapOptions);
  map = new google.maps.Map(map_canvas, mapOptions);

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
  
  // Insert this overlay map type as the first overlay map type at
  // position 0. Note that all overlay map types appear on top of
  // their parent base map.
  map.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256)));

  var subwayMapType = new google.maps.ImageMapType({
    name: "地下鉄", alt: "地下鉄を見る",
        tileSize: new google.maps.Size(256,256),
    isPng: true,
    maxZoom: 22,
    minZoom: 10,
    getTileUrl: function(coord, zoom) {
      var mt = ((coord.y & 0x1 == 0)? 0 : 2) | (coord.x & 0x1);
      var url = "http://mt%m.google.com/mapslt?lyrs=transit&x=%x&y=%y&z=%z&w=256&h=256&style=2"
        .replace("%m", mt)
        .replace("%x", coord.x).replace("%y", coord.y)
        .replace("%z", zoom);
      return url;
    }
  });
  map.overlayMapTypes.insertAt(1, subwayMapType); // オーバーレイ表示するときの例

  ferroLayer = new google.maps.FusionTablesLayer({query: {from: '186Nsf4x8WFwX8o7harkF6B7ROwKtOGwbZ3ktsMqZ'}});
  ferroLayer.setMap(map);
  
  // var swBound = new google.maps.LatLng(62.281819, -150.287132);
  // var neBound = new google.maps.LatLng(62.400471, -150.005608);
  // var bounds = new google.maps.LatLngBounds(swBound, neBound);
  // // The photograph is courtesy of the U.S. Geological Survey.
  // var srcImage = 'https://developers.google.com/maps/documentation/javascript/';
  // srcImage += 'examples/full/images/talkeetna.png';

  // The custom TransitiveOverlay object contains the Transitive image,
  // the bounds of the image, and a reference to the map.
  overlay = new TransitiveOverlay(map);

  // ドラッグイベントでの地図表示位置（センター）
  google.maps.event.addListener(map, "drag", function() {
    var pos = map.getCenter();
    var lat = pos.lat();
    var lng = pos.lng();
    document.getElementById("map-pos").innerHTML = ("緯度："+lat+"、経度："+lng);
  });

  // 表示されている地図の位置（東西南北）
  google.maps.event.addListener(map, "idle", function() {
    var pos = map.getBounds();
    var latNE = pos.getNorthEast().lat();
    var lngNE = pos.getNorthEast().lng();
    var latSW = pos.getSouthWest().lat();
    var lngSW = pos.getSouthWest().lng();
    var z = map.getZoom();
    document.getElementById("map-pos2").innerHTML = "北"+latNE+"、東"+lngNE+"、南"+latSW+"、西"+lngSW+"、ズーム"+z;
  });


}

google.maps.event.addDomListener(window, 'load', initialize);
