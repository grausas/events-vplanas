import Graphic from "@arcgis/core/Graphic";

export const addEventsFeature = (addNewFeature, layer, geometry) => {
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
    geometry: geometry,
  });
  console.log(addFeature.attributes);

  const add = {
    addFeatures: [addFeature],
  };

  layer
    .applyEdits(add)
    .then((editResults) => {
      console.log("edit results: ", editResults);
    })
    .catch((error) => {
      console.error("Editing error: ", error);
    });
};
