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
