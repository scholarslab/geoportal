/*global $:false, jQuery:false */
var OpenLayers = OpenLayers || {};
var console = console || {};

var geoportal = (function() {
  "use strict";

  //privates
  var map;
  var slab = new OpenLayers.LonLat(-8739214.39812,4584593.40392);
  var bbox = new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34);
  OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
  OpenLayers.Util.onImageLoadErrorColor = "transparent";
  OpenLayers.ImgPath = "http://js.mapbox.com/theme/dark/";

  var default_controls = [
    new OpenLayers.Control.Attribution(),
    new OpenLayers.Control.PanZoomBar(),
    new OpenLayers.Control.ScaleLine(),
    new OpenLayers.Control.MousePosition(),
    new OpenLayers.Control.Navigation()
  ];

  function addBoxControl(control) {

  }

  return {
    // map for the search interface
    searchMap: function(mapElement) {
      var mrk = new OpenLayers.Layer.Boxes('Bbox marker');
      var control = new OpenLayers.Control();

      console.log('bbox', bbox);

      map = new OpenLayers.Map({
        div: mapElement,
        projection: new OpenLayers.Projection("EPSG:900913"),
        units: 'm',
        maxResolution: 'auto',
        numZoomLevels: 20,
        //maxExtent: bbox,
        controls: default_controls,
        layers: [
          new OpenLayers.Layer.OSM()
        ]
      });

      // TODO: refactor in to private method
      OpenLayers.Util.extend(control, {
        draw: function() {
          // this Handler.Box will intercept the shift-mousedown
          // before Control.MouseDefault gets to see it
          this.box = new OpenLayers.Handler.Box(
            control,
            { "done": this.notice },
            { keyMask: OpenLayers.Handler.MOD_NONE }
          );
          this.box.activate();
        },
        notice: function(bounds) {
          mrk.clearMarkers();
          var sw = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom)); 
          var ne = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top));
          // Transform Google meters to lat/long
          var ll = sw.clone();
          var ur = ne.clone();

          ll.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
          ur.transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
          // inject values to search form
          $('#ll-lon').val(ll.lon.toFixed(4));
          $('#ll-lat').val(ll.lat.toFixed(4));
          $('#ur-lon').val(ur.lon.toFixed(4));
          $('#ur-lat').val(ur.lat.toFixed(4));

          bounds = new OpenLayers.Bounds(sw.lon, sw.lat, ne.lon, ne.lat);

          console.log(bounds);
          var box = new OpenLayers.Marker.Box(bounds);
          mrk.addMarker(box);

        }
      });

      map.addControl(control);
      map.addLayer(mrk);

      map.setCenter(slab);
      map.zoomToMaxExtent();

      //if(!map.getCenter()) {
        //map.setCenter(slab);
        //map.zoomToMaxExtent();
      //}

      return map;
    },

    // displays map elements on an item page
    itemMap: function(mapElement, layers) {
      map = new OpenLayers.Map(mapElement, {
      });
    }
  };
}());
