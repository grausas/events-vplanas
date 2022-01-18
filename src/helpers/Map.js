import WebMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { graphicsLayer } from "./DrawPolygon";

export const createMapView = (ref, baselayer, layers) => {
  const webmap = new WebMap({
    basemap: "gray-vector",
    layers: [layers, graphicsLayer],
  });

  const view = new MapView({
    container: ref,
    map: webmap,
    center: [25.19543, 54.697],
    zoom: 11,
    ui: {
      components: ["attribution"], // Exclude the zoom widget from the default UI
    },
  });

  // view.when().then(() => {
  //   // console.log("viemaplayer", view.map.layers.getItemAt(0).renderer);
  //   const layer = view.map.layers.getItemAt(0).renderer.uniqueValueInfos;

  //   // const heatmapRenderer = layer;
  //   // console.log("ldwefwefew", layer);

  //   console.log("watchScale", view.scale);

  //   const simpleRenderer = {
  //     type: "simple",
  //     symbol: {
  //       type: "simple-marker",
  //       color: "#ccc",
  //       size: 8,
  //     },
  //   };

  //   const simpleRenderer2 = {
  //     type: "unique-value",
  //     field: "KATEGORIJA",
  //     // defaultSymbol: symbol,
  //     uniqueValueInfos: layer,
  //   };

  //   if (view.scale > 124447) {
  //     layers.renderer = simpleRenderer;
  //   }

  //   view.watch("scale", (newValue) => {
  //     layers.renderer = newValue >= 72224 ? simpleRenderer : simpleRenderer2;
  //   });
  // });

  view.constraints = {
    minScale: 500000, // User cannot zoom out beyond a scale of 1:500,000
    maxScale: 0, // User can overzoom tiles
    rotationEnabled: false, // Disables map rotation
  };

  return view;
};
