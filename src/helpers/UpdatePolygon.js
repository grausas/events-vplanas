import Sketch from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { graphicsLayer } from "./DrawPolygon";

// reikia minimalios validacijos

export const updatePolygon = (view, state, setState) => {
  const sketchVM = new Sketch({
    view: view,
    layer: graphicsLayer,

    defaultUpdateOptions: {
      tool: "reshape",
      toggleToolOnClick: false,
      mode: "click",
    },
    polygonSymbol: {
      type: "simple-fill",
      color: [0, 0, 0, 0.2],
      style: "none",
      outline: {
        style: "dash",
        color: [168, 168, 168, 1],
        width: 2,
      },
    },
  });

  sketchVM.on("update", function (event) {
    if (event.state === "complete") {
      const graphic = event.graphics[0].geometry;
      graphicsLayer.graphics.geometry = [graphic];

      setState({
        ...state,
        geometry: graphic,
      });
    } else if (event.state === "start") {
      view.on("key-up", function (evt) {
        if (evt.key === "Delete") {
          sketchVM.delete();
          setState([]);
          graphicsLayer.removeAll();
        }
      });
    }
  });

  sketchVM.complete();
};
