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
