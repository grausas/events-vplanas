import { useRef, useEffect, useState } from "react";

// Styles
import "./Map.css";
// Hooks
import { useOpenClose } from "../hooks/useOpenClose";

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
import { drawNewPolygon } from "../helpers/DrawPolygon";
import { updatePolygon } from "../helpers/UpdatePolygon";

function Map() {
  const mapRef = useRef(null);

  const [data, setData] = useState([]);
  const [queryPoint, setQueryPoint] = useState([]);
  const [addNewFeature, setAddNewFeature] = useState([]);
  const [view, setView] = useState();
  const [layer, setLayer] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
  const addPolygon = () =>
    drawNewPolygon(view, addNewFeature, setAddNewFeature);
  const updateCurrentPolygon = () => updatePolygon(view);

  // atidaryti pilną formą, jeigu yra kordinatės, reikia pataisyti
  useEffect(() => {
    if (addNewFeature.geometry === undefined) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [addNewFeature.geometry]);

  useEffect(() => {
    const layer = featureLayer();
    const tile = tileLayer();
    const vector = vectorLayer();

    // console.log(vector);

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

      {/* Pridėti naują renginį  */}
      <AddEvent
        isEditing={!isEditing}
        buttonText="Pridėti renginį"
        titleText="Pridėti renginį"
        buttonTitle={
          addNewFeature.geometry === undefined ? "Pridėti objektą" : "Pildyti"
        }
        spanText={
          addNewFeature.geometry === undefined
            ? "Pasirinkite pridėti objektą"
            : "Užpildykite objekto duomenis"
        }
        handleCordinates={() => {
          addNewFeature.geometry === undefined
            ? addPolygon()
            : setIsEditing(!isEditing);
        }}
        handleUpdate={() => {
          updateCurrentPolygon();
          setIsEditing(!isEditing);
        }}
        handleSubmit={(e) => {
          e.preventDefault();
          addEvents(addNewFeature);
          setAddNewFeature("");
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
          options={[
            { id: 1, value: 1, text: "Susitikimas" },
            { id: 2, value: 2, text: "Festivalis" },
            { id: 3, value: 3, text: "Viešas renginys" },
            { id: 4, value: 4, text: "Filmavimas" },
            { id: 5, value: 5, text: "Mugė" },
          ]}
          type="dropdown"
          labelText="Kategorija"
          id="kategorija"
          placeholder="Kategorija"
          required
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              KATEGORIJA: e.target.value,
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
              : startDate
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
              : startDate
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
          // category={category}
          url={queryPoint.WEBPAGE}
          comment={queryPoint.PASTABOS}
          description={queryPoint.APRASYMAS}
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
            type="dropdown"
            options={[
              { id: 1, value: 1, text: "Susitikimas" },
              { id: 2, value: 2, text: "Festivalis" },
              { id: 3, value: 3, text: "Viešas renginys" },
              { id: 4, value: 4, text: "Filmavimas" },
              { id: 5, value: 5, text: "Mugė" },
            ]}
            labelText="Kategorija"
            defaultValue={queryPoint.KATEGORIJA}
            handleChange={(e) => {
              setQueryPoint({
                ...queryPoint,
                KATEGORIJA: e.target.value,
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
