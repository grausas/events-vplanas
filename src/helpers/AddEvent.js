import Graphic from "@arcgis/core/Graphic";

export const addEventsFeature = (addNewFeature, layer) => {
  const addFeature = new Graphic({
    attributes: {
      PAVADINIMAS: `${addNewFeature.PAVADINIMAS}`,
      ORGANIZATORIUS: `${addNewFeature.ORGANIZATORIUS}`,
      RENGINIO_PRADZIA: `${new Date(
        addNewFeature.RENGINIO_PRADZIA
      ).toISOString()}`,
      PASTABOS: `${addNewFeature.PASTABOS}`,
    },
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
