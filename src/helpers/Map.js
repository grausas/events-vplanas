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

  // const renderer = {
  //   type: "class-breaks",
  //   field: "KATEGORIJA",
  //   normalizationField: "KATEGORIJA",
  //   legendOptions: {
  //     title: "% of adults with no high school education",
  //   },
  //   defaultSymbol: {
  //     type: "simple-fill",
  //     field: "KATEGORIJA",
  //   },
  // };

  layers.load().then(() => {
    const uniqueValue = view.map.layers.getItemAt(0).renderer.uniqueValueInfos;
    console.log(uniqueValue);

    const simpleRenderer = {
      type: "unique-value",
      field: "KATEGORIJA",
      defaultSymbol: { type: "simple-fill" },
      uniqueValueInfos: [
        {
          value: "1",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[0].symbol.color}`,
          },
        },
        {
          value: "2",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[1].symbol.color}`,
          },
        },
        {
          value: "3",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[3].symbol.color}`,
          },
        },
        {
          value: "4",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[4].symbol.color}`,
          },
        },
        {
          value: "5",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[2].symbol.color}`,
          },
        },
        {
          value: "6",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[5].symbol.color}`,
          },
        },
        {
          value: "7",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[6].symbol.color}`,
          },
        },
        {
          value: "8",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[7].symbol.color}`,
          },
        },
      ],
      // symbol: {
      //   // type: "simple-marker",
      //   value: 1,
      //   color: "blue",
      //   // size: 8,
      // },
    };

    const simpleRenderer2 = {
      type: "unique-value",
      field: "KATEGORIJA",
      // defaultSymbol: { type: "simple-fill" },
      uniqueValueInfos: uniqueValue,
    };

    view.when().then(() => {
      // layers.renderer = renderer;

      if (view.scale > 124447) {
        layers.renderer = simpleRenderer;
      }

      view.watch("scale", (newValue) => {
        layers.renderer = newValue >= 20000 ? simpleRenderer : simpleRenderer2;
      });
    });
  });

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
