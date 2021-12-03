import Graphic from "@arcgis/core/Graphic";
import { graphicsLayer } from "./DrawPolygon";

export const addEventsFeature = (params, layer, setState) => {
  const addFeature = new Graphic({
    attributes: {
      PAVADINIMAS: `${params.PAVADINIMAS}`,
      ORGANIZATORIUS: `${params.ORGANIZATORIUS}`,
      RENGINIO_PRADZIA: `${new Date(params.RENGINIO_PRADZIA).toISOString()} `,
      RENGINIO_PABAIGA: `${new Date(params.RENGINIO_PABAIGA).toISOString()}`,
      APRASYMAS: `${params.APRASYMAS}`,
      WEBPAGE: `${params.WEBPAGE}`,
      KATEGORIJA: `${params.KATEGORIJA}`,
      PASTABOS: `${params.PASTABOS}`,
    },
    geometry: params.geometry,
  });

  const add = {
    addFeatures: [addFeature],
  };

  layer
    .applyEdits(add)
    .then((response) => {
      if (response) {
        console.log(response + "is very good");
      }
      graphicsLayer.removeAll();
      setState([]);
    })
    .catch((error) => {
      if (error) {
        console.error("Editing error: ", error);
      }
    });
};
