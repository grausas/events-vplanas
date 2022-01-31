import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
// Styles
// import "./Map.style.js";
import { MapDiv, SearchDiv, Content } from "./Map.style";
// context
import { AuthContext } from "../context/AuthContext";
// Hooks
import { useOpenClose } from "../hooks/useOpenClose";
import { useOpenCloseModal } from "../hooks/openModal";
import { useOpenCloseFilter } from "../hooks/OpenFilter";
// esri modules
import * as watchUtils from "@arcgis/core/core/watchUtils";
import * as locator from "@arcgis/core/rest/locator";
import Graphic from "@arcgis/core/Graphic";
import * as GeometryService from "@arcgis/core/rest/geometryService";
import ProjectParameters from "@arcgis/core/rest/support/ProjectParameters";
import Point from "@arcgis/core/geometry/Point";
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import esriId from "@arcgis/core/identity/IdentityManager";
import Search from "@arcgis/core/widgets/Search";

// locale
import * as intl from "@arcgis/core/intl";

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
  DateSlider,
  BasemapSwitch,
} from "../components/index.js";
// utils
import { CategoryData } from "../utils/CategoryData";

// helpers
import { createMapView, handleChangeBasemap } from "../helpers/Map";
import {
  featureLayer,
  tileLayer,
  vectorLayer,
  featureLayerPrivate,
} from "../helpers/Layers";
import { addEventsFeature } from "../helpers/AddEvent";
import { updateEventFeature } from "../helpers/EditEvent";
import { drawNewPolygon, graphicsLayer } from "../helpers/DrawPolygon";
import { updatePolygon } from "../helpers/UpdatePolygon";
import { changeTime, changeDate } from "../helpers/DateChange";
import { deleteFeatureEvent } from "../helpers/DeleteEvent";
import { handleZoom, zoomIn, zoomOut, zoomDefault } from "../helpers/Zooms";

