import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const date = new Date().toISOString();
// const queryEventsDate = new Date(
//   date.setMonth(date.getMonth() - 1)
// ).toISOString();

export const featureLayer = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/arcgis/rest/services/Renginiai_Vilniuje_P_View/FeatureServer/0",
    definitionExpression: "RENGINIO_PABAIGA > '" + date + "'",
    outFields: ["*"],
    title: "public",
  });
  return layer;
};

export const featureLayerPrivate = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Renginiai_Vilniuje_P/FeatureServer/0",
    definitionExpression: "RENGINIO_PABAIGA > '" + date + "'",
    outFields: ["*"],
    title: "private",
  });
  return layer;
};
