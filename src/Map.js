import { useRef, useEffect, useState } from "react";

// Styles
import "./Map.css";

// Modules
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import TileLayer from "@arcgis/core/layers/TileLayer";

// Hooks
import { useModal } from "./hooks/useModal";

// Components
import EventCard from "./components/EventCard/EventCard";

import { createMapView } from "./utils/Map";

function Map(props) {
  const mapRef = useRef(null);

  const [data, setData] = useState([]);
  const [queryPoint, setQueryPoint] = useState([]);
  const [view, setView] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // const baselayer = new TileLayer({
    //   url: "https://gis.vplanas.lt/arcgis/rest/services/Baziniai_zemelapiai/Vilnius_basemap_LKS_su_rajonu/MapServer",
    // });

    const layer = new FeatureLayer({
      url: "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Renginiu_zemelapis_gdb/FeatureServer/0",
      outFields: ["*"],
    });

    const view = createMapView(mapRef.current, layer);

    setView(view);

    // map.add(layer);

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
          togglePopup(true);
        } else {
          setQueryPoint([]);
          setIsOpen(false);
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
      {isOpen && (
        <EventCard
          organization={queryPoint.USER_ORGANIZATORIAI}
          title={queryPoint.USER_PAVADINIMAS}
          place={queryPoint.USER_Vieta}
          date={date}
          time={time}
          handleChange={togglePopup}
        />
      )}
      {/* <ul>
        {data.map((item) => (
          <>
            <li>{item.attributes.USER_PAVADINIMAS}</li>
            <li>{item.attributes.VIETA}</li>
          </>
        ))}
      </ul> */}
    </div>
  );
}

export default Map;
