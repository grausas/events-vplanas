import Graphic from "@arcgis/core/Graphic";
import { graphicsLayer } from "./DrawPolygon";

export const addEventsFeature = (addNewFeature, layer, setState) => {
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

  console.log(addFeature);

  const add = {
    addFeatures: [addFeature],
  };

  layer
    .applyEdits(add)
    .then((editResults) => {
      console.log("edit results: ", editResults);
      graphicsLayer.removeAll();
      setState([]);
    })
    .catch((error) => {
      console.error("Editing error: ", error);
    });
};
