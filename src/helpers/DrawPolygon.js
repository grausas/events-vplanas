import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch";

export const graphicsLayer = new GraphicsLayer({
  title: "graphics",
});

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

        if (event.state === "complete") {
          const sketchGeometry = event.graphic.geometry;
          const sketchRings = event.graphic.geometry.rings[0];
          setState((s) => ({
            geometry: sketchGeometry,
            rings: [...s.rings, sketchRings],
          }));
        }
        if (event.state === "cancel") {
          layer.opacity = 1;
        }
      });

      sketch.on("delete", function () {
        graphicsLayer.removeAll();
        setState({
          geometry: "",
          rings: "",
        });
      });
    });
};
