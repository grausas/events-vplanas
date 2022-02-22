import WebMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { graphicsLayer } from "./DrawPolygon";
// category icons
import Susirinkimas from "../assets/icons/categories/IKONOS RENGINIAI 32x32-01.svg";
import SportoRenginys from "../assets/icons/categories/IKONOS RENGINIAI 32x32-02.svg";
import Koncertas from "../assets/icons/categories/IKONOS RENGINIAI 32x32-03.svg";
import Filmavimas from "../assets/icons/categories/IKONOS RENGINIAI 32x32-04.svg";
import Muge from "../assets/icons/categories/IKONOS RENGINIAI 32x32-05.svg";
import RenginysSeimai from "../assets/icons/categories/IKONOS RENGINIAI 32x32-06.svg";
import ValstybinisRenginys from "../assets/icons/categories/IKONOS RENGINIAI 32x32-07.svg";
import ViesasisRenginys from "../assets/icons/categories/IKONOS RENGINIAI 32x32-08.svg";

let webmap;

export const createMapView = (ref, layers) => {
  webmap = new WebMap({
    basemap: "gray-vector",
    layers: [layers, graphicsLayer],
  });

  const view = new MapView({
    container: ref,
    map: webmap,
    center: [25.27543, 54.697],
    zoom: 11,
    ui: {
      components: ["attribution"], // Exclude the zoom widget from the default UI
    },
  });

  // change renderer symbol depending on view zoom level

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
            type: "picture-marker",
            url: Susirinkimas,
            width: "20px",
            height: "20px",
          },
        },
        {
          value: "2",
          symbol: {
            type: "picture-marker",
            url: SportoRenginys,
            width: "20px",
            height: "20px",
          },
        },
        {
          value: "3",
          symbol: {
            type: "picture-marker",
            url: Koncertas,
            width: "20px",
            height: "20px",
          },
        },
        {
          value: "4",
          symbol: {
            type: "picture-marker",
            url: Filmavimas,
            width: "20px",
            height: "20px",
          },
        },
        {
          value: "5",
          symbol: {
            type: "picture-marker",
            url: Muge,
            width: "20px",
            height: "20px",
          },
        },
        {
          value: "6",
          symbol: {
            type: "picture-marker",
            url: RenginysSeimai,
            width: "20px",
            height: "20px",
          },
        },
        {
          value: "7",
          symbol: {
            type: "picture-marker",
            url: ValstybinisRenginys,
            width: "20px",
            height: "20px",
          },
        },
        {
          value: "8",
          symbol: {
            type: "picture-marker",
            url: ViesasisRenginys,
            width: "20px",
            height: "20px",
          },
        },
      ],
    };

    const simpleRendererBig = {
      type: "unique-value",
      field: "KATEGORIJA",
      defaultSymbol: { type: "simple-fill" },
      uniqueValueInfos: [
        {
          value: "1",
          symbol: {
            type: "picture-marker",
            url: Susirinkimas,
            width: "30px",
            height: "30px",
          },
        },
        {
          value: "2",
          symbol: {
            type: "picture-marker",
            url: SportoRenginys,
            width: "30px",
            height: "30px",
          },
        },
        {
          value: "3",
          symbol: {
            type: "picture-marker",
            url: Koncertas,
            width: "30px",
            height: "30px",
          },
        },
        {
          value: "4",
          symbol: {
            type: "picture-marker",
            url: Filmavimas,
            width: "30px",
            height: "30px",
          },
        },
        {
          value: "5",
          symbol: {
            type: "picture-marker",
            url: Muge,
            width: "30px",
            height: "30px",
          },
        },
        {
          value: "6",
          symbol: {
            type: "picture-marker",
            url: RenginysSeimai,
            width: "30px",
            height: "30px",
          },
        },
        {
          value: "7",
          symbol: {
            type: "picture-marker",
            url: ValstybinisRenginys,
            width: "30px",
            height: "30px",
          },
        },
        {
          value: "8",
          symbol: {
            type: "picture-marker",
            url: ViesasisRenginys,
            width: "30px",
            height: "30px",
          },
        },
      ],
    };

    const simpleRendererPolygon = {
      type: "unique-value",
      field: "KATEGORIJA",
      uniqueValueInfos: uniqueValue,
    };

    view.when().then(() => {
      if (view.scale > 124447) {
        layers.renderer = simpleRenderer;
      }

      view.watch("scale", (newValue) => {
        layers.renderer =
          newValue >= 14000 && newValue <= 75000
            ? simpleRendererBig
            : newValue > 45000
            ? simpleRenderer
            : simpleRendererPolygon;
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
// change basemap
export const handleChangeBasemap = (e) => {
  const itemValue = Number(e.target.value);
  if (itemValue === 2) {
    webmap.basemap = "satellite";
  } else {
    webmap.basemap = "gray-vector";
  }
};
