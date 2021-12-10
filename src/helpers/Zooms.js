export const handleZoom = (e, eventsFeatureLayer, view) => {
  const eventId = e;

  eventsFeatureLayer.queryFeatures().then(function (results) {
    const features = results.features;
    view.goTo(
      {
        target: features.filter(
          (item) => item.attributes.OBJECTID === Number(eventId)
        ),
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
      center: [25.19543, 54.697],
      zoom: 11,
    },
    { duration: 500 }
  );
};
