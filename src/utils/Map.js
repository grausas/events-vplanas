import WebMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export const createMapView = (ref, layer, basemap) => {
  const webmap = new WebMap({
    basemap: basemap,
    layers: layer,
  });

  const view = new MapView({
    container: ref,
    map: webmap,
    center: [25.25, 54.68],
    zoom: 12,
    ui: {
      components: ["attribution"], // Exclude the zoom widget from the default UI
    },
  });

  view.constraints = {
    minScale: 500000, // User cannot zoom out beyond a scale of 1:500,000
    maxScale: 0, // User can overzoom tiles
    rotationEnabled: false, // Disables map rotation
  };

  return view;
};
