import Graphic from "@arcgis/core/Graphic";
import { graphicsLayer } from "./DrawPolygon";

export const addEventsFeature = (params, layer, type, message) => {
  var features = [];

  // check if more polygons exist and when change geometry
  if (params.rings) {
    params.geometry.rings = params.rings;
  }

  if (
    params.startDateArr &&
    params.startDateArr.length > 0 &&
    params.Savaites_dienos.length < 12
  ) {
    params.startDateArr.map((item) => {
      var addFeature1 = new Graphic({
        attributes: {
          PAVADINIMAS: params.PAVADINIMAS,
          ORGANIZATORIUS: params.ORGANIZATORIUS,
          RENGINIO_PRADZIA: new Date(item.startDay).toISOString(),
          RENGINIO_PABAIGA: new Date(item.finishDay).toISOString(),
          APRASYMAS: params.APRASYMAS !== undefined ? params.APRASYMAS : "",
          WEBPAGE: params.WEBPAGE,
          KATEGORIJA: params.KATEGORIJA == null ? 1 : params.KATEGORIJA,
          PASTABOS: params.PASTABOS !== undefined ? params.PASTABOS : "",
          Savaites_dienos:
            params.Savaites_dienos !== undefined
              ? params.Savaites_dienos
              : "nera",
        },
        geometry: params.geometry,
      });
      return features.push(addFeature1);
    });
  } else {
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
        Savaites_dienos:
          params.Savaites_dienos !== undefined
            ? params.Savaites_dienos
            : "nera",
      },
      geometry: params.geometry,
    });
    features.push(addFeature);
  }

  const add = {
    addFeatures: features,
  };

  layer
    .applyEdits(add)
    .then((response) => {
      if (response) {
        type("");
        message("Renginys s??kmingai prid??tas");
      }
      graphicsLayer.removeAll();
      layer.opacity = 1;
    })
    .catch((error) => {
      if (error) {
        type("error");
        message("??vyko klaida pridedant rengin??:", error);
      }
    });
};
