var Geoportal = Geoportal || {};
var OpenLayers = OpenLayers || {};
var google = google || {};
var console = console || {};

Geoportal.map = (function() {
  "use strict";

  var slab = new OpenLayers.LonLat(-8739214.39812,4584593.40392);
  var control = new OpenLayers.Control();
  var mrk = new OpenLayers.Layer.Boxes('Bbox marker');

  OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
  OpenLayers.Util.onImageLoadErrorColor = "transparent";
  OpenLayers.ImgPath = "http://js.mapbox.com/theme/dark/";

  var map = new OpenLayers.Map({
    div: 'map',
    projection: new OpenLayers.Projection("EPSG:900913"),
    //displayProjection: new OpenLayers.Projection("EPSG:4326"),
    units: 'm',
    maxResolution: 'auto',
    controls: [
      new OpenLayers.Control.Attribution(),
      new OpenLayers.Control.Navigation(),
      new OpenLayers.Control.PanZoomBar(),
      new OpenLayers.Control.ScaleLine(),
      new OpenLayers.Control.MousePosition()
    ],
    layers: [
      new OpenLayers.Layer.OSM()
    ]
  });

  // shift+click zoom control
  OpenLayers.Util.extend(control, {
    draw: function () {
      // this Handler.Box will intercept the shift-mousedown
      // before Control.MouseDefault gets to see it
      this.box = new OpenLayers.Handler.Box(
        control,
        { "done": this.notice },
        { keyMask: OpenLayers.Handler.MOD_NONE }
      );
      this.box.activate();
    },
    // Retrieve bbox from vector marker and load in form fields
    notice: function (bounds) {
      mrk.clearMarkers();
      var sw = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom)); 
      var ne = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top));
      // Transform Google meters to lat/long
      var ll = sw.clone();
      var ur = ne.clone();

      ll.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
      ur.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));

      bounds = new OpenLayers.Bounds(sw.lon, sw.lat, ne.lon, ne.lat);

      console.log(bounds);
      var box = new OpenLayers.Marker.Box(bounds);
      mrk.addMarker(box);
    }
  });

  map.addControl(control);
  map.addLayer(mrk);

  if (!map.getCenter()) {
    map.setCenter(slab);
    map.zoomToMaxExtent();
  }



})(Geoportal);

/*global $:false */

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.



/*global $:false, jQuery:false */
$(document).ready(function() {
  $('.tooltip').tooltip('show');
});
