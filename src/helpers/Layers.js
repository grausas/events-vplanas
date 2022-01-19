import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import VectorLayer from "@arcgis/core/layers/VectorTileLayer";

export const featureLayerPrivate = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Renginiai_Vilniuje_P/FeatureServer/0",
    outFields: ["*"],
    // rodyti renginius nuo dabartinės datos
    // definitionExpression:
    //   "RENGINIO_PRADZIA > date'" + new Date().toISOString().slice(0, 10) + "'",
  });
  return layer;
};

export const featureLayer = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/arcgis/rest/services/Renginiai_Vilniuje_P_View/FeatureServer",
    outFields: ["*"],
    // rodyti renginius nuo dabartinės datos
    // definitionExpression:
    //   "RENGINIO_PRADZIA > date'" + new Date().toISOString().slice(0, 10) + "'",
  });
  return layer;
};

export const tileLayer = () => {
  const tile = new TileLayer({
    url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_LKS_su_rajonu/MapServer",
  });

  return tile;
};

export const vectorLayer = () => {
  const vector = new VectorLayer({
    url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",
  });
  return vector;
};
