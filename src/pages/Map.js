import { useRef, useEffect, useState } from "react";

// Styles
import "./Map.css";

// Modules
// import TileLayer from "@arcgis/core/layers/TileLayer";

// Hooks
import { useModal } from "../hooks/useModal";

// Components
import EventCard from "../components/EventCard/EventCard";
import EventsSchedule from "../components/EventsSchedule/EventsSchedule";

import { createMapView } from "../utils/Map";
import { featureLayer } from "../utils/Layers";

function Map() {
  const mapRef = useRef(null);

  const [data, setData] = useState([]);
  const [queryPoint, setQueryPoint] = useState([]);
  const [view, setView] = useState();

  // Event modal open
  const { handleOpen, show } = useModal();

  useEffect(() => {
    // const baselayer = new TileLayer({
    //   url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_LKS_su_rajonu/MapServer",
    // });

    const layer = featureLayer();
    const view = createMapView(mapRef.current, [layer], "streets");

    setView(view);

    layer
      .queryFeatures({
        where: ["1=1"],
        outFields: ["*"],
      })
      .then((res) => {
        setData(res.features);
        // console.log(res.features);
      });

    // console.log(layer);

    // const paracelLayerSQL = ["1=1"];
    // let whereClause = paracelLayerSQL[0];

    // const pointQuery = (screenPoint) => {
    //   const point = view.toMap(screenPoint);

    //   layer
    //     .queryObjectIds({
    //       where: whereClause,
    //       geometryPrecision: point,
    //       returnGeometry: false,
    //       outFields: ["*"],
    //     })
    //     .then(function (objectIds) {
    //       layer.queryRelatedFeatures({
    //         where: ["1=1"],
    //         relationshipId: layer.relationships,
    //       });

    //       console.log(
    //         layer.queryRelatedFeatures({
    //           outFields: ["OBJECTID", "ZMOGUS"],
    //           objectIds: objectIds,
    //         })
    //       );

    //       return layer.queryRelatedFeatures({
    //         outFields: ["OBJECTID", "ZMOGUS"],
    //         relationshipId: layer.relationships[0],
    //         objectIds: objectIds,
    //       });
    //     });
    // };

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

  // useEffect(() => {
  //   data.map((items) => {
  //     const item = items.attributes;
  //     const newDate = new Date(item.USER_RENGINIO_DATA);
  //     const time =
  //       pad(newDate.getHours(), 2) + ":" + pad(newDate.getMinutes(), 2);
  //     const date =
  //       newDate.getFullYear() +
  //       "-" +
  //       pad(newDate.getMonth() + 1, 2) +
  //       "-" +
  //       pad(newDate.getDate(), 2);
  //     return setEventSchedule({
  //       id: item.ObjectID,
  //       title: item.USER_PAVADINIMAS,
  //       date: date,
  //       time,
  //     });
  //   });
  // }, []);

  // console.log(eventsSchedule);

  return (
    <div className="mapDiv" ref={mapRef}>
      {/* Fix this. Too much code here. Reuse time date */}
      <EventsSchedule>
        {data.length ? (
          data.map((items) => {
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
        ) : (
          <span>Loading...</span>
        )}
      </EventsSchedule>

      {show && (
        <EventCard
          organization={queryPoint.USER_ORGANIZATORIAI}
          title={queryPoint.USER_PAVADINIMAS}
          place={queryPoint.USER_Vieta}
          date={date}
          time={time}
          handleChange={handleOpen}
        />
      )}
    </div>
  );
}

export default Map;
