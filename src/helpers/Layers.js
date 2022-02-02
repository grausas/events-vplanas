import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const featureLayer = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/arcgis/rest/services/Renginiai_Vilniuje_P_View/FeatureServer/0",
    outFields: ["*"],
    // rodyti renginius nuo dabartinės datos
  });
  return layer;
};

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
