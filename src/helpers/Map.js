import WebMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { graphicsLayer } from "./DrawPolygon";

let webmap;

export const createMapView = (ref, baselayer, layers) => {
  webmap = new WebMap({
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

  layers.load().then(() => {
    const uniqueValue = view.map.layers.getItemAt(0).renderer.uniqueValueInfos;

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
            outline: {
              color: "#fff",
            },
          },
        },
        {
          value: "2",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[1].symbol.color}`,
            outline: {
              color: "#fff",
            },
          },
        },
        {
          value: "3",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[3].symbol.color}`,
            outline: {
              color: "#fff",
            },
          },
        },
        {
          value: "4",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[4].symbol.color}`,
            outline: {
              color: "#fff",
            },
          },
        },
        {
          value: "5",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[2].symbol.color}`,
            outline: {
              color: "#fff",
            },
          },
        },
        {
          value: "6",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[5].symbol.color}`,
            outline: {
              color: "#fff",
            },
          },
        },
        {
          value: "7",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[6].symbol.color}`,
            outline: {
              color: "#fff",
            },
          },
        },
        {
          value: "8",
          symbol: {
            type: "simple-marker", // autocasts as new SimpleFillSymbol()
            color: `${uniqueValue[7].symbol.color}`,
            outline: {
              color: "#fff",
            },
          },
        },
      ],
    };

    const simpleRenderer2 = {
      type: "unique-value",
      field: "KATEGORIJA",
      uniqueValueInfos: uniqueValue,
    };

    view.when().then(() => {
      if (view.scale > 124447) {
        layers.renderer = simpleRenderer;
      }

      view.watch("scale", (newValue) => {
        layers.renderer = newValue >= 20000 ? simpleRenderer : simpleRenderer2;
      });
    });
  });

  view.constraints = {
    minScale: 500000, // User cannot zoom out beyond a scale of 1:500,000
    maxScale: 0, // User can overzoom tiles
    rotationEnabled: false, // Disables map rotation
  };

  return view;
};

export const handleChangeBasemap = (e) => {
  const itemValue = Number(e.target.value);
  if (itemValue === 2) {
    webmap.basemap = "satellite";
  } else {
    webmap.basemap = "gray-vector";
  }
};
