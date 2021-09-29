import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

import Icon from "../assets/icons/place.png";

export const featureLayer = () => {
  const textSymbol = {
    // type: "picture-marker",
    // url: `${Icon}`,
    type: "simple-marker",
    size: "7",
    color: "#ed1c24",
    outline: {
      color: "#000000",
      width: 0.4,
    },
  };

  const layer = new FeatureLayer({
    url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Renginiu_zemelapis_gdb/FeatureServer/0",
    outFields: ["*"],
    renderer: {
      type: "simple",
      symbol: textSymbol,
    },
  });

  return layer;
};
