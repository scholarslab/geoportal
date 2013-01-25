var Geoportal = Geoportal || {};
var OpenLayers = OpenLayers || {};
var google = google || {};

Geoportal.map = (function() {
  "use strict"

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
      new OpenLayers.Control.LayerSwitcher({
        'ascending': true,
        roundedCorner: false
      }),
      new OpenLayers.Control.ScaleLine(),
      new OpenLayers.Control.Permalink({anchor: true}),
      new OpenLayers.Control.MousePosition(),
      new OpenLayers.Control.KeyboardDefaults()
    ],
    layers: [
      new OpenLayers.Layer.OSM(),
      new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN}
      ),
      new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
      ),
      new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
      ),
      new OpenLayers.Layer.Boxes('BBox marker')
    ]

  });

  if (!map.getCenter()) {
    map.setCenter(new OpenLayers.LonLat(-8739214.39812,4584593.40392));
    map.zoomToMaxExtent();
  }


})(Geoportal);
