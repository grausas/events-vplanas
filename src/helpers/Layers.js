import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";

export const featureLayer = () => {
  const textSymbol = {
    type: "simple-marker",
    size: "7",
    color: "#ed1c24",
    outline: {
      color: "#000000",
      width: 0.4,
    },
  };

  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Renginiai_Vilniuje_P/FeatureServer/0",
    outFields: ["*"],
    renderer: {
      type: "simple",
      symbol: textSymbol,
    },
  });

  return layer;
};

export const tileLayer = () => {
  const tile = new TileLayer({
    url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_LKS_su_rajonu/MapServer",
  });

  return tile;
};
