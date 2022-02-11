import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
// import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import Sketch from "@arcgis/core/widgets/Sketch";

export const graphicsLayer = new GraphicsLayer();
// Sketch widget
export const drawNewPolygon = (view, state, setState) => {
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
        if (event.state === "complete") {
          const sketchGeometry = event.graphic.geometry;
          const sketchRings = event.graphic.geometry.rings[0];
          console.log(sketchRings);

          setState((state) => ({
            geometry: sketchGeometry,
            rings: [...state.rings, sketchRings],
          }));
        }
      });
      sketch.on("delete", function (event) {
        console.log("delete", event);
        setState({
          geometry: "",
          rings: "",
        });
      });
    });
};

// SketchViewModel draw
// export const drawNewPolygon = (view, state, setState, eventsFeatureLayer) => {
// view.when(() => {
// const sketchVM = new SketchViewModel({
//   layer: graphicsLayer,
//   view: view,
//   polygonSymbol: {
//     type: "simple-fill", // autocasts as new SimpleFillSymbol()
//     color: "rgba(0, 205, 255, 0.3)",
//     style: "backward-diagonal",
//     outline: {
//       color: "red",
//       width: 1,
//     },
//   },
//   defaultCreateOptions: { mode: "click" },
//   updateOnGraphicClick: false,
// });

// sketchVM
//   .create("polygon", { mode: "click" })
//   .then((eventsFeatureLayer.opacity = 0.3));

// sketchVM.on("create", function (event) {
//   view.on("key-up", function (evt) {
//     if (evt.key === "Escape") {
//       eventsFeatureLayer.opacity = 1;
//     }
//   });
//   if (event.state === "complete") {
//     const sketchGeometry = event.graphic.geometry;
//     setState({
//       ...state,
//       geometry: sketchGeometry,
//     });
//   }
// });

// sketchVM.complete();
// });
// };
