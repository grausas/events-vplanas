import Graphic from "@arcgis/core/Graphic";

export const updateEventFeature = (queryPoint, layer) => {
  const editFeature = new Graphic({
    attributes: {
      OBJECTID: `${queryPoint.OBJECTID}`,
      GlobalID: `${queryPoint.GlobalID}`,
      PAVADINIMAS: `${queryPoint.PAVADINIMAS}`,
      ORGANIZATORIUS: `${queryPoint.ORGANIZATORIUS}`,
      PASTABOS: `${queryPoint.PASTABOS}`,
      APRASYMAS: `${queryPoint.APRASYMAS}`,
      WEBPAGE: `${queryPoint.WEBPAGE}`,
      KATEGORIJA: `${queryPoint.KATEGORIJA}`,
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
    .then((response) => {
      console.log("edit results: ", response);
    })
    .catch((error) => {
      console.error("Editing error: ", error);
    });
};
