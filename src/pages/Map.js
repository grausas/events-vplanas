import React, { useRef, useEffect, useState } from "react";

// Styles
import "./Map.css";
// Hooks
import { useOpenClose } from "../hooks/useOpenClose";
// esri modules
import * as watchUtils from "@arcgis/core/core/watchUtils";

// Components
import {
  EventCard,
  EventsSchedule,
  InputField,
  AddEvent,
  SearchInput,
  Filter,
  DatePicker as SingleDatePicker,
  Loading,
  Notification,
} from "../components/index.js";
// utils
import { CategoryData } from "../utils/CategoryData";

// helpers
import { createMapView } from "../helpers/Map";
import { featureLayer, vectorLayer } from "../helpers/Layers";
import { addEventsFeature } from "../helpers/AddEvent";
import { updateEventFeature } from "../helpers/EditEvent";
import { drawNewPolygon, graphicsLayer } from "../helpers/DrawPolygon";
import { updatePolygon } from "../helpers/UpdatePolygon";
import { changeTime, changeDate } from "../helpers/DateChange";
import { deleteFeatureEvent } from "../helpers/DeleteEvent";

function Map() {
  const mapRef = useRef(null);

  const [data, setData] = useState([]);
  const [queryPoint, setQueryPoint] = useState([]);
  const [addNewFeature, setAddNewFeature] = useState([]);
  const [view, setView] = useState("");
  const [eventsFeatureLayer, setEventsFeatureLayer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [error, setError] = useState();
  const [type, setType] = useState();
  console.log("error state", error);
  console.log("type state", type);

  const { handleOpen, show } = useOpenClose();

  const handleZoom = (e) => {
    const eventId = e;

    eventsFeatureLayer.queryFeatures().then(function (results) {
      const features = results.features;
      view.goTo(
        {
          target: features.filter(
            (item) => item.attributes.OBJECTID === Number(eventId)
          ),
          zoom: 14,
        },
        { duration: 1000 }
      );
    });
  };

  // filtravimas pagal kategoriją ir datą
  // pabandyti sudėti input value į state array su prevValue ir tada paiimti tą state ir filtruoti, kai unchekini
  let valuesArr = [];

  useEffect(() => {
    if (startDate && finishDate) {
      view.whenLayerView(eventsFeatureLayer).then((layerView) => {
        layerView.filter = {
          where:
            startDate && finishDate
              ? "RENGINIO_PRADZIA >= " +
                startDate +
                " AND RENGINIO_PRADZIA <= " +
                finishDate
              : null,
        };
      });
    }
  }, [startDate, finishDate, view, eventsFeatureLayer]);

  const handleFilterChange = (e) => {
    var itemValue = Number(e.target.value);
    var isChecked = e.target.checked;
    const optionId = e.target;
    console.log(optionId);
    let newArr = [];
    if (isChecked && itemValue !== 0) {
      // setCheckBoxes((prevState) => ({
      //   checkBoxes: {
      //     ...prevState.checkBoxes,
      //     [optionId.id]: !prevState.checkBoxes[optionId.id],
      //   },
      // }));
      valuesArr.push(itemValue);
      const values = valuesArr.map((el) => el);
      console.log("values", values);

      view.whenLayerView(eventsFeatureLayer).then((layerView) => {
        for (let i = 0; i < values.length; i++) {
          newArr.push(values[i]);
        }
        const newArrStr = newArr.join();

        layerView.filter = {
          where:
            startDate && finishDate
              ? "KATEGORIJA IN (" +
                newArrStr +
                ") AND " +
                "RENGINIO_PRADZIA >= " +
                startDate +
                " AND RENGINIO_PRADZIA <= " +
                finishDate
              : "KATEGORIJA IN (" + newArrStr + ")",
        };
      });
    } else if (!isChecked && valuesArr.length > 0) {
      console.log("itemvalue", itemValue);
      const index = valuesArr.indexOf(itemValue);
      if (index > -1) {
        valuesArr.splice(index, 1);
      }

      const values = valuesArr.map((el) => el);

      view.whenLayerView(eventsFeatureLayer).then((layerView) => {
        for (let i = 0; i < values.length; i++) {
          newArr.push(values[i]);
        }
        const newArrStr = newArr.join();
        layerView.filter = {
          where:
            startDate && finishDate && valuesArr.length > 0
              ? "KATEGORIJA IN (" +
                newArrStr +
                ") AND " +
                "RENGINIO_PRADZIA >= " +
                startDate +
                " AND RENGINIO_PRADZIA <= " +
                finishDate
              : startDate && finishDate && valuesArr.length === 0
              ? "RENGINIO_PRADZIA >= " +
                startDate +
                " AND RENGINIO_PRADZIA <= " +
                finishDate
              : valuesArr.length > 0 && !startDate && !finishDate
              ? "KATEGORIJA IN (" + newArrStr + ")"
              : null,
        };
      });
    } else if (itemValue === 0) {
      console.log("e", e);
      view.whenLayerView(eventsFeatureLayer).then((layerView) => {
        layerView.filter = {
          where: "1=1",
        };
      });
      setStartDate("");
      setFinishDate("");
      valuesArr = [];
    }
  };

  // clear filter
  const handleClearFilter = (checkbox) => {
    // console.log("hello", checkbox);
    // valuesArr = [];
    for (var a = 0; a < valuesArr.length; a++) {
      console.log(valuesArr[a]);
      valuesArr[a] = [];
    }
    view.whenLayerView(eventsFeatureLayer).then((layerView) => {
      layerView.filter = {
        where: "1=1",
      };
    });
    setStartDate("");
    setFinishDate("");
  };

  // Event modal open

  // paieška renginių juostoje
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

  const addEvents = () =>
    addEventsFeature(
      addNewFeature,
      eventsFeatureLayer,
      setAddNewFeature,
      setType,
      setError
    );
  const updateEvent = () => updateEventFeature(queryPoint, eventsFeatureLayer);
  const addPolygon = () =>
    drawNewPolygon(view, addNewFeature, setAddNewFeature);
  const updateCurrentPolygon = () =>
    updatePolygon(view, addNewFeature, setAddNewFeature);
  const deleteEvent = () => deleteFeatureEvent(eventsFeatureLayer, queryPoint);

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
    const vector = vectorLayer();

    const view = createMapView(mapRef.current, vector, layer);

    setEventsFeatureLayer(layer);
    setView(view);

    layer
      .queryFeatures({
        where: ["1=1"],
        outFields: ["*"],
      })
      .then((res) => {
        setData(res.features);
      });

    // renginio popup atvaizdavimas
    view.on("click", function (event) {
      // view.hitTest(event, { include: layer }).then(function (response) {
      //   // laikinas fix, kad paspaudus ant map, bet kurioje vietoje nemestų error
      //   if (response.results.length === 1) {
      //     const graphic = response.results.filter(function (result) {
      //       // check if the graphic belongs to the layer of interest
      //       // console.log("results", result.graphic.layer);
      //       return result.graphic.layer === layer;
      //     })[0].graphic.attributes;
      //     setQueryPoint(graphic);
      //     handleOpen(show);
      //   } else {
      //     return null;
      //   }
      // });
      //-------------------- query multiple objects in same place
      // console.log(event);
      let query = layer.createQuery();
      // console.log(view.toMap(event));
      query.geometry = view.toMap(event);
      query.outFields = ["*"];

      layer.queryFeatures(query).then(function (response) {
        console.log("response", response);
        if (response.features.length > 0) {
          const graphics = response.features[0].attributes;
          console.log("response", response.features[0].attributes);
          setQueryPoint(graphics);
          handleOpen(show);
        }
      });
    });

    // rodo loading kol neužsikrautas view, reikia pataisymo
    watchUtils.whenFalse(view, "updating", function (evt) {
      const loader = document.getElementById("loading");
      loader.style.display = "none";
    });

    return () => {
      view && view.destroy();
    };
  }, []);

  const startEventDate = changeDate(new Date(queryPoint.RENGINIO_PRADZIA));
  const finishEventDate = changeDate(new Date(queryPoint.RENGINIO_PABAIGA));
  const startEventTime = changeTime(new Date(queryPoint.RENGINIO_PRADZIA));
  const finishEventTime = changeTime(new Date(queryPoint.RENGINIO_PABAIGA));

  return (
    <>
      <div className="mapDiv" ref={mapRef}>
        {error && <Notification type={type} message={error} />}
        <Loading id="loading" />
        <EventsSchedule events={shortResults} handleZoom={handleZoom}>
          <SearchInput
            value={searchTerm}
            handleChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            placeholder="Ieškoti..."
          />
        </EventsSchedule>
        {/* Filtravimas pagal data ir kategorijas */}
        <Filter
          id="filtras"
          data={CategoryData}
          selectedStart={startDate}
          selectedFinish={finishDate}
          handleChangeStart={(date) =>
            setStartDate(new Date(date.setHours(0, 0, 0, 0)).getTime())
          }
          handleChangeFinish={(date) =>
            setFinishDate(new Date(date.setHours(23, 59, 59, 59)).getTime())
          }
          onChange={handleFilterChange}
          handleClear={handleClearFilter}
        />
        {/* Pridėti naują renginį  */}
        {console.log("data", data)}
        <AddEvent
          isEditing={!isEditing}
          buttonText="Pridėti renginį"
          titleText="Pridėti renginį"
          buttonTitleCancel="Atšaukti"
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
            setAddNewFeature([]);
            setIsEditing(!isEditing);
          }}
          handleCancel={() => {
            graphicsLayer.removeAll();
            // setIsEditing(!isEditing);
            setAddNewFeature([]);
            console.log(graphicsLayer);
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
            options={CategoryData}
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
            required
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
            required
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
            handleDelete={(e) => {
              e.preventDefault();
              deleteEvent(queryPoint.OBJECTID);
              console.log(e.target);
              handleOpen(!show);
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
              options={CategoryData}
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
            <InputField
              type="longtext"
              labelText="Aprašymas"
              defaultValue={queryPoint.APRASYMAS}
              handleChange={(e) => {
                setQueryPoint({
                  ...queryPoint,
                  APRASYMAS: e.target.value,
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
    </>
  );
}

export default Map;
