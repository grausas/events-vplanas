import React, { useRef, useEffect, useState } from "react";

// Styles
import "./Map.css";
// Hooks
import { useOpenClose } from "../hooks/useOpenClose";
import { useOpenCloseModal } from "../hooks/openModal";
// esri modules
import * as watchUtils from "@arcgis/core/core/watchUtils";
import * as locator from "@arcgis/core/rest/locator";
import Graphic from "@arcgis/core/Graphic";

// Components
import {
  EventCard,
  EventsSchedule,
  AddEvent,
  EditEvent,
  SearchInput,
  Filter,
  Loading,
  Notification,
  Zoom,
  Home,
  EventsTimeline,
  ConfirmModal,
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
import { handleZoom, zoomIn, zoomOut, zoomDefault } from "../helpers/Zooms";

function Map() {
  const mapRef = useRef(null);
  // states
  const [data, setData] = useState([]);
  const [queryPoint, setQueryPoint] = useState([]);
  const [addNewFeature, setAddNewFeature] = useState([]);
  const [view, setView] = useState("");
  const [eventsFeatureLayer, setEventsFeatureLayer] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("");
  const [shortResults, setShortResults] = useState("");
  const [clickedEvents, setClickedEvents] = useState([]);

  const { handleOpen, show } = useOpenClose();
  const { handleOpenModal, openModal } = useOpenCloseModal();

  // global search
  // pabandyti ieskoti pagal attributes o ne pagal address
  // panaudoti searchViewModel
  // ismesti pasirinkimus su suggest i dropdown

  const locatorUrl =
    "https://gis.vplanas.lt/arcgis/rest/services/Lokatoriai/PAIESKA_COMPOSITE/GeocodeServer";

  const handleSearchResult = (e) => {
    const result = e.target.value;

    var address = {
      SingleLine: result,
      f: "json",
    };

    const params = {
      address: address,
      outFields: ["*"],
      text: result,
    };

    // locator.suggestLocations(locatorUrl, params).then(function (response) {
    //   console.log(typeof params.address);
    //   console.log("response", response);
    //   // const address = response.filter((item) =>
    //   //   item.address.toLocaleLowerCase().includes(result.toLocaleLowerCase())
    //   // );
    //   // console.log("address", address);
    // });
    locator.addressToLocations(locatorUrl, params).then(function (results) {
      console.log("addressToLocations for Madrid=", results);
      if (results.length > 0) {
        console.log(results);
        let point = {
          type: "point",
          x: 581869.375771,
          y: 6066568.205726,
          spatialReference: { wkid: 2600 },
        };

        let g = new Graphic({
          geometry: point,
          symbol: {
            type: "simple-marker",
            size: 7,
            color: [111, 111, 111],
          },
        });

        view.graphics.add(g);
        // reikai pakisti wkid, kad centruotų
        view.center = point;
        view.zoom = 12;

        // view.goTo(
        //   {
        //     target: g,
        //     // target: results,
        //     zoom: 12,
        //   },
        //   { duration: 1000 }
        // );
      }
    });
  };

  // ------------------

  // open event
  const openEvent = (event) => {
    const filterResult = clickedEvents.filter(
      (item) => item.attributes.OBJECTID === event
    );
    setQueryPoint(filterResult[0].attributes);
    handleOpen(!show);
    handleOpenModal(openModal);
  };

  // clear error state after some time
  useEffect(() => {
    const timeId = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [error]);

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
    // valuesArr = [];
    for (var a = 0; a < valuesArr.length; a++) {
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

  // paieška renginių juostoje
  useEffect(() => {
    if (data.features) {
      const results = !searchTerm
        ? data.features
        : data.features.filter(
            (item) =>
              item.attributes.PAVADINIMAS &&
              item.attributes.PAVADINIMAS.toLowerCase().includes(
                searchTerm.toLocaleLowerCase()
              )
          );

      setShortResults(
        results.slice(0).sort((a, b) => {
          const x = a.attributes.RENGINIO_PRADZIA;
          const y = b.attributes.RENGINIO_PRADZIA;
          return x < y ? -1 : x > y ? 1 : 0;
        })
      );
    }
  }, [data, searchTerm]);

  const addEvents = () =>
    addEventsFeature(
      addNewFeature,
      eventsFeatureLayer,
      setAddNewFeature,
      setType,
      setError
    );
  const updateEvent = () =>
    updateEventFeature(queryPoint, eventsFeatureLayer, setType, setError);
  const addPolygon = () =>
    drawNewPolygon(view, addNewFeature, setAddNewFeature, eventsFeatureLayer);
  const updateCurrentPolygon = () =>
    updatePolygon(view, addNewFeature, setAddNewFeature);
  const deleteEvent = () =>
    deleteFeatureEvent(eventsFeatureLayer, queryPoint, setType, setError);

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
        // where: [
        //   "RENGINIO_PRADZIA > date'" +
        //     new Date().toISOString().slice(0, 10) +
        //     "'",
        // ],
        where: ["1=1"],
        outFields: ["*"],
      })
      .then((res) => {
        setData(res);
      });

    // renginio popup atvaizdavimas
    view.on("click", function (event) {
      // view.hitTest(event, { include: layer }).then(function (response) {
      //   // laikinas fix, kad paspaudus ant map, bet kurioje vietoje nemestų error
      //   if (response.results.length === 1) {
      //     const graphic = response.results.filter(function (result) {
      //       // check if the graphic belongs to the layer of interest
      //       return result.graphic.layer === layer;
      //     })[0].graphic.attributes;
      //     setQueryPoint(graphic);
      //     handleOpen(show);
      //   } else {
      //     return null;
      //   }
      // });
      //-------------------- query multiple objects in same place
      let query = layer.createQuery();
      query.geometry = view.toMap(event);
      query.outFields = ["*"];

      layer.queryFeatures(query).then(function (response) {
        if (response.features.length > 0) {
          setClickedEvents(response.features);
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
      {error && <Notification type={type} message={error} />}

      <div className="mapDiv" ref={mapRef}>
        {/* <input
          type="text"
          placeholder="paieska"
          onChange={handleSearchResult}
        ></input> */}

        <Loading id="loading" />

        <Home handleClick={() => zoomDefault(view)} />
        <Zoom
          handleZoomIn={() => zoomIn(view)}
          handleZoomOut={() => zoomOut(view)}
        />
        {/* Renginių juosta */}
        <EventsSchedule
          events={shortResults}
          handleZoom={(e) => handleZoom(e, eventsFeatureLayer, view)}
        >
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
        <AddEvent
          setAddNewFeature={setAddNewFeature}
          addNewFeature={addNewFeature}
          isEditing={!isEditing}
          startDate={startDate}
          events={data}
          handleCordinates={() => {
            // eventsFeatureLayer.opacity = 0.3;
            addNewFeature.geometry === undefined
              ? addPolygon()
              : setIsEditing(!isEditing);
          }}
          handleUpdate={() => {
            updateCurrentPolygon();
            setIsEditing(!isEditing);
          }}
          handleSubmit={(e) => {
            eventsFeatureLayer.opacity = 1;
            e.preventDefault();
            addEvents(addNewFeature);
            setAddNewFeature([]);
            setIsEditing(!isEditing);
          }}
          handleCancel={() => {
            eventsFeatureLayer.opacity = 1;
            graphicsLayer.removeAll();
            // setIsEditing(!isEditing);
            setAddNewFeature([]);
          }}
        />
        {/* Renginių ir renginio atvaizdavimas, redagavimas */}

        {show && (
          <EventsTimeline
            events={clickedEvents}
            handleClose={handleOpen}
            handleEventOpen={openEvent}
          />
        )}
        {openModal && (
          <EventCard
            organization={queryPoint.ORGANIZATORIUS}
            title={queryPoint.PAVADINIMAS}
            url={queryPoint.WEBPAGE}
            comment={queryPoint.PASTABOS}
            description={queryPoint.APRASYMAS}
            startDate={startEventDate + " | " + startEventTime}
            finishDate={finishEventDate + " | " + finishEventTime}
            handleChange={() => {
              handleOpenModal();
              handleOpen(show);
            }}
          >
            <EditEvent
              setQueryPoint={setQueryPoint}
              queryPoint={queryPoint}
              handleChange={() => {
                handleOpenModal();
                handleOpen(show);
              }}
              handleSubmit={(e) => {
                e.preventDefault();
                updateEvent(queryPoint);
                handleOpenModal(!openModal);
              }}
              handleDeleteConfirm={(e) => {
                deleteEvent(queryPoint.OBJECTID);
                handleOpenModal(!openModal);
              }}
            />
          </EventCard>
        )}
      </div>
    </>
  );
}

export default Map;
