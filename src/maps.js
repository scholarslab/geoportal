/*global $:false, jQuery:false */
var OpenLayers = OpenLayers || {};
var console = console || {};

var geoportal = (function() {
  "use strict";

  //privates
  var map;
  var slab = new OpenLayers.LonLat(-8739214.39812,4584593.40392);
  var bbox = new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34);
  var zoom = 1;
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

      var target_projection = new OpenLayers.Projection("EPSG:4326");
      var source_projection = new OpenLayers.Projection("EPSG:900913");

      map = new OpenLayers.Map({
        div: mapElement,
        projection: source_projection,
        displayProjection: target_projection,
        units: 'm',
        maxResolution: 'auto',
        maxExtent: bbox,
        controls: default_controls,
        layers: [
          new OpenLayers.Layer.OSM("osm")
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

          ll.transform(map.getProjectionObject(), target_projection);
          ur.transform(map.getProjectionObject(), target_projection);

          // inject values to search form
          $('#ll-lon').val(ll.lon.toFixed(4));
          $('#ll-lat').val(ll.lat.toFixed(4));
          $('#ur-lon').val(ur.lon.toFixed(4));
          $('#ur-lat').val(ur.lat.toFixed(4));

          //console.log('ll.lon', ll.lon.toFixed(4));
          //console.log('ll.lat', ll.lat.toFixed(4));
          //console.log('ur.lon', ur.lon.toFixed(4));
          //console.log('ur.lat', ur.lat.toFixed(4));

          bounds = new OpenLayers.Bounds(sw.lon, sw.lat, ne.lon, ne.lat);

          var box = new OpenLayers.Marker.Box(bounds);
          mrk.addMarker(box);

        }
      });

      map.addControl(control);
      map.addLayer(mrk);

      map.setCenter(slab, 3);
      //map.zoomToMaxExtent();

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
