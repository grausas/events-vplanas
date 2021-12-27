import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";

export const graphicsLayer = new GraphicsLayer({
  id: "tempGraphics",
});

export const drawNewPolygon = (view, state, setState, eventsFeatureLayer) => {
  const sketchVM = new SketchViewModel({
    layer: graphicsLayer,
    view: view,
    polygonSymbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "rgba(0, 205, 255, 0.3)",
      style: "backward-diagonal",
      outline: {
        color: "red",
        width: 1,
      },
    },
    defaultCreateOptions: { mode: "click" },
    updateOnGraphicClick: false,
  });

  sketchVM
    .create("polygon", { mode: "click" })
    .then((eventsFeatureLayer.opacity = 0.3));

  sketchVM.on("create", function (event) {
    view.on("key-up", function (evt) {
      if (evt.key === "Escape") {
        eventsFeatureLayer.opacity = 1;
      }
    });
    if (event.state === "complete") {
      const sketchGeometry = event.graphic.geometry;
      setState({
        ...state,
        geometry: sketchGeometry,
      });
    }
  });

  sketchVM.complete();
};
