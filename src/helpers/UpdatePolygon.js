// import Editor from "@arcgis/core/widgets/Editor";

// export const editPolygon = (view, layer) => {
//   view &&
//     view.when(() => {
//       const editor = new Editor({
//         view: view,
//         container: "EditDiv",
//         label: "PAVADINIMAS",
//         allowedWorkflows: "update",
//         supportingWidgetDefaults: false,
//         layerInfos: [
//           {
//             layer: layer,
//             allowAttachments: false,
//             formTemplate: {
//               // autocastable to FormTemplate
//               elements: [
//                 {
//                   type: "field",
//                   fieldName: "PAVADINIMAS",
//                   label: "Pavadinimas",
//                 },
//                 {
//                   type: "field",
//                   fieldName: "ORGANIZATORIUS",
//                   label: "Organizatorius",
//                 },
//                 {
//                   type: "field",
//                   fieldName: "RENGINIO_PRADZIA",
//                   label: "Renginio pradžia",
//                 },
//                 {
//                   type: "field",
//                   fieldName: "RENGINIO_PABAIGA",
//                   label: "Renginio pabaiga",
//                 },
//                 {
//                   type: "field",
//                   fieldName: "KATEGORIJA",
//                   label: "Kategorija",
//                 },
//               ],
//             },
//           },
//         ],
//       });

//       // console.log(editor);

//       editor.viewModel.sketchViewModel.defaultUpdateOptions = {
//         tool: "reshape",
//         toggleToolOnClick: false,
//         mode: "click",
//       };

//       editor.viewModel.watch("state", function (event) {
//         // Check the Editor's viewModel state, if it is currently open and editing existing features, disable popups
//         if (editor.viewModel.state === "editing-existing-feature") {
//           editor.viewModel.sketchViewModel.on("update", function (event) {
//             // let sketchGeometry;
//             if (event.state === "complete") {
//               // arr.push("hello");
//             }
//           });
//         }
//       });
//     });
// };
