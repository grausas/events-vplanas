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
        ObjectID: `${queryPoint.ObjectID}`,
        USER_PAVADINIMAS: `${queryPoint.USER_PAVADINIMAS}`,
        // USER_Vieta: `${fieldValues.vieta}`,
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
        ObjectID: `${queryPoint.ObjectID}`,
        USER_PAVADINIMAS: `${queryPoint.USER_PAVADINIMAS}`,
        // USER_Vieta: `${fieldValues.vieta}`,
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

  const newDate = new Date(queryPoint.USER_RENGINIO_DATA);
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
              const newDate = new Date(item.USER_RENGINIO_DATA);
              const time =
                pad(newDate.getHours(), 2) + ":" + pad(newDate.getMinutes(), 2);
              const date =
                newDate.getFullYear() +
                "-" +
                pad(newDate.getMonth() + 1, 2) +
                "-" +
                pad(newDate.getDate(), 2);
              return (
                <div key={item.ObjectID}>
                  <p>
                    {date} | {time}
                  </p>
                  <p>{item.USER_PAVADINIMAS}</p>
                  <p>{item.USER_Vieta}</p>
                </div>
              );
            })

            .slice()
            .sort((a, b) => b.date > a.date)
        ) : (
          <span>Loading...</span>
        )}
      </EventsSchedule>
      <Filter />
      {console.log(queryPoint)}
      {show && (
        <EventCard
          organization={queryPoint.USER_ORGANIZATORIAI}
          title={queryPoint.USER_PAVADINIMAS}
          place={queryPoint.USER_Vieta}
          date={date}
          time={time}
          defaultValue={queryPoint.USER_PAVADINIMAS}
          handleChange={handleOpen}
          handleSubmit={(e) => {
            e.preventDefault();
            updateFeature(queryPoint);
          }}
          handleInput={(e) => {
            setQueryPoint({
              ...queryPoint,
              USER_PAVADINIMAS: e.target.value,
            });
          }}
        />
      )}
      <AddFeature
        buttonText="Pridėti"
        titleText="Pridėti renginį"
        handleSubmit={(e) => {
          e.preventDefault();
          addFeature(queryPoint);
        }}
      >
        <InputField
          type="text"
          placeholder="Pavadinimas"
          labelText="Pavadinimas"
          handleChange={(e) => {
            setQueryPoint({
              ...queryPoint,
              USER_PAVADINIMAS: e.target.value,
            });
          }}
        />
      </AddFeature>
    </div>
  );
}

export default Map;