function Map() {
  const auth = useContext(AuthContext);
  const mapRef = useRef(null);
  intl.setLocale("lt");

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
  const [suggestions, setSuggestions] = useState([]);
  const [valuesArr, setValuesArr] = useState([]);

  const { handleOpen, show } = useOpenClose();
  const { handleOpenModal, openModal } = useOpenCloseModal();
  const { handleOpenFilter, showFilter } = useOpenCloseFilter();

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
      outSpatialReference: { wkid: 102100 },
    };

    if (result.length > 1) {
      locator.suggestLocations(locatorUrl, params).then(function (response) {
        console.log(typeof params.address);
        console.log("response", response);
        const address = response.filter((item) => item.text.includes(result));
        console.log("address", address);
        console.log(address);
        setSuggestions(response);
      });
    }

    if (e.key === "Enter") {
      locator.addressToLocations(locatorUrl, params).then(function (results) {
        console.log("addressToLocations Vilnius=", results);
        if (results.length > 0) {
          const grapics = results[0].location;

          var point = new Point({
            type: "point",
            x: grapics.x,
            y: grapics.y,
            spatialReference: { wkid: 102100 },
          });

          var simpleMarkerSymbol = {
            type: "simple-marker",
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 1,
            },
          };

          var geomSer =
            "https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Utilities/Geometry/GeometryServer";

          var params = new ProjectParameters({
            geometries: [point],
            outSpatialReference: { wkid: 102100 },
          });

          GeometryService.project(geomSer, params).then(function (geom) {
            // console.log("geom", geom);
            var pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
            });

            // console.log("phichLayre", graphicsLayer.graphics.items.length);

            if (graphicsLayer.graphics.items.length > 0) {
              graphicsLayer.removeAll();
              graphicsLayer.add(pointGraphic);
              // console.log("pointGraphic", pointGraphic);
              // console.log("center", (view.center = pointGraphic.geometry));

              view.goTo(
                {
                  target: pointGraphic,
                  zoom: 16,
                },
                { duration: 1000 }
              );
            } else {
              graphicsLayer.add(pointGraphic);
              // console.log("pointGraphic", pointGraphic);
              // console.log("center", (view.center = pointGraphic.geometry));

              view.goTo(
                {
                  target: pointGraphic,
                  zoom: 16,
                },
                { duration: 1000 }
              );
            }
          });
        }
      });
    } else if (e.key === "Backspace" || e.key === "Delete") {
      graphicsLayer.removeAll();
    }
  };

  // ------------------

  // open event
  const openEvent = (event) => {
    const filterResult = shortResults.filter(
      (item) => item.attributes.OBJECTID === event
    );
    setQueryPoint(filterResult[0].attributes);
    // handleOpen(!show);
    if (filterResult.length > 0) {
      handleOpenModal(!openModal);
    }
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
  // let valuesArr = [];
  console.log("valuesArrlength", valuesArr.length);

  const filterDates = () => {
    if (view && (startDate || finishDate) && valuesArr.length === 0) {
      console.log("filterDatesfilterDates");
      // console.log("shortResults", shortResults);

      const filteredDate = data.features.filter((item) => {
        if (startDate && finishDate) {
          return (
            item.attributes.RENGINIO_PRADZIA >= startDate &&
            item.attributes.RENGINIO_PRADZIA <= finishDate
          );
        } else {
          return (
            item.attributes.RENGINIO_PRADZIA >= startDate ||
            item.attributes.RENGINIO_PABAIGA <= finishDate
          );
        }
      });
      setShortResults(filteredDate);
      view
        .whenLayerView(eventsFeatureLayer)
        .then((layerView) => {
          console.log("layerView", layerView);
          layerView.filter = {
            where:
              startDate && finishDate
                ? "RENGINIO_PRADZIA >= " +
                  startDate +
                  " AND RENGINIO_PRADZIA <= " +
                  finishDate
                : startDate
                ? "RENGINIO_PRADZIA >= " + startDate
                : "RENGINIO_PABAIGA <= " + finishDate,
          };
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  useEffect(() => {
    filterDates();
  }, [startDate, finishDate, view, eventsFeatureLayer, valuesArr]);

  const handleFilterChange = (e) => {
    var itemValue = Number(e.target.value);
    var isChecked = e.target.checked;
    let newArr = [];
    console.log("startDatestartDate", startDate);

    if (isChecked && itemValue !== 0) {
      valuesArr.push(itemValue);
      console.log("valuegrgregregersArr", valuesArr);

      const filteredDate = data.features.filter(
        (item) =>
          valuesArr.includes(item.attributes.KATEGORIJA) &&
          item.attributes.RENGINIO_PRADZIA >= startDate
      );
      setShortResults(filteredDate);

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
              : startDate
              ? "KATEGORIJA IN (" +
                newArrStr +
                ") AND " +
                "RENGINIO_PRADZIA >= " +
                startDate
              : "KATEGORIJA IN (" +
                newArrStr +
                ") AND " +
                "RENGINIO_PRADZIA <= " +
                finishDate
              ? "KATEGORIJA IN (" + newArrStr + ")"
              : null,
        };
      });
    } else if (!isChecked && valuesArr.length > 0) {
      const index = valuesArr.indexOf(itemValue);
      if (index > -1) {
        valuesArr.splice(index, 1);
      }

      const values = valuesArr.map((el) => el);
      console.log("newArrStr", values);

      if (valuesArr.length > 0) {
        const filteredDate = data.features.filter(
          (item) =>
            valuesArr.includes(item.attributes.KATEGORIJA) &&
            item.attributes.RENGINIO_PRADZIA >= startDate
        );
        setShortResults(filteredDate);
      } else {
        setShortResults(filterResults(data));
        filterDates();
      }

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
              : startDate && !finishDate
              ? "KATEGORIJA IN (" +
                newArrStr +
                ") AND " +
                "RENGINIO_PRADZIA >= " +
                startDate
              : !startDate && finishDate
              ? "KATEGORIJA IN (" +
                newArrStr +
                ") AND " +
                "RENGINIO_PABAIGA <= " +
                finishDate
              : valuesArr.length > 0 && !startDate && !finishDate
              ? "KATEGORIJA IN (" + newArrStr + ")"
              : null,
        };
      });
    } else if (itemValue === 0) {
      console.log("item value === 0");
      view.whenLayerView(eventsFeatureLayer).then((layerView) => {
        layerView.filter = {
          where: "1=1",
        };
      });
      setStartDate("");
      setFinishDate("");
      setValuesArr([]);
    } else {
      console.log("eefsgreh5er");
    }
  };

  // paieška renginių juostoje

  // const currentDay = new Date();
  // console.log("currentDay", currentDay.getDate());

  const filterResults = useCallback(() => {
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

      const sortedResults = results.slice(0).sort((a, b) => {
        const x = a.attributes.RENGINIO_PRADZIA;
        const y = b.attributes.RENGINIO_PRADZIA;
        return x < y ? -1 : x > y ? 1 : 0;
      });

      if (!startDate && !finishDate) {
        var startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        var endofDay = new Date();
        endofDay.setHours(23, 59, 59, 999);

        console.log("todayDate", new Date(startOfDay));
        console.log("tomorrowDate", new Date(endofDay));
        const filterTodayEvents = sortedResults.filter(
          (item) =>
            item.attributes.RENGINIO_PRADZIA >= startOfDay &&
            item.attributes.RENGINIO_PRADZIA <= endofDay
        );
        return filterTodayEvents;
      } else {
        return sortedResults;
      }
    }
  }, [data.features, searchTerm]);

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
    setShortResults(filterResults(data));
  };

  useEffect(() => {
    setShortResults(filterResults(data.features));
  }, [data, filterResults]);

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
    // const layer = featureLayer();
    const layer =
      auth.token && auth.token.length > 0
        ? featureLayerPrivate()
        : featureLayer();
    const vector = vectorLayer();
    const tile = tileLayer();

    const view = createMapView(mapRef.current, [vector, tile], layer);

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

    // Keičia cursor kai užvestas ant feature layer ir yra response
    function changeMouseCursor(response) {
      if (
        response.results.length > 0 &&
        response.results[0].graphic.layer.type === "feature"
      ) {
        mapRef.current.style.cursor = "pointer";
      } else {
        mapRef.current.style.cursor = "default";
      }
    }

    view.when(function () {
      view.whenLayerView(layer).then(function (lview) {
        watchUtils.whenFalseOnce(lview, "updating", function () {
          // Set up a click event handler and retrieve the screen x, y coordinates
          view.on("pointer-move", function (evt) {
            var screenPoint = {
              x: evt.x,
              y: evt.y,
            };
            view.hitTest(screenPoint).then(function (response) {
              changeMouseCursor(response);
            });
          });
        });
      });
    });

    // rodo loading kol neužsikrautas view, reikia pataisymo
    watchUtils.whenFalse(view, "updating", function (evt) {
      const loader = document.getElementById("loading");
      loader.style.display = "none";
    });

    // Create a time slider to update layerView filter
    const timeSlider = new TimeSlider({
      container: "dateSlider",
      mode: "time-window",
      layout: "compact",
      view: view,
    });

    // wait until the layer view is loaded
    timeSlider.when(function () {
      let timeLayerView;
      view.whenLayerView(layer).then((layerView) => {
        timeLayerView = layerView;
        const fullTimeExtent = layer.timeInfo.fullTimeExtent;
        const start = fullTimeExtent.start;
        const end = fullTimeExtent.end;

        // set up time slider properties based on layer timeInfo
        timeSlider.fullTimeExtent = fullTimeExtent;
        timeSlider.timeExtent = {
          start: start,
          end: end,
        };
        timeSlider.stops = {
          interval: layer.timeInfo.interval,
        };
      });

      timeSlider.watch("timeExtent", (value) => {
        timeLayerView.filter = {
          timeExtent: value,
        };
      });
      timeSlider.render();

      console.log("timeSLider", timeSlider);
    });
    // renginio popup atvaizdavimas

    console.log("dataFeatures", data.features);

    view.on("click", function (event) {
      view.hitTest(event, { include: layer }).then(function (response) {
        console.log("hittest", response);
        // laikinas fix, kad paspaudus ant map, bet kurioje vietoje nemestų error
        // reikia fix, nes dabar kai taskai yra tada reikia labai tiksliai paklikinti
        if (response.results.length >= 1) {
          view.whenLayerView(layer).then(function (layerView) {
            console.log("viewTomap", view.toMap(event));
            layerView
              .queryFeatures({
                geometry: view.toMap(event),
                outFields: ["*"],
                distance: 1.5 * view.resolution,
                spatialRelationship: "intersects",
              })
              .then(function (response) {
                if (response.features.length > 0) {
                  // console.log(
                  //   "shortResults",
                  //   data.features.filter(
                  //     (item) => item.attributes.OBJECTID === 1
                  //   )
                  // );
                  // const filteredResults = data.features.filter(
                  //   (item) => item.attributes.OBJECTID === 1
                  // );
                  setShortResults(response.features);
                  handleOpen(show);
                }
              });
          });
        } else {
          return null;
        }
      });
    });
    // paieska
    const sources = [
      {
        url: "https://gis.vplanas.lt/arcgis/rest/services/Lokatoriai/PAIESKA_COMPOSITE/GeocodeServer",
        singleLineFieldName: "SingleLine",
        name: "Vplanas paieska",
        placeholder: "Ieškoti adreso arba vietovės",
        maxResults: 3,
        maxSuggestions: 6,
        minSuggestCharacters: 0,
      },
      // {
      //   layer: layer,
      //   searchFields: ["PAVADINIMAS", "ORGANIZATORIUS"],
      //   displayField: "{PAVADINIMAS}",
      //   exactMatch: false,
      //   outFields: ["*"],
      //   name: "Point FS",
      //   maxResults: 6,
      //   maxSuggestions: 6,
      //   suggestionsEnabled: true,
      //   minSuggestCharacters: 0,
      // },
    ];

    const searchWidget = new Search({
      container: "SearchDiv",
      view: view,
      popupEnabled: false,
      searchAllEnabled: false,
      includeDefaultSources: false,
      sources: sources,
      allPlaceholder: "Ieškoti adreso arba vietovės",
    });

    return () => {
      view && view.destroy();
    };
  }, [auth.token]);

  const startEventDate = changeDate(new Date(queryPoint.RENGINIO_PRADZIA));
  const finishEventDate = changeDate(new Date(queryPoint.RENGINIO_PABAIGA));
  const startEventTime = changeTime(new Date(queryPoint.RENGINIO_PRADZIA));
  const finishEventTime = changeTime(new Date(queryPoint.RENGINIO_PABAIGA));

  // check if there is auth.token and login to page again
  useEffect(() => {
    if (auth.token && auth.token.length > 0) {
      esriId.registerToken({
        token: auth.token,
        server:
          "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/",
      });
    }
  });
  // change basemap

  return (
    <>
      {error && <Notification type={type} message={error} />}
      <MapDiv ref={mapRef}>
        <Content>
          <DateSlider id="dateSlider" />
          <BasemapSwitch handleChangeBasemap={handleChangeBasemap} />
          <SearchDiv id="SearchDiv" />
          {/* <input
          style={{ marginTop: "50px" }}
          type="text"
          placeholder="paieska"
          onKeyUp={handleSearchResult}
        ></input> */}
          {/* <div
          style={{
            position: "absolute",
            left: "50%",
            top: "-40px",
            zIndex: "999",
            width: "200px",
          }}
        >
          <SearchInput
            placeholder="Ieškoti"
            handleSearch={handleSearchResult}
            suggestions={suggestions}
          />
        </div> */}

          <Loading id="loading" />

          <Home handleClick={() => zoomDefault(view)} />
          <Zoom
            handleZoomIn={() => zoomIn(view)}
            handleZoomOut={() => zoomOut(view)}
          />

          {/* Renginių juosta */}
          <EventsSchedule
            handleOpen={handleOpen}
            show={show}
            handleOpenMore={() => setShortResults(filterResults(data.features))}
          >
            <SearchInput
              value={searchTerm}
              handleChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              placeholder="Ieškoti..."
            />
            <EventsTimeline
              events={shortResults}
              handleClose={handleOpen}
              handleMoreFilters={handleOpenFilter}
              handleEventOpen={(e) => {
                handleZoom(e, eventsFeatureLayer, view);
                openEvent(e);
                handleOpen(show);
              }}
            />
          </EventsSchedule>
          {/* Filtravimas pagal data ir kategorijas */}
          {showFilter && show && (
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
              handleCloseFilter={handleOpenFilter}
            />
          )}

          {/* Pridėti naują renginį  */}
          <AddEvent
            isLoggedIn={!!auth.token}
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
              e.preventDefault();
              eventsFeatureLayer.opacity = 1;
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

          {/* {show && (
          <EventsTimeline
            events={clickedEvents}
            handleClose={handleOpen}
            handleEventOpen={openEvent}
          />
        )} */}
          {openModal && (
            <EventCard
              isLoggedIn={!!auth.token}
              organization={queryPoint.ORGANIZATORIUS}
              title={queryPoint.PAVADINIMAS}
              url={queryPoint.WEBPAGE}
              comment={queryPoint.PASTABOS}
              description={queryPoint.APRASYMAS}
              startDate={startEventDate + " | " + startEventTime}
              finishDate={finishEventDate + " | " + finishEventTime}
              handleChange={(e) => {
                setQueryPoint([]);
                handleOpenModal();
                handleOpen(show);
                view.goTo(
                  {
                    zoom: 11,
                  },
                  { duration: 600 }
                );
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
                  setQueryPoint([]);
                }}
                handleDeleteConfirm={(e) => {
                  deleteEvent(queryPoint.OBJECTID);
                  handleOpenModal(!openModal);
                  view.goTo(
                    {
                      zoom: 11,
                    },
                    { duration: 600 }
                  );
                }}
              />
            </EventCard>
          )}
        </Content>
      </MapDiv>
    </>
  );
}

export default Map;
