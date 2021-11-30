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
    if (event.state === "complete") {
      console.log("event second", event);
      // var sketchGeometry = event.graphics[0].geometry;
      const graphic = event.graphics[0];
      graphicsLayer.graphics = [graphic];
      console.log("graphicsLayer.graphics", graphicsLayer.graphics);
      // sketchVM.update([graphic]);
      console.log("graphic", graphic);

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
    } else {
      console.log("elseee", event);
    }
  });

  sketchVM.complete();
};
