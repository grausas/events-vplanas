import Graphic from "@arcgis/core/Graphic";
import { graphicsLayer } from "./DrawPolygon";

export const addEventsFeature = (
  addNewFeature,
  layer,
  setState,
  type,
  error
) => {
  const addFeature = new Graphic({
    attributes: {
      PAVADINIMAS: `${addNewFeature.PAVADINIMAS}`,
      ORGANIZATORIUS: `${addNewFeature.ORGANIZATORIUS}`,
      RENGINIO_PRADZIA: `${new Date(
        addNewFeature.RENGINIO_PRADZIA
      ).toISOString()} `,
      RENGINIO_PABAIGA: `${new Date(
        addNewFeature.RENGINIO_PABAIGA
      ).toISOString()}`,
      APRASYMAS: `${addNewFeature.APRASYMAS}`,
      WEBPAGE: `${addNewFeature.WEBPAGE}`,
      KATEGORIJA: `${addNewFeature.KATEGORIJA}`,
      PASTABOS: `${addNewFeature.PASTABOS}`,
    },
    geometry: addNewFeature.geometry,
  });

  const add = {
    addFeatures: [addFeature],
  };

  layer
    .applyEdits(add)
    .then((response) => {
      if (response) {
        type("");
        error("Renginys sėkmingai pridėtas");
        console.log(response + "is very good");
      } else {
        type("error");
        error("Klaida, bandykite dar kartą");
      }
      console.log("edit results: ", response);
      graphicsLayer.removeAll();
      setState([]);
    })
    .catch((error) => {
      if (error) {
        console.error("Editing error: ", error);
        // type("error");
        // error("Klaida, bandykite dar kartą");
      }
    });
};
