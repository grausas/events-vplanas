import { useRef, useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Styles
import "./Map.css";
// Modules
import Graphic from "@arcgis/core/Graphic";
// Hooks
import { useOpenClose } from "../hooks/useOpenClose";

// Components
import EventCard from "../components/EventCard/EventCard";
import EventsSchedule from "../components/EventsSchedule/EventsSchedule";
import SearchInput from "../components/SearchInput/SearchInput";
import Filter from "../components/Filter/Filter";
import AddFeature from "../components/AddFeature/AddFeature";
import InputField from "../components/InputField/InputField";

// utils
import { createMapView } from "../helpers/Map";
import { featureLayer, tileLayer } from "../helpers/Layers";

function Map() {
  const mapRef = useRef(null);

  const [data, setData] = useState([]);
  const [queryPoint, setQueryPoint] = useState([]);
  const [addNewFeature, setAddNewFeature] = useState([]);
  const [view, setView] = useState();
  const [layer, setLayer] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const [startDate, setStartDate] = useState(new Date());

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

  const updateFeature = () => {
    const editFeature = new Graphic({
      attributes: {
        OBJECTID: `${queryPoint.OBJECTID}`,
        GlobalID: `${queryPoint.GlobalID}`,
        PAVADINIMAS: `${queryPoint.PAVADINIMAS}`,
        ORGANIZATORIUS: `${queryPoint.ORGANIZATORIUS}`,
        RENGINIO_PRADZIA: `${new Date(
          queryPoint.RENGINIO_PRADZIA
        ).toISOString()}`,
        RENGINIO_PABAIGA: `${new Date(
          queryPoint.RENGINIO_PABAIGA
        ).toISOString()}`,
      },
    });
    console.log(editFeature.attributes.RENGINIO_PRADZIA);
    const edits = {
      updateFeatures: [editFeature],
    };

    layer
      .applyEdits(edits)
      .then((editResults) => {
        console.log("edit results: ", editResults);
      })
      .catch((error) => {
        console.error("Editing error: ", error);
      });
  };

  const addEventsFeature = () => {
    const addFeature = new Graphic({
      attributes: {
        PAVADINIMAS: `${addNewFeature.PAVADINIMAS}`,
        ORGANIZATORIUS: `${addNewFeature.ORGANIZATORIUS}`,
        RENGINIO_PRADZIA: `${new Date(
          addNewFeature.RENGINIO_PRADZIA
        ).toISOString()}`,
        PASTABOS: `${addNewFeature.PASTABOS}`,
      },
    });
    console.log(addFeature.attributes);

    const add = {
      addFeatures: [addFeature],
    };

    layer
      .applyEdits(add)
      .then((editResults) => {
        console.log("edit results: ", editResults);
      })
      .catch((error) => {
        console.error("Editing error: ", error);
      });
  };

  useEffect(() => {
    const layer = featureLayer();
    const tile = tileLayer();
    const view = createMapView(mapRef.current, tile, layer);

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
        if (response.results.length) {
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
        {results.length ? (
          results
            .map((items) => {
              const item = items.attributes;
              const newDate = new Date(item.RENGINIO_PRADZIA);
              const time =
                pad(newDate.getHours(), 2) + ":" + pad(newDate.getMinutes(), 2);
              const date =
                newDate.getFullYear() +
                "-" +
                pad(newDate.getMonth() + 1, 2) +
                "-" +
                pad(newDate.getDate(), 2);

              return (
                <div key={item.OBJECTID}>
                  <p>
                    {date} | {time}
                  </p>
                  <p>{item.PAVADINIMAS}</p>
                  <p>{item.ORGANIZATORIUS}</p>
                </div>
              );
            })
            .slice()
            .sort((a, b) => (b.date > a.date ? 1 : -1))
        ) : (
          <span>Loading...</span>
        )}
      </EventsSchedule>
      <Filter />

      {/* Pridėti naują renginį */}
      <AddFeature
        buttonText="Pridėti"
        titleText="Pridėti renginį"
        handleSubmit={(e) => {
          e.preventDefault();
          addEventsFeature(addNewFeature);
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
        <DatePicker
          imeInputLabel="Time:"
          timeFormat="HH:mm"
          timeIntervals={1}
          dateFormat="yyyy/MM/dd hh:mm"
          showTimeSelect
          selected={startDate ? new Date(startDate) : null}
          onChange={(date) => {
            console.log({
              ...addNewFeature,
              RENGINIO_PRADZIA: date,
            });
            setAddNewFeature({
              ...addNewFeature,
              RENGINIO_PRADZIA: date,
            });
          }}
        />
      </AddFeature>

      {/* Renginys ir jo editinimas */}
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
            updateFeature(queryPoint);
          }}
        >
          <InputField
            type="text"
            defaultValue={queryPoint.PAVADINIMAS}
            handleChange={(e) => {
              setQueryPoint({
                ...queryPoint,
                PAVADINIMAS: e.target.value,
              });
            }}
            labelText="Pavadinimas"
          />
          <InputField
            type="text"
            defaultValue={queryPoint.ORGANIZATORIUS}
            handleChange={(e) => {
              console.log({
                ...queryPoint,
                ORGANIZATORIUS: e.target.value,
              });
              setQueryPoint({
                ...queryPoint,
                ORGANIZATORIUS: e.target.value,
              });
            }}
            labelText="Organizatorius"
          />

          <DatePicker
            imeInputLabel="Time:"
            timeFormat="HH:mm"
            timeIntervals={1}
            dateFormat="yyyy/MM/dd HH:mm"
            showTimeSelect
            selected={queryPoint.RENGINIO_PRADZIA}
            onChange={(date) => {
              setQueryPoint({
                ...queryPoint,
                RENGINIO_PRADZIA: date,
              });
            }}
          />
          <DatePicker
            imeInputLabel="Time:"
            timeFormat="HH:mm"
            timeIntervals={1}
            dateFormat="yyyy/MM/dd HH:mm"
            showTimeSelect
            label="pradzoa"
            selected={queryPoint.RENGINIO_PABAIGA}
            onChange={(date) => {
              setQueryPoint({
                ...queryPoint,
                RENGINIO_PABAIGA: date,
              });
            }}
          />
        </EventCard>
      )}
    </div>
  );
}

export default Map;
