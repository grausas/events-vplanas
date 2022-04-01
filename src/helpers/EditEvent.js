import Graphic from "@arcgis/core/Graphic";

export const updateEventFeature = (params, layer, type, message, rings) => {
  if (rings.rings) {
    rings.rings.map((item) => params.geometry.addRing(item));
  }

  const editFeature = new Graphic({
    attributes: {
      OBJECTID: params.OBJECTID,
      GlobalID: params.GlobalID,
      PAVADINIMAS: params.PAVADINIMAS,
      ORGANIZATORIUS: params.ORGANIZATORIUS,
      RENGINIO_PRADZIA: new Date(params.RENGINIO_PRADZIA).toISOString(),
      RENGINIO_PABAIGA: new Date(params.RENGINIO_PABAIGA).toISOString(),
      APRASYMAS: params.APRASYMAS !== undefined ? params.APRASYMAS : "",
      WEBPAGE: params.WEBPAGE,
      KATEGORIJA: params.KATEGORIJA == null ? 1 : params.KATEGORIJA,
      PASTABOS: params.PASTABOS !== undefined ? params.PASTABOS : "",
    },
    geometry: params.geometry,
  });

  const edits = {
    updateFeatures: [editFeature],
  };

  layer
    .applyEdits(edits)
    .then(() => {
      type("");
      message("Renginys sėkmingai redaguotas");
    })
    .catch((error) => {
      type("error");
      message("Įvyko klaida, nepavyko redaguoti renginio", error);
    });
};
