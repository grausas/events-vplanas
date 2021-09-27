import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const featureLayer = () => {
  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Renginiu_zemelapis_gdb/FeatureServer/0",
    outFields: ["*"],
  });

  return layer;
};
