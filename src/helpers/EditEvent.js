import Graphic from "@arcgis/core/Graphic";

export const updateEventFeature = (params, layer) => {
  const editFeature = new Graphic({
    attributes: {
      OBJECTID: `${params.OBJECTID}`,
      GlobalID: `${params.GlobalID}`,
      PAVADINIMAS: `${params.PAVADINIMAS}`,
      ORGANIZATORIUS: `${params.ORGANIZATORIUS}`,
      PASTABOS: `${params.PASTABOS}`,
      APRASYMAS: `${params.APRASYMAS}`,
      WEBPAGE: `${params.WEBPAGE}`,
      KATEGORIJA: `${params.KATEGORIJA}`,
      RENGINIO_PRADZIA: `${new Date(params.RENGINIO_PRADZIA).toISOString()}`,
      RENGINIO_PABAIGA: `${new Date(params.RENGINIO_PABAIGA).toISOString()}`,
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
