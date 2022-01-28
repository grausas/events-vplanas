// Zoom to clicked event
export const handleZoom = (e, eventsFeatureLayer, view) => {
  const eventId = e;

  // pakeisti i viewLayer
  eventsFeatureLayer.queryFeatures().then(function (results) {
    const features = results.features;
    const filterResult = features.filter(
      (item) => item.attributes.OBJECTID === Number(eventId)
    );
    console.log(filterResult);
    // highlight reikia sutvarkyti, kad nusiimtu
    view.whenLayerView(eventsFeatureLayer).then(function (layerView) {
      layerView.highlight(filterResult);
    });
    view.goTo(
      {
        target: filterResult,
        zoom: 14,
      },
      { duration: 1000 }
    );
  });
};

export const zoomIn = (view) => {
  let currentZoom = view.zoom;
  view.goTo(
    {
      zoom: `${(currentZoom += 1)}`,
    },
    { duration: 200 }
  );
};

export const zoomOut = (view) => {
  let currentZoom = view.zoom;
  view.goTo(
    {
      zoom: `${(currentZoom -= 1)}`,
    },
    { duration: 200 }
  );
};

export const zoomDefault = (view) => {
  view.goTo(
    {
      center: [25.27543, 54.697],
      zoom: 11,
    },
    { duration: 500 }
  );
};
