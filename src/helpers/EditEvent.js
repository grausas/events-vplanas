import Graphic from "@arcgis/core/Graphic";

// gal neleisti koreguoti datu, nes per daug keitimo atsiranfa
export const updateEventFeature = (params, layer, type, message) => {
  const editFeature = new Graphic({
    attributes: {
      OBJECTID: params.OBJECTID,
      GlobalID: params.GlobalID,
      PAVADINIMAS: params.PAVADINIMAS,
      ORGANIZATORIUS: params.ORGANIZATORIUS,
      PASTABOS: params.PASTABOS,
      APRASYMAS: params.APRASYMAS,
      WEBPAGE: params.WEBPAGE,
      KATEGORIJA: params.KATEGORIJA,
      RENGINIO_PRADZIA: new Date(params.RENGINIO_PRADZIA).toISOString(),
      RENGINIO_PABAIGA: new Date(params.RENGINIO_PABAIGA).toISOString(),
    },
  });
  const edits = {
    updateFeatures: [editFeature],
  };

  layer
    .applyEdits(edits)
    .then((response) => {
      type("");
      message("Renginys sėkmingai redaguotas");
    })
    .catch((error) => {
      type("error");
      message("Įvyko klaida, nepavyko redaguoti renginio", error);
    });
};
