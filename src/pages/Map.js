import { useRef, useEffect, useState } from "react";

// Styles
import "./Map.css";
// Hooks
import { useOpenClose } from "../hooks/useOpenClose";

// modules
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Sketch from "@arcgis/core/widgets/Sketch/SketchViewModel";

// Components
import {
  EventCard,
  EventsSchedule,
  InputField,
  AddEvent,
  SearchInput,
  Filter,
  DatePicker as SingleDatePicker,
} from "../components/index.js";

// helpers
import { createMapView } from "../helpers/Map";
import { featureLayer, tileLayer, vectorLayer } from "../helpers/Layers";
import { addEventsFeature } from "../helpers/AddEvent";
import { updateEventFeature } from "../helpers/EditEvent";

function Map() {
  const mapRef = useRef(null);

  const [data, setData] = useState([]);
  const [queryPoint, setQueryPoint] = useState([]);
  const [addNewFeature, setAddNewFeature] = useState([]);
  const [view, setView] = useState();
  const [layer, setLayer] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  // console.log(addNewFeature);

  // Event modal open
  const { handleOpen, show } = useOpenClose();

  const results = !searchTerm
    ? data
    : data.filter(
        (item) =>
          item.attributes.PAVADINIMAS &&
          item.attributes.PAVADINIMAS.toLowerCase().includes(
            searchTerm.toLocaleLowerCase()
          )
      );

  const shortResults = results.slice(0).sort((a, b) => {
    const x = a.attributes.RENGINIO_PRADZIA;
    const y = b.attributes.RENGINIO_PRADZIA;
    return x < y ? -1 : x > y ? 1 : 0;
  });

  const addEvents = () => addEventsFeature(addNewFeature, layer);
  const updateEvent = () => updateEventFeature(queryPoint, layer);

  useEffect(() => {
    const layer = featureLayer();
    const tile = tileLayer();
    const vector = vectorLayer();
    const graphicsLayer = new GraphicsLayer();

    const view = createMapView(mapRef.current, vector, layer);

    setLayer(layer);
    setView(view);

    layer
      .queryFeatures({
        where: ["1=1"],
        outFields: ["*"],
      })
      .then((res) => {
        setData(res.features);
      });

    view.on("click", function (event) {
      view.hitTest(event).then(function (response) {
        // laikinas fix, kad paspaudus ant map, bet kurioje vietoje nemestų error
        if (response.results.length > 1) {
          const graphic = response.results.filter(function (result) {
            // check if the graphic belongs to the layer of interest
            return result.graphic.layer === layer;
          })[0].graphic.attributes;
          setQueryPoint(graphic);
          handleOpen(true);
        } else {
          return null;
        }
      });
    });

    // view.on("click", function () {
    //   const area = Polygon.fromExtent(view.extent);
    //   // console.log(area);
    //   setAddNewFeature({
    //     ...addNewFeature,
    //     rings: area,
    //   });
    //   const graphic = new Graphic({
    //     geometry: area,
    //     symbol: { type: "simple-fill" },
    //   });
    // });

    let sketchVM = new Sketch({
      layer: graphicsLayer,
      view: view,
    });

    sketchVM.create("polygon", { mode: "click" });

    sketchVM.on("create", function (event) {
      if (event.state === "complete") {
        console.log(event);
      }
    });

    return () => {
      view && view.destroy();
    };
  }, []);

  // Datos formatavimas
  const pad = function (n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  };

  const newStartDate = new Date(queryPoint.RENGINIO_PRADZIA);
  const newFinishDate = new Date(queryPoint.RENGINIO_PABAIGA);
  const startEventTime =
    pad(newStartDate.getHours(), 2) + ":" + pad(newStartDate.getMinutes(), 2);
  const startEventDate =
    newStartDate.getFullYear() +
    "-" +
    pad(newStartDate.getMonth() + 1, 2) +
    "-" +
    pad(newStartDate.getDate(), 2);

  const finishEventTime =
    pad(newFinishDate.getHours(), 2) + ":" + pad(newFinishDate.getMinutes(), 2);
  const finishEventDate =
    newFinishDate.getFullYear() +
    "-" +
    pad(newFinishDate.getMonth() + 1, 2) +
    "-" +
    pad(newFinishDate.getDate(), 2);

  return (
    <div className="mapDiv" ref={mapRef}>
      {/* Fix this. Too much code here. Reuse time date */}
      <EventsSchedule>
        <SearchInput
          value={searchTerm}
          handleChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          placeholder="Ieškoti..."
        />
        {shortResults.length ? (
          shortResults.map((items) => {
            const item = items.attributes;
            const newStartDate = new Date(item.RENGINIO_PRADZIA).toLocaleString(
              "lt-LT",
              { timeZone: "Europe/Vilnius" }
            );
            const newFinishDate = new Date(
              item.RENGINIO_PABAIGA
            ).toLocaleString("lt-LT", { timeZone: "Europe/Vilnius" });

            return (
              <div key={item.OBJECTID}>
                <p>{newStartDate}</p>
                <p>{newFinishDate}</p>
                <p>{item.PAVADINIMAS}</p>
                <p>{item.ORGANIZATORIUS}</p>
              </div>
            );
          })
        ) : (
          <span>Loading...</span>
        )}
      </EventsSchedule>
      <Filter />

      {/* <button onClick={openSketch}>Add Event Location</button> */}

      {/* Pridėti naują renginį  */}
      <AddEvent
        buttonText="Pridėti"
        titleText="Pridėti renginį"
        handleSubmit={(e) => {
          e.preventDefault();
          addEvents(addNewFeature);
        }}
      >
        <InputField
          type="text"
          labelText="Pavadinimas"
          id="pavadinimas"
          placeholder="Pavadinimas"
          required
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              PAVADINIMAS: e.target.value,
            });
          }}
        />
        <InputField
          type="text"
          labelText="Organizatorius"
          id="organizatorius"
          placeholder="Organizatorius"
          required
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              ORGANIZATORIUS: e.target.value,
            });
          }}
        />
        <InputField
          type="longtext"
          labelText="Pastabos"
          placeholder="Pastabos"
          id="pastabos"
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              PASTABOS: e.target.value,
            });
          }}
        />
        <InputField
          type="longtext"
          labelText="Aprašymas"
          placeholder="Aprašymas"
          id="aprasymas"
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              APRASYMAS: e.target.value,
            });
          }}
        />
        <SingleDatePicker
          placeholderTextDate="Data"
          placeholderTextTime="Laikas"
          timeTitle="Pradžios laikas"
          dateTitle="Pradžios data"
          selected={
            addNewFeature.RENGINIO_PRADZIA !== undefined
              ? addNewFeature.RENGINIO_PRADZIA
              : null
          }
          handleChange={(date) => {
            setAddNewFeature({
              ...addNewFeature,
              RENGINIO_PRADZIA: date,
            });
          }}
        />
        <SingleDatePicker
          placeholderTextDate="Data"
          placeholderTextTime="Laikas"
          timeTitle="Pabaigos laikas"
          dateTitle="Pabaigos data"
          selected={
            addNewFeature.RENGINIO_PABAIGA !== undefined
              ? addNewFeature.RENGINIO_PABAIGA
              : null
          }
          handleChange={(date) => {
            setAddNewFeature({
              ...addNewFeature,
              RENGINIO_PABAIGA: date,
            });
          }}
        />
        <InputField
          type="text"
          labelText="Renginio puslapis"
          id="puslapis"
          placeholder="Renginio puslapis"
          required
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              WEBPAGE: e.target.value,
            });
          }}
        />
      </AddEvent>

      {/* Renginys ir jo redagavimas */}
      {show && (
        <EventCard
          organization={queryPoint.ORGANIZATORIUS}
          title={queryPoint.PAVADINIMAS}
          url={queryPoint.WEBPAGE}
          comment={queryPoint.PASTABOS}
          startDate={startEventDate + " | " + startEventTime}
          finishDate={finishEventDate + " | " + finishEventTime}
          handleChange={handleOpen}
          handleSubmit={(e) => {
            e.preventDefault();
            updateEvent(queryPoint);
          }}
        >
          <InputField
            type="text"
            labelText="Pavadinimas"
            defaultValue={queryPoint.PAVADINIMAS}
            handleChange={(e) => {
              setQueryPoint({
                ...queryPoint,
                PAVADINIMAS: e.target.value,
              });
            }}
          />
          <InputField
            type="text"
            labelText="Organizatorius"
            defaultValue={queryPoint.ORGANIZATORIUS}
            handleChange={(e) => {
              setQueryPoint({
                ...queryPoint,
                ORGANIZATORIUS: e.target.value,
              });
            }}
          />
          <InputField
            type="longtext"
            labelText="Pastabos"
            defaultValue={queryPoint.PASTABOS}
            handleChange={(e) => {
              setQueryPoint({
                ...queryPoint,
                PASTABOS: e.target.value,
              });
            }}
          />
          <SingleDatePicker
            timeTitle="Pradžios laikas"
            dateTitle="Pradžios data"
            selected={queryPoint.RENGINIO_PRADZIA}
            handleChange={(date, e) => {
              console.log("data: " + date);
              setQueryPoint({
                ...queryPoint,
                RENGINIO_PRADZIA: date,
              });
            }}
          />
          <SingleDatePicker
            timeTitle="Pabaigos laikas"
            dateTitle="Pabaigos data"
            selected={queryPoint.RENGINIO_PABAIGA}
            handleChange={(date) => {
              setQueryPoint({
                ...queryPoint,
                RENGINIO_PABAIGA: date,
              });
            }}
          />
          <InputField
            type="text"
            labelText="Renginio puslapis"
            defaultValue={queryPoint.WEBPAGE}
            handleChange={(e) => {
              setQueryPoint({
                ...queryPoint,
                WEBPAGE: e.target.value,
              });
            }}
          />
        </EventCard>
      )}
    </div>
  );
}

export default Map;
