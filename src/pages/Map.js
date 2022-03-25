/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
// Styles
import { MapDiv, SearchDiv, Content, SketchDiv } from "./Map.style";
// context
import { AuthContext } from "../context/AuthContext";
// Hooks
import { useOpenClose } from "../hooks/useOpenClose";
import { useOpenCloseModal } from "../hooks/openModal";
// esri modules
import * as watchUtils from "@arcgis/core/core/watchUtils";
import esriId from "@arcgis/core/identity/IdentityManager";
import Search from "@arcgis/core/widgets/Search";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
// import Graphic from "@arcgis/core/Graphic";

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
  Location,
} from "../components/index.js";
// utils
import { CategoryData } from "../utils/CategoryData";

// helpers
import { createMapView, handleChangeBasemap } from "../helpers/Map";
import { featureLayer, featureLayerPrivate } from "../helpers/Layers";
import { addEventsFeature } from "../helpers/AddEvent";
import { updateEventFeature } from "../helpers/EditEvent";
import { drawNewPolygon, graphicsLayer } from "../helpers/DrawPolygon";
// import { editPolygon } from "../helpers/UpdatePolygon";
import { changeTime, changeDate } from "../helpers/DateChange";
import { deleteFeatureEvent } from "../helpers/DeleteEvent";
import { handleZoom, zoomIn, zoomOut, zoomDefault } from "../helpers/Zooms";
import { sortByDate } from "../helpers/SortByDate";
import { locatePlace } from "../helpers/Location";

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
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("");
  const [shortResults, setShortResults] = useState("");
  const [filteredResults, setFilteredResults] = useState("");
  const [eventsText, setEventsText] = useState("");
  const [valuesArr, setValuesArr] = useState([]);
  const [arrIds] = useState([]);
  const [byExtent, setByExtent] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [queryGeometry, setQueryGeometry] = useState([]);

  const { handleOpen, show } = useOpenClose();
  const { handleOpenModal, openModal } = useOpenCloseModal();

  // mobile screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    handleResize();
  }, []);

  // clear error state after some time
  useEffect(() => {
    const timeId = setTimeout(() => {
      setError("");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [error]);

  // filter by day, week, month

  const handleFilterByDate = (e) => {
    eventsFeatureLayer.featureEffect = {
      excludedEffect: "opacity(100%) ",
    };
    const value = e ? e.target.value : "day";
    var startOfDay = new Date();
    var endOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);
    if (value === "day") {
      setStartDate(new Date(startOfDay).getTime());
      setFinishDate(new Date(endOfDay).getTime());
      // change default start and finish date
      const filterTodayEvents = data.features.filter(
        (item) =>
          item.attributes.RENGINIO_PABAIGA >= startOfDay &&
          item.attributes.RENGINIO_PRADZIA <= endOfDay
      );
      setFilteredResults(sortByDate(filterTodayEvents));
      setEventsText("Dienos renginiai");
    } else if (value === "week") {
      var endOfDayWeek = new Date(
        startOfDay.getTime() + 7 * 24 * 60 * 60 * 1000
      );
      setStartDate(new Date(startOfDay).getTime());
      setFinishDate(new Date(endOfDayWeek).getTime());
      // change default start and finish date
      const filterWeekEvents = data.features.filter(
        (item) =>
          item.attributes.RENGINIO_PABAIGA >= startOfDay &&
          item.attributes.RENGINIO_PRADZIA <= endOfDayWeek
      );
      setFilteredResults(sortByDate(filterWeekEvents));
      setEventsText("Savaitės renginiai");
    } else if (value === "month") {
      var endOfDayMonth = new Date(startOfDay);
      endOfDayMonth.setMonth(endOfDayMonth.getMonth() + 1);
      setStartDate(new Date(startOfDay).getTime());
      setFinishDate(new Date(endOfDayMonth).getTime());
      // change default start and finish date
      const filterMonthEvents = data.features.filter(
        (item) =>
          item.attributes.RENGINIO_PABAIGA >= startOfDay &&
          item.attributes.RENGINIO_PRADZIA <= endOfDayMonth
      );
      setFilteredResults(sortByDate(filterMonthEvents));
      setEventsText("Mėnesio renginiai");
    }
  };

  //-------------------------------------
  // filtravimas pagal kategoriją ir datą
  // Perkeltis šitą funkciją ir kitas dažnai naudojasmas į utils folderį
  // Filter dates
  const datesFilter = useCallback(
    (results) => {
      if (startDate || finishDate) {
        const filteredDate = results.filter((item) => {
          if (startDate && finishDate) {
            return (
              item.attributes.RENGINIO_PABAIGA >= startDate &&
              item.attributes.RENGINIO_PRADZIA <= finishDate
            );
          } else if (startDate) {
            return item.attributes.RENGINIO_PABAIGA >= startDate;
          } else return item.attributes.RENGINIO_PRADZIA <= finishDate;
        });
        return sortByDate(filteredDate);
      } else return results;
    },
    [finishDate, startDate]
  );

  const filterDates = useCallback(() => {
    if (view && (startDate || finishDate) && valuesArr.length === 0) {
      const filteredDates = datesFilter(data.features);
      const filteredObjectIds = filteredDates.map(
        (item) => item.attributes.OBJECTID
      );
      setFilteredResults(filteredDates);
      view
        .whenLayerView(eventsFeatureLayer)
        .then((layerView) => {
          layerView.filter = {
            where: "OBJECTID IN (" + filteredObjectIds + ")",
          };
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  }, [
    data.features,
    datesFilter,
    eventsFeatureLayer,
    finishDate,
    startDate,
    valuesArr.length,
    view,
  ]);

  useEffect(() => {
    filterDates();
  }, [filterDates]);

  const handleFilterChange = (e) => {
    var itemValue = Number(e.target.value);
    var isChecked = e.target.checked;
    let newArr = [];

    if (isChecked && itemValue !== 0) {
      valuesArr.push(itemValue);

      const filteredDates = datesFilter(
        sortByDate(
          data.features.filter((item) =>
            valuesArr.includes(item.attributes.KATEGORIJA)
          )
        )
      );
      setFilteredResults(filteredDates);
      const filteredObjectIds = filteredDates.map(
        (item) => item.attributes.OBJECTID
      );
      const values = valuesArr.map((el) => el);

      view.whenLayerView(eventsFeatureLayer).then((layerView) => {
        for (let i = 0; i < values.length; i++) {
          newArr.push(values[i]);
        }
        layerView.filter = {
          where: "OBJECTID IN (" + filteredObjectIds + ")",
        };
      });
    } else if (!isChecked && valuesArr.length > 0) {
      const index = valuesArr.indexOf(itemValue);
      if (index > -1) {
        valuesArr.splice(index, 1);
      }

      const values = valuesArr.map((el) => el);

      if (valuesArr.length > 0) {
        const filteredDates = data.features.filter((item) =>
          valuesArr.includes(item.attributes.KATEGORIJA)
        );
        setFilteredResults(datesFilter(sortByDate(filteredDates)));
      } else {
        setFilteredResults(filterResults(data));
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
                "RENGINIO_PABAIGA >= " +
                startDate +
                " AND RENGINIO_PRADZIA <= " +
                finishDate
              : startDate && finishDate && valuesArr.length === 0
              ? "RENGINIO_PABAIGA >= " +
                startDate +
                " AND RENGINIO_PRADZIA <= " +
                finishDate
              : startDate && !finishDate
              ? "KATEGORIJA IN (" +
                newArrStr +
                ") AND " +
                "RENGINIO_PABAIGA >= " +
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
    } else {
      return null;
    }
  };

  // Filter search results
  const filterResults = useCallback(() => {
    if (filteredResults) {
      const results = !searchTerm
        ? filteredResults
        : filteredResults.filter(
            (item) =>
              item.attributes.PAVADINIMAS &&
              item.attributes.PAVADINIMAS.toLowerCase().includes(
                searchTerm.toLocaleLowerCase()
              )
          );

      return sortByDate(results);
    }
  }, [filteredResults, searchTerm]);

  useEffect(() => {
    setShortResults(filterResults());
  }, [data, filterResults]);

  // helpers functions
  const addEvents = () =>
    addEventsFeature(addNewFeature, eventsFeatureLayer, setType, setError);
  const updateEvent = () =>
    updateEventFeature(
      queryPoint,
      eventsFeatureLayer,
      setType,
      setError,
      addNewFeature
    );
  const addPolygon = () =>
    drawNewPolygon(view, setAddNewFeature, eventsFeatureLayer);
  const deleteEvent = () =>
    deleteFeatureEvent(eventsFeatureLayer, queryPoint, setType, setError);

  useEffect(() => {
    // change layers depending if user is logged in
    const layer =
      !auth.token && !auth.token.length > 0
        ? featureLayer()
        : featureLayerPrivate();

    const view = createMapView(mapRef.current, layer);

    setEventsFeatureLayer(layer);
    setView(view);

    // set how old events to query
    const date = new Date();
    const publicDate = new Date(
      date.setMonth(date.getMonth() - 1)
    ).toISOString();
    const privateDate = new Date(
      date.setMonth(date.getMonth() - 6)
    ).toISOString();
    const queryDate = layer.title !== "public" ? publicDate : privateDate;
    // query events from feature layer
    view.when(function () {
      layer
        .queryFeatures({
          where: "RENGINIO_PABAIGA > '" + queryDate + "'",
          outFields: ["*"],
          returnGeometry: true,
        })
        .then((res) => {
          setData(res);
        });
      locatePlace(view);
    });

    // Chnage cursor when on event
    function changeMouseCursor(response) {
      if (response.length > 0 && response[0].graphic.layer.type === "feature") {
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
              const results = response.results.filter(
                (item) => item.graphic.layer !== null
              );
              changeMouseCursor(results);
            });
          });
        });
      });
    });

    // show loading while map is laoding
    watchUtils.whenFalse(view, "updating", function (evt) {
      const loader = document.getElementById("loading");
      loader.style.display = "none";
    });

    // on map click, get events from clicked place

    view &&
      view.on("immediate-click", function (event) {
        view.hitTest(event, { include: layer }).then(function (response) {
          if (response.results.length >= 1) {
            if (response.results.length > 1) {
              const objectIds =
                response.results &&
                response.results.map(
                  (item) => item.graphic.attributes.OBJECTID
                );
              const result =
                response.results &&
                response.results.map((item) => item.graphic);
              setShortResults(sortByDate(result));
              layer.featureEffect = {
                filter: {
                  objectIds: objectIds,
                },
                excludedEffect: "opacity(30%) ",
                includedEffect: "drop-shadow(0px, 0px, 3px)",
              };
            } else if (response.results.length === 1 && openModal === false) {
              setQueryPoint(response.results[0].graphic.attributes);
              setQueryGeometry(response.results[0].graphic);
              handleOpenModal(!openModal);

              layer.featureEffect = {
                filter: {
                  objectIds: response.results[0].graphic.attributes.OBJECTID,
                },
                excludedEffect: "opacity(30%) ",
                includedEffect: "drop-shadow(0px, 0px, 3px)",
              };
            }
          } else {
            return null;
          }
        });
      });

    // search
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
    ];

    view.when(() => {
      new Search({
        container: "SearchDiv",
        view: view,
        popupEnabled: false,
        searchAllEnabled: false,
        includeDefaultSources: false,
        sources: sources,
        allPlaceholder: "Ieškoti adreso arba vietovės",
      });
    });

    return () => {
      view && view.destroy();
    };
  }, []);

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

  useEffect(() => {
    if (auth.token) {
      addPolygon();
      // editPolygon(view, eventsFeatureLayer);
    }
  }, [view]);

  // query only filtered features
  useEffect(() => {
    eventsFeatureLayer &&
      eventsFeatureLayer.load().then(() => {
        arrIds.length = 0;
        const result =
          filteredResults &&
          filteredResults.map((item) => item.attributes.OBJECTID);
        return arrIds.push(result);
      });
  }, [filteredResults]);
  // filter by selected today, week, month
  useEffect(() => {
    view && handleFilterByDate();
  }, [data.features]);

  // open event clicked in events timeline

  const openEvent = (event) => {
    const filterResult = filteredResults.filter(
      (item) => item.attributes.OBJECTID === event
    );
    setQueryPoint(filterResult[0].attributes);
    setQueryGeometry(filterResult[0]);
    // pataisyti sita vieta, kad kai paspaudi ant timeline atidarytu visada
    if (filterResult.length > 0 && openModal === false) {
      handleOpenModal(!openModal);
    }

    eventsFeatureLayer.featureEffect = {
      filter: {
        objectIds: filterResult[0].attributes.OBJECTID,
      },
      excludedEffect: "opacity(30%)",
      includedEffect: "drop-shadow(0px, 0px, 3px)",
    };
  };

  // filter results by view extent
  let filterExtent;
  const filterByExtent = (e) => {
    console.log("extent");
    const isChecked = e.target.checked;
    let graphics;
    if (isChecked) {
      view &&
        view.whenLayerView(eventsFeatureLayer).then(function (layerView) {
          filterExtent = layerView.watch("updating", function (value) {
            if (!value) {
              // wait for the layer view to finish updating
              // query all the features available for drawing.
              layerView
                .queryFeatures({
                  geometry: view.extent,
                  returnGeometry: true,
                  where: "OBJECTID IN (" + arrIds + ")",
                })
                .then(function (results) {
                  graphics = results.features;
                  setShortResults(sortByDate(graphics));
                })
                .catch(function (error) {
                  console.error("query failed: ", error);
                });
            }
          });
          setByExtent(filterExtent);
        });
    } else {
      if (undefined) {
        return null;
      } else {
        byExtent.remove();
        handleFilterByDate();
      }
    }
  };
  // show all events
  const handleShowAll = () => {
    if (
      shortResults.length !== filteredResults.length &&
      byExtent === undefined
    ) {
      eventsFeatureLayer.featureEffect = {
        excludedEffect: "opacity(100%) ",
      };
      setShortResults(filteredResults);
    }
  };
  // mobile functions
  const handleMobile = () => {
    if (isMobile) {
      handleOpen(show);
    } else {
      return null;
    }
  };

  // edit feature
  let arr = [];
  let sketchViewModel;

  if (auth.token) {
    sketchViewModel = new SketchViewModel({
      view: view,
      layer: graphicsLayer,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false,
        mode: "click",
      },
      polygonSymbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "rgba(0, 205, 255, 0.3)",
        style: "backward-diagonal",
        outline: {
          color: "red",
          width: 1,
        },
      },
    });
  }

  // const setUpClickHandler = () => {
  //   console.log("isEdd", isEditing);
  //   var handler =
  //     view &&
  //     isEditing &&
  //     view.on("click", function (event) {
  //       view
  //         .hitTest(event, { include: [eventsFeatureLayer] })
  //         .then(function (response) {
  //           console.log("response", response);
  //           console.log("iseEditing", isEditing);

  //           if (response.results.length >= 1) {
  //             for (var i = 0; i < response.results.length; i++) {
  //               console.log("response", response.results[0]);
  //               const editGraphic = response.results[i].graphic;
  //               graphicsLayer.graphics.add(editGraphic);
  //               eventsFeatureLayer.definitionExpression =
  //                 "OBJECTID <> " + editGraphic.attributes.OBJECTID;
  //               sketchViewModel.update(editGraphic);
  //             }
  //           } else return handler.remove();
  //         });
  //     });
  // };

  // isEditing ? setUpClickHandler() : console.log("null");
  // console.log("isEditing222", isEditing);

  sketchViewModel &&
    sketchViewModel.on(["update", "undo", "redo"], onGraphicUpdate);

  function onGraphicUpdate(event) {
    if (
      event.toolEventInfo &&
      (event.toolEventInfo.type === "move-stop" ||
        event.toolEventInfo.type === "reshape-stop")
    ) {
      const graphic = event.graphics[0].geometry;
      arr.push(graphic);
      setQueryPoint({
        ...queryPoint,
        geometry: graphic,
      });
      sketchViewModel.complete();
    }
  }

  const handleEditFeature = () => {
    setIsEditing(true);
    const editGraphic = queryGeometry;
    graphicsLayer.graphics.add(editGraphic);
    eventsFeatureLayer.featureEffect = {
      excludedEffect: "opacity(0%) ",
    };
    eventsFeatureLayer.definitionExpression =
      "OBJECTID <> " + editGraphic.attributes.OBJECTID;
    sketchViewModel.update(editGraphic);
  };

  return (
    <>
      <MapDiv ref={mapRef}>
        <Content>
          {error && <Notification type={type} message={error} />}
          <Loading id="loading" />
          {!isMobile && (
            <DateSlider
              id="dateSlider"
              layer={eventsFeatureLayer}
              view={view}
              data={data}
              setShortResults={setFilteredResults}
              startOfDay={startDate}
              endOfDay={finishDate}
            />
          )}
          <BasemapSwitch handleChangeBasemap={handleChangeBasemap} />
          <SearchDiv id="SearchDiv" />
          {!!auth.token && (
            <SketchDiv id="SketchDiv">
              {/* <div id="EditDiv"></div> */}
            </SketchDiv>
          )}
          <Home handleClick={() => zoomDefault(view)} />
          <Zoom
            handleZoomIn={() => zoomIn(view)}
            handleZoomOut={() => zoomOut(view)}
          />
          {isMobile && <Location id="LocationDiv" />}
          {/* Renginių juosta */}
          <EventsSchedule
            handleOpen={handleOpen}
            show={isMobile === true ? show : !show}
            scheduleTitle={eventsText}
            filter={
              <Filter
                id="filtras"
                data={CategoryData}
                selectedStart={startDate}
                selectedFinish={finishDate}
                handleChangeStart={(date) => {
                  if (date >= finishDate) {
                    setStartDate(new Date(date.setHours(0, 0, 0, 0)).getTime());
                    setFinishDate(
                      new Date(date.setHours(23, 59, 59, 59)).getTime()
                    );
                    setEventsText("Renginiai");
                  } else {
                    setStartDate(new Date(date.setHours(0, 0, 0, 0)).getTime());
                    setEventsText("Renginiai");
                  }
                }}
                handleChangeFinish={(date) => {
                  if (date >= startDate) {
                    setFinishDate(
                      new Date(date.setHours(23, 59, 59, 59)).getTime()
                    );
                    setEventsText("Renginiai");
                  } else {
                    setFinishDate(startDate);
                  }
                }}
                onChange={handleFilterChange}
                handleClear={() => {
                  handleFilterByDate();
                  setValuesArr([]);
                }}
                handleOpenMore={() =>
                  setFilteredResults(filterResults(data.features))
                }
                handleDateChange={handleFilterByDate}
                handleFilterByExtent={filterByExtent}
              />
            }
            search={
              <SearchInput
                value={searchTerm}
                handleChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                placeholder="Ieškoti..."
              />
            }
          >
            <EventsTimeline
              events={shortResults}
              handleClose={handleOpen}
              clickedEvent={queryPoint.OBJECTID}
              handleShowAll={handleShowAll}
              eventsLength={
                byExtent === undefined &&
                shortResults &&
                filteredResults &&
                shortResults.length !== filteredResults.length
                  ? "Atgal"
                  : null
              }
              emptyTimeline={
                filteredResults && filteredResults.length === 0
                  ? "Renginių nerasta"
                  : null
              }
              handleEventOpen={(e) => {
                handleZoom(e, eventsFeatureLayer, view);
                openEvent(e);
                handleMobile();
              }}
            />
          </EventsSchedule>
          {/* Pridėti naują renginį  */}
          {auth.token && !isEditing && (
            <AddEvent
              isLoggedIn={!!auth.token}
              setAddNewFeature={setAddNewFeature}
              addNewFeature={addNewFeature}
              startDate={startDate}
              events={data}
              handleSubmit={(e) => {
                e.preventDefault();
                eventsFeatureLayer.opacity = 1;
                addEvents(addNewFeature);
              }}
              handleCancel={() => {
                eventsFeatureLayer.opacity = 1;
                graphicsLayer.removeAll();
              }}
            />
          )}
          {/* Renginių ir renginio atvaizdavimas, redagavimas */}
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
              SavaitesDienos={queryPoint.Savaites_dienos}
              category={queryPoint.KATEGORIJA}
              isMobile={!isMobile}
              handleEditEvent={handleEditFeature}
              handleChange={(e) => {
                setQueryPoint([]);
                handleOpenModal();
                handleMobile();
                eventsFeatureLayer.featureEffect = {
                  excludedEffect: "opacity(100%) ",
                };
              }}
            >
              {auth.token && (
                <EditEvent
                  setQueryPoint={setQueryPoint}
                  queryPoint={queryPoint}
                  handleChange={() => {
                    handleOpenModal();
                    setIsEditing(false);
                    graphicsLayer.removeAll();
                    eventsFeatureLayer.definitionExpression = ["1=1"];
                    eventsFeatureLayer.featureEffect = {
                      excludedEffect: "opacity(100%) ",
                    };
                  }}
                  handleSubmit={(e) => {
                    e.preventDefault();
                    updateEvent(queryPoint);
                    handleOpenModal(!openModal);
                    setQueryPoint([]);
                    setIsEditing(false);
                    graphicsLayer.removeAll();
                    eventsFeatureLayer.definitionExpression = ["1=1"];
                    eventsFeatureLayer.featureEffect = {
                      excludedEffect: "opacity(100%) ",
                    };
                  }}
                  handleDeleteConfirm={(e) => {
                    deleteEvent(queryPoint.OBJECTID);
                    handleOpenModal(!openModal);
                    graphicsLayer.removeAll();
                    eventsFeatureLayer.definitionExpression = ["1=1"];
                    eventsFeatureLayer.featureEffect = {
                      excludedEffect: "opacity(100%) ",
                    };
                    view.goTo(
                      {
                        zoom: 11,
                      },
                      { duration: 600 }
                    );
                  }}
                />
              )}
            </EventCard>
          )}
        </Content>
      </MapDiv>
    </>
  );
}

export default Map;
