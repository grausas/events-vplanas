// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { graphicsLayer } from "./DrawPolygon";

// export const graphicsLayer = new GraphicsLayer();

export const updatePolygon = (view) => {
  let sketchVM = new Sketch({
    layer: graphicsLayer,
    view: view,
  });

  sketchVM.update([graphicsLayer], {
    tool: "transform",
    enableRotation: true,
    enableScaling: true,
    preserveAspectRatio: true,
    toggleToolOnClick: true,
  });
};
