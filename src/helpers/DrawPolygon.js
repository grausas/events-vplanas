import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch/SketchViewModel";

export const graphicsLayer = new GraphicsLayer();

export const drawNewPolygon = (view, state, setState) => {
  let sketchVM = new Sketch({
    layer: graphicsLayer,
    view: view,
  });

  sketchVM.create("polygon", { mode: "click" });

  sketchVM.on("create", function (event) {
    if (event.state === "complete") {
      const sketchGeometry = event.graphic.geometry;
      // console.log(sketchGeometry);
      // console.log(graphicsLayer);
      setState({
        ...state,
        geometry: sketchGeometry,
      });
    }
  });

  return GraphicsLayer;
};
