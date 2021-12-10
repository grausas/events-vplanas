import Graphic from "@arcgis/core/Graphic";

export const deleteFeatureEvent = (layer, params, type, message) => {
  const deleteFeature = new Graphic({
    attributes: {
      OBJECTID: params.OBJECTID,
    },
  });
  const add = {
    deleteFeatures: [deleteFeature],
  };

  layer
    .applyEdits(add)
    .then((response) => {
      type("");
      message("Renginys sėkmingai ištrintas");
    })
    .catch((error) => {
      type("error");
      error("Įvyko klaida bandant ištrinti renginį", error);
    });
};
