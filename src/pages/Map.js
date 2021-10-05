import { useRef, useEffect, useState } from "react";

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
import { createMapView } from "../utils/Map";
import { featureLayer, tileLayer } from "../utils/Layers";

function Map() {
  const mapRef = useRef(null);

  const [data, setData] = useState([]);
  const [queryPoint, setQueryPoint] = useState([]);
  const [addNewFeature, setAddNewFeature] = useState([]);
  const [view, setView] = useState();
  const [layer, setLayer] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  // Event modal open
  const { handleOpen, show } = useOpenClose();

  const results = !searchTerm
    ? data
    : data.filter((item) =>
        item.attributes.USER_Vieta.toLowerCase().includes(
          searchTerm.toLocaleLowerCase()
        )
      );

  const updateFeature = () => {
    const editFeature = new Graphic({
      attributes: {
        OBJECTID: `${queryPoint.OBJECTID}`,
        PAVADINIMAS: `${queryPoint.PAVADINIMAS}`,
        ORGANIZATORIUS: `${queryPoint.ORGANIZATORIUS}`,
        RENGINIO_PRADZIA: `${queryPoint.RENGINIO_PRADZIA}`,
      },
    });
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

  const addFeature = () => {
    const addFeature = new Graphic({
      attributes: {
        USER_PAVADINIMAS: `${addNewFeature.USER_PAVADINIMAS}`,
        USER_ORGANIZATORIAI: `${addNewFeature.USER_ORGANIZATORIAI}`,
        USER_Vieta: `${addNewFeature.USER_Vieta}`,
      },
    });
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

    console.log(data);

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

  // const tryDate = new Date(queryPoint.USER_RENGINIO_DATA).getTime();
  // console.log(new Date(tryDate));
  // console.log(queryPoint.USER_RENGINIO_DATA);

  const newDate = new Date(queryPoint.RENGINIO_PRADZIA);
  // console.log(newDate);
  const time = pad(newDate.getHours(), 2) + ":" + pad(newDate.getMinutes(), 2);
  const date =
    newDate.getFullYear() +
    "-" +
    pad(newDate.getMonth() + 1, 2) +
    "-" +
    pad(newDate.getDate(), 2);

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
          addFeature(addNewFeature);
        }}
      >
        <InputField
          type="text"
          labelText="Pavadinimas"
          required
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              USER_PAVADINIMAS: e.target.value,
            });
          }}
        />
        <InputField
          type="text"
          labelText="Organizatorius"
          required
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              USER_ORGANIZATORIAI: e.target.value,
            });
          }}
        />
        <InputField
          type="text"
          labelText="Vieta"
          id="vieta"
          required
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              USER_Vieta: e.target.value,
            });
          }}
        />
        <InputField
          type="date"
          labelText="Pradžios data"
          id="data"
          required
          handleChange={(e) => {
            setAddNewFeature({
              ...addNewFeature,
              RENGINIO_PRADZIA: e.target.value,
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
          date={date}
          time={time}
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
          <InputField
            type="datetime-local"
            defaultValue={date + time}
            handleChange={(e) => {
              console.log({
                ...queryPoint,
                RENGINIO_PRADZIA: new Date(e.target.value).toLocaleString(
                  "lt-LT",
                  {
                    timeZone: "Etc/GMT-0",
                  }
                ),
              });
              setQueryPoint({
                ...queryPoint,
                RENGINIO_PRADZIA: new Date(e.target.value).toLocaleString(
                  "lt-LT",
                  {
                    timeZone: "Etc/GMT-0",
                  }
                ),
              });
            }}
            labelText="Data"
          />
          {/* <InputField
            type="text"
            defaultValue={time}
            handleChange={(e) => {
              console.log({
                ...queryPoint,
                USER_RENGINIO_DATA: e.target.value,
              });
              setQueryPoint({
                ...queryPoint,
                USER_RENGINIO_DATA: e.target.value,
              });
            }}
            labelText="Laikas"
          /> */}
        </EventCard>
      )}
      {/* {console.log(new Date(queryPoint.USER_RENGINIO_DATA) + " nauja data")} */}
    </div>
  );
}

export default Map;
