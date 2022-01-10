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

  // view.watch("zoom", function () {
  //   if (view.zoom <= 10) {
  //     console.log("daugiau 10");
  //     layers.renderer = {
  //       type: "simple", // autocasts as new SimpleRenderer()
  //       visualVariables: {
  //         type: "size",
  //         field: "Shape__Area",
  //         stops: [
  //           { value: 6666, size: 6 },
  //           { value: 99999, size: 9 },
  //         ],
  //       },
  //       symbol: {
  //         type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
  //         size: 6,
  //         // color: "black",
  //         outline: {
  //           // autocasts as new SimpleLineSymbol()
  //           width: 0.5,
  //           color: "white",
  //         },
  //       },
  //     };
  //   } else {
  //     console.log("maziau 10");
  //     layers.refresh();
  //   }
  // });

  // function zoomChanged(newValue) {
  //   console.log(newValue);
  //   if (newValue <= 10) {
  //     layers.renderer = {
  //       type: "simple", // autocasts as new SimpleRenderer()
  //       visualVariables: {
  //         type: "size",
  //         field: "Shape__Area",
  //         stops: [
  //           { value: 6666, size: 6 },
  //           { value: 99999, size: 9 },
  //         ],
  //       },
  //       symbol: {
  //         type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
  //         size: 6,
  //         // color: "black",
  //         outline: {
  //           // autocasts as new SimpleLineSymbol()
  //           width: 0.5,
  //           color: "white",
  //         },
  //       },
  //     };
  //   }
  // }

  view.constraints = {
    minScale: 500000, // User cannot zoom out beyond a scale of 1:500,000
    maxScale: 0, // User can overzoom tiles
    rotationEnabled: false, // Disables map rotation
  };

  return view;
};
