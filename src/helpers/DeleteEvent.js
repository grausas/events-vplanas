import Graphic from "@arcgis/core/Graphic";

export const deleteFeatureEvent = (layer, queryPoint) => {
  const deleteFeature = new Graphic({
    attributes: {
      OBJECTID: `${queryPoint.OBJECTID}`,
    },
  });
  const add = {
    deleteFeatures: [deleteFeature],
  };

  layer
    .applyEdits(add)
    .then((response) => {
      console.log("delete results: ", response);
    })
    .catch((error) => {
      console.error("Delete error: ", error);
    });
};
