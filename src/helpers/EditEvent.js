import Graphic from "@arcgis/core/Graphic";

export const updateEventFeature = (queryPoint, layer) => {
  const editFeature = new Graphic({
    attributes: {
      OBJECTID: `${queryPoint.OBJECTID}`,
      GlobalID: `${queryPoint.GlobalID}`,
      PAVADINIMAS: `${queryPoint.PAVADINIMAS}`,
      ORGANIZATORIUS: `${queryPoint.ORGANIZATORIUS}`,
      RENGINIO_PRADZIA: `${new Date(
        queryPoint.RENGINIO_PRADZIA
      ).toISOString()}`,
      RENGINIO_PABAIGA: `${new Date(
        queryPoint.RENGINIO_PABAIGA
      ).toISOString()}`,
    },
  });
  console.log(editFeature.attributes);
  const edits = {
    updateFeatures: [editFeature],
  };

  layer
    .applyEdits(edits)
    .then((editResults) => {
      console.log("edit results: ", editResults);
    })
    .catch((error) => {
      console.error("Editing error: ", error);
    });
};
