// Zoom to clicked event
export const handleZoom = (e, eventsFeatureLayer, view) => {
  const eventId = e;
  eventsFeatureLayer.queryFeatures().then(function (results) {
    const features = results.features;
    const filterResult = features.filter(
      (item) => item.attributes.OBJECTID === Number(eventId)
    );
    view.goTo(
      {
        target: filterResult,
        zoom: 16,
      },
      { duration: 700 }
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

// zoom to default position
export const zoomDefault = (view) => {
  view.goTo(
    {
      center: [25.27543, 54.697],
      zoom: 11,
    },
    { duration: 500 }
  );
};
