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
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";

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
import { featureLayer, featureLayerPrivate } from "../helpers/Layers";
import { addEventsFeature } from "../helpers/AddEvent";
import { updateEventFeature } from "../helpers/EditEvent";
import { drawNewPolygon, graphicsLayer } from "../helpers/DrawPolygon";
import { updatePolygon } from "../helpers/UpdatePolygon";
import { changeTime, changeDate } from "../helpers/DateChange";
import { deleteFeatureEvent } from "../helpers/DeleteEvent";
import { handleZoom, zoomIn, zoomOut, zoomDefault } from "../helpers/Zooms";
import { sortByDate } from "../helpers/SortByDate";

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
  const [filteredResults, setFilteredResults] = useState("");
  const [eventsText, setEventsText] = useState("");
  const [valuesArr, setValuesArr] = useState([]);
  const [arrIds, setArrIds] = useState([]);
  const [byExtent, setByExtent] = useState();

  const { handleOpen, show } = useOpenClose();
  const { handleOpenModal, openModal } = useOpenCloseModal();

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
    const value = e ? e.target.value : "day";
    var startOfDay = new Date();
    if (value === "day") {
      var endOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      endOfDay.setHours(23, 59, 59, 999);
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
          item.attributes.RENGINIO_PRADZIA >= startOfDay &&
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
          item.attributes.RENGINIO_PRADZIA >= startOfDay &&
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
      setFilteredResults(filteredDates);
      view
        .whenLayerView(eventsFeatureLayer)
        .then((layerView) => {
          layerView.filter = {
            where:
              startDate && finishDate
                ? "RENGINIO_PABAIGA >= " +
                  startDate +
                  " AND RENGINIO_PRADZIA <= " +
                  finishDate
                : startDate
                ? "RENGINIO_PABAIGA >= " + startDate
                : "RENGINIO_PABAIGA <= " + finishDate,
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

      const filteredDates = data.features.filter((item) =>
        valuesArr.includes(item.attributes.KATEGORIJA)
      );
      setFilteredResults(datesFilter(sortByDate(filteredDates)));

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
                "RENGINIO_PABAIGA >= " +
                startDate +
                " AND RENGINIO_PRADZIA <= " +
                finishDate
              : startDate
              ? "KATEGORIJA IN (" +
                newArrStr +
                ") AND " +
                "RENGINIO_PABAIGA >= " +
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
    } else if (itemValue === 0) {
      view.whenLayerView(eventsFeatureLayer).then((layerView) => {
        layerView.filter = {
          where: ["1=1"],
        };
      });
      setStartDate("");
      setFinishDate("");
      setValuesArr([]);
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

  const addEvents = () =>
    addEventsFeature(addNewFeature, eventsFeatureLayer, setType, setError);
  const updateEvent = () =>
    updateEventFeature(queryPoint, eventsFeatureLayer, setType, setError);
  const addPolygon = () => drawNewPolygon(view, setAddNewFeature);
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
      !auth.token && !auth.token.length > 0
        ? featureLayer()
        : featureLayerPrivate();

    const view = createMapView(mapRef.current, layer);

    setEventsFeatureLayer(layer);
    setView(view);

    layer.load().then(function () {
      layer
        .queryFeatures({
          // where: "RENGINIO_PRADZIA >= " + startDate,
          where: ["1=1"],
          outFields: ["*"],
        })
        .then((res) => {
          setData(res);
        });
    });

    // Chnage cursor when on event
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

    // show loading while map is laoding
    watchUtils.whenFalse(view, "updating", function (evt) {
      const loader = document.getElementById("loading");
      loader.style.display = "none";
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

    // filter results by view extent
    // let graphics;

    // view &&
    //   view.whenLayerView(layer).then(function (layerView) {
    //     layerView.watch("updating", function (value) {
    //       if (!value) {
    //         // wait for the layer view to finish updating
    //         // query all the features available for drawing.
    //         layerView
    //           .queryFeatures({
    //             geometry: view.extent,
    //             returnGeometry: true,
    //             where: "OBJECTID IN (" + arrIds + ")",
    //           })
    //           .then(function (results) {
    //             graphics = results.features;
    //             setShortResults(sortByDate(graphics));
    //           })
    //           .catch(function (error) {
    //             console.error("query failed: ", error);
    //           });
    //       }
    //     });
    //   });

    // on map click, get events from clicked place

    view &&
      view.on("immediate-click", function (event) {
        view.hitTest(event, { include: layer }).then(function (response) {
          if (response.results.length >= 1) {
            view.whenLayerView(layer).then(function (layerView) {
              layerView
                .queryFeatures({
                  geometry: view.toMap(event),
                  outFields: ["*"],
                  distance: 1.8 * view.resolution,
                  spatialRelationship: "intersects",
                  where: "OBJECTID IN (" + arrIds + ")",
                })
                .then(function (response) {
                  if (response.features.length > 1) {
                    setShortResults(sortByDate(response.features));
                    // console.log("show", show);
                    if (show === true) {
                      handleOpen(show);
                    }
                  } else if (
                    response.features.length === 1 &&
                    openModal === false
                  ) {
                    setQueryPoint(response.features[0].attributes);
                    handleOpenModal(!openModal);
                  }
                });
            });
          } else {
            return null;
          }
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
    addPolygon();
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
    view &&
      view.when().then(() => {
        handleFilterByDate();
      });
  }, [data.features]);

  // open event clicked in events timeline
  const openEvent = (event) => {
    const filterResult = filteredResults.filter(
      (item) => item.attributes.OBJECTID === event
    );
    setQueryPoint(filterResult[0].attributes);

    const effect = new FeatureEffect({
      filter: new FeatureFilter({
        objectIds: filterResult[0].attributes.OBJECTID,
      }),
      excludedEffect: "grayscale(100%) opacity(30%) ",
    });

    eventsFeatureLayer.featureEffect = effect;

    // pataisyti sita vieta, kad kai paspaudi ant timeline atidarytu visada
    if (filterResult.length > 0 && openModal === false) {
      handleOpenModal(!openModal);
    }
  };

  let filterExtent;
  const filterByExtent = (e) => {
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

  return (
    <>
      <MapDiv ref={mapRef}>
        <Content>
          {error && <Notification type={type} message={error} />}
          <DateSlider
            id="dateSlider"
            layer={eventsFeatureLayer}
            view={view}
            data={data}
            setShortResults={setFilteredResults}
            startOfDay={startDate}
            endOfDay={finishDate}
          />
          <BasemapSwitch handleChangeBasemap={handleChangeBasemap} />
          <SearchDiv id="SearchDiv" />
          {!!auth.token && <SketchDiv id="SketchDiv" />}
          <Loading id="loading" />
          <Home handleClick={() => zoomDefault(view)} />
          <Zoom
            handleZoomIn={() => zoomIn(view)}
            handleZoomOut={() => zoomOut(view)}
          />
          {/* Renginių juosta */}
          {/* {console.log(show)} */}
          <EventsSchedule
            handleOpen={handleOpen}
            show={!show}
            scheduleTitle={eventsText}
            filter={
              <Filter
                id="filtras"
                data={CategoryData}
                selectedStart={startDate}
                selectedFinish={finishDate}
                handleChangeStart={(date) => {
                  setStartDate(new Date(date.setHours(0, 0, 0, 0)).getTime());
                  setEventsText("Renginiai");
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
              emptyTimeline={
                filteredResults && filteredResults.length === 0
                  ? "Renginių nerasta"
                  : ""
              }
              handleEventOpen={(e) => {
                handleZoom(e, eventsFeatureLayer, view);
                openEvent(e);
              }}
            />
          </EventsSchedule>
          {/* Pridėti naują renginį  */}
          <AddEvent
            isLoggedIn={!!auth.token}
            setAddNewFeature={setAddNewFeature}
            addNewFeature={addNewFeature}
            isEditing={!isEditing}
            startDate={startDate}
            events={data}
            // handleCordinates={() => {
            //   // eventsFeatureLayer.opacity = 0.3;
            //   addNewFeature.geometry === undefined
            //     ? addPolygon()
            //     : setIsEditing(!isEditing);
            // }}
            handleCordinates={() => {
              eventsFeatureLayer.opacity = 0.3;
            }}
            handleUpdate={() => {
              updateCurrentPolygon();
              setIsEditing(!isEditing);
            }}
            handleSubmit={(e) => {
              e.preventDefault();
              eventsFeatureLayer.opacity = 1;
              addEvents(addNewFeature);
              setIsEditing(!isEditing);
            }}
            handleCancel={() => {
              eventsFeatureLayer.opacity = 1;
              graphicsLayer.removeAll();
              // setIsEditing(!isEditing);
              // setAddNewFeature([]);
            }}
          />
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
              handleChange={(e) => {
                setQueryPoint([]);
                handleOpenModal();
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
