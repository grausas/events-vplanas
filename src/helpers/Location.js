import Locate from "@arcgis/core/widgets/Locate";

export const locatePlace = (view) => {
  new Locate({
    view: view,
    container: "LocationDiv",
  });
};
