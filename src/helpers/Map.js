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

  // panaudoti class break rerender atvaizdavimui polygonu ir points

  // view.when().then(() => {
  //   console.log("watchScale", view.map.layers.getItemAt(0));
  //   // console.log("viemaplayer", view.map.layers.getItemAt(0).renderer);
  //   // const layer = view.map.layers.getItemAt(0).renderer.uniqueValueInfos;
  //   // const layer = layers.renderer.getUniqueValueInfo();

  //   // const heatmapRenderer = layer;
  //   // console.log("ldwefwefew", layer);

  //   const simpleRenderer = {
  //     type: "simple",
  //     symbol: {
  //       type: "simple-marker",
  //       color: "var(--grey)",
  //       size: 8,
  //     },
  //   };

  //   const simpleRenderer2 = {
  //     type: "unique-value",
  //     field: "KATEGORIJA",
  //     defaultSymbol: { type: "simple-fill" },
  //     // uniqueValueInfos: layer,
  //   };

  //   if (view.scale > 124447) {
  //     layers.renderer = simpleRenderer;
  //   }

  //   view.watch("scale", (newValue) => {
  //     layers.renderer = newValue >= 60000 ? simpleRenderer : simpleRenderer2;
  //   });
  // });

  view.constraints = {
    minScale: 500000, // User cannot zoom out beyond a scale of 1:500,000
    maxScale: 0, // User can overzoom tiles
    rotationEnabled: false, // Disables map rotation
  };

  return view;
};
