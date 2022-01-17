import Graphic from "@arcgis/core/Graphic";
import { graphicsLayer } from "./DrawPolygon";

export const addEventsFeature = (params, layer, setState, type, message) => {
  var features = [];
  var addFeature = new Graphic({
    attributes: {
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
  features.push(addFeature);
  if (params.DIENOS) {
    console.log("yra papildomos dienos");
    var addFeature1 = new Graphic({
      attributes: {
        PAVADINIMAS: params.PAVADINIMAS,
        ORGANIZATORIUS: params.ORGANIZATORIUS,
        RENGINIO_PRADZIA: new Date(params.DIENOS).toISOString(),
        RENGINIO_PABAIGA: new Date(params.DIENOS).toISOString(),
        APRASYMAS: params.APRASYMAS !== undefined ? params.APRASYMAS : "",
        WEBPAGE: params.WEBPAGE,
        KATEGORIJA: params.KATEGORIJA == null ? 1 : params.KATEGORIJA,
        PASTABOS: params.PASTABOS !== undefined ? params.PASTABOS : "",
      },
      geometry: params.geometry,
    });
    features.push(addFeature1);
  } else {
    console.log("nera dienu");
  }

  console.log("features", features);

  const add = {
    addFeatures: features,
  };
  // padaryti validacija, if pavadinimas ir t.t suvestas tada daryti applyedits else ismesti,
  // kad reikia uzpildyti visus reikalingus duomenis
  layer
    .applyEdits(add)
    .then((response) => {
      if (response) {
        type("");
        message("Renginys sėkmingai pridėtas");
      }
      graphicsLayer.removeAll();
      setState([]);
    })
    .catch((error) => {
      if (error) {
        type("error");
        message("Įvyko klaida pridedant renginį:", error);
      }
    });
};
