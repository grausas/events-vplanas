// import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import Editor from "@arcgis/core/widgets/Editor";
// import { graphicsLayer } from "./DrawPolygon";

export const editPolygon = (view, layer) => {
  // const polyInfos = {
  //   layer: layer,
  //   formTemplate: {
  //     // autocasts to FormTemplate
  //     elements: [
  //       {
  //         // autocasts to FieldElement
  //         type: "field",
  //         fieldName: "incidenttype",
  //         label: "Incident Type",
  //       },
  //       {
  //         type: "field",
  //         fieldName: "activeincid",
  //         label: "Active",
  //       },
  //       {
  //         type: "field",
  //         fieldName: "descrip",
  //         label: "Description",
  //       },
  //     ],
  //   },
  // };

  view &&
    view.when(() => {
      const editor = new Editor({
        view: view,
        container: "EditDiv",
        label: "PAVADINIMAS",
        allowedWorkflows: "update",
        // layerInfos: [polyInfos],
        snappingOptions: {
          enabled: true,
          featureSources: [{ layer: layer }],
        },
      });

      console.log(editor.viewModel);
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
