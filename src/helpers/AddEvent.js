import Graphic from "@arcgis/core/Graphic";
import { graphicsLayer } from "./DrawPolygon";

export const addEventsFeature = (params, layer, setState, type, message) => {
  console.log("params startDayArrAddEvent", params.startDateArr);
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
  // padaryti, kad jeigu renginio datos diena sutampa su checkbox diena, tada neleisti prideti papildomos
  if (params.startDateArr && params.startDateArr.length > 0) {
    console.log("yra papildomos dienos");
    params.startDateArr.map((item) => {
      var addFeature1 = new Graphic({
        attributes: {
          PAVADINIMAS: params.PAVADINIMAS,
          ORGANIZATORIUS: params.ORGANIZATORIUS,
          RENGINIO_PRADZIA: new Date(item.StartDay).toISOString(),
          RENGINIO_PABAIGA: new Date(item.FinishDay).toISOString(),
          APRASYMAS: params.APRASYMAS !== undefined ? params.APRASYMAS : "",
          WEBPAGE: params.WEBPAGE,
          KATEGORIJA: params.KATEGORIJA == null ? 1 : params.KATEGORIJA,
          PASTABOS: params.PASTABOS !== undefined ? params.PASTABOS : "",
        },
        geometry: params.geometry,
      });
      return features.push(addFeature1);
    });
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
      layer.refresh();
      layer.load();
    })
    .catch((error) => {
      if (error) {
        type("error");
        message("Įvyko klaida pridedant renginį:", error);
      }
    });
};
