import Sketch from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { graphicsLayer } from "./DrawPolygon";

// reikia minimalios validacijos

export const updatePolygon = (view, state, setState) => {
  const sketchVM = new Sketch({
    view: view,
    layer: graphicsLayer,
    // updateOnGraphicClick: false,
    defaultUpdateOptions: {
      tool: "reshape",
      toggleToolOnClick: false,
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
    console.log("firssss", event);
    if (event.state === "cancel" || event.state === "complete") {
      console.log("event second", event);
      const sketchGeometry = event.graphics[0].geometry;
      const graphic = event.graphics[0];
      graphicsLayer.graphics = [graphic];
      sketchVM.update([graphic]);

      setState({
        ...state,
        geometry: sketchGeometry,
      });
    } else {
      console.log("elseeese", event);
    }
  });
};
