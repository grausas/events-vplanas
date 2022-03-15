import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch";

export const graphicsLayer = new GraphicsLayer({
  title: "graphics",
});

let arr = [];

// Sketch widget
export const drawNewPolygon = (view, setState, layer) => {
  view &&
    view.when(() => {
      const sketch = new Sketch({
        layer: graphicsLayer,
        container: "SketchDiv",
        view: view,
        visibleElements: {
          createTools: {
            circle: false,
            polyline: false,
            rectangle: false,
            point: false,
          },
          selectionTools: {
            "lasso-selection": false,
            "rectangle-selection": false,
          },
          settingsMenu: false,
        },
        defaultUpdateOptions: {
          tool: "reshape",
          toggleToolOnClick: false,
          mode: "click",
        },
      });

      sketch.on("create", function (event) {
        layer.opacity = 0.2;
        let sketchGeometry;

        if (event.state === "complete") {
          sketchGeometry = event.graphic.geometry;
          const sketchRings = event.graphic.geometry.rings[0];
          if (arr.length > 0) {
            arr[0].rings.push(sketchRings);
          } else {
            arr.push(sketchGeometry);
          }
          setState((s) => ({
            geometry: arr,
          }));
        }
        if (event.state === "cancel") {
          layer.opacity = 1;
        }
      });
      sketch.on("delete", function (event) {
        graphicsLayer.removeAll();
        arr = [];
        setState({
          geometry: "",
        });
      });
    });
};
