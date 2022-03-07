// import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import Editor from "@arcgis/core/widgets/Editor";

export const editPolygon = (view, layer) => {
  view &&
    view.when(() => {
      const editor = new Editor({
        view: view,
        container: "EditDiv",
        label: "PAVADINIMAS",
        allowedWorkflows: "update",
        supportingWidgetDefaults: false,
        layerInfos: [
          {
            layer: layer,
            allowAttachments: false,
            formTemplate: {
              // autocastable to FormTemplate
              elements: [
                {
                  type: "field",
                  fieldName: "PAVADINIMAS",
                  label: "Pavadinimas",
                },
                {
                  type: "field",
                  fieldName: "ORGANIZATORIUS",
                  label: "Organizatorius",
                },
                {
                  type: "field",
                  fieldName: "RENGINIO_PRADZIA",
                  label: "Renginio pradžia",
                },
                {
                  type: "field",
                  fieldName: "RENGINIO_PABAIGA",
                  label: "Renginio pabaiga",
                },
                {
                  type: "field",
                  fieldName: "KATEGORIJA",
                  label: "Kategorija",
                },
              ],
            },
          },
        ],
        // layerInfos: [polyInfos],
      });

      console.log(editor);

      editor.viewModel.sketchViewModel.defaultUpdateOptions = {
        tool: "reshape",
        toggleToolOnClick: false,
        mode: "click",
      };
      editor.viewModel.watch("state", function (event) {
        // console.log("graphicsLayer", graphicsLayer);
        // console.log("event", event);
        // let arr = [];
        // Check the Editor's viewModel state, if it is currently open and editing existing features, disable popups
        if (editor.viewModel.state === "editing-existing-feature") {
          editor.viewModel.sketchViewModel.on("update", function (event) {
            // console.log("sketchUpdate", event);
            // let sketchGeometry;
            if (event.state === "complete") {
              // console.log("drawPolygon", sketchGeometry);
              // arr.push("hello");
            }
          });
          // const sketchGeometry =
          //   editor.viewModel.featureFormViewModel.feature.geometry;

          // console.log("event2", editor);
          // console.log("event4", event);
        } else {
          // Grab the features of the popup
          // console.log("done", arr);
          // console.log("event3", event);
        }
      });

      // console.log(editor);
      // if (editor.viewModel.state === "editing-existing-feature") {
      //   console.log("hello");
      // }
    });
};

// reikia minimalios validacijos

// export const updatePolygon = (view, state, setState) => {
//   view.when(() => {
//     const sketchVM = new SketchViewModel({
//       view: view,
//       layer: graphicsLayer,

//       defaultUpdateOptions: {
//         tool: "reshape",
//         toggleToolOnClick: false,
//         mode: "click",
//       },
//       polygonSymbol: {
//         type: "simple-fill",
//         color: [0, 0, 0, 0.2],
//         style: "none",
//         outline: {
//           style: "dash",
//           color: [168, 168, 168, 1],
//           width: 2,
//         },
//       },
//     });

//     sketchVM.on("update", function (event) {
//       if (event.state === "complete") {
//         const graphic = event.graphics[0].geometry;
//         graphicsLayer.graphics.geometry = [graphic];

//         setState({
//           ...state,
//           geometry: graphic,
//         });
//       } else if (event.state === "start") {
//         view.on("key-up", function (evt) {
//           if (evt.key === "Delete") {
//             sketchVM.delete();
//             setState([]);
//             graphicsLayer.removeAll();
//           }
//         });
//       }
//     });

//     sketchVM.complete();
//   });
// };
