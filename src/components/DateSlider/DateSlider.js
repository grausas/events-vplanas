/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// styles
import { SliderDiv, IconDiv, Icon } from "./DateSlider.style";
// icon
import TimelineIcon from "../../assets/icons/timeline.png";
// esri modules
import TimeSliderModule from "@arcgis/core/widgets/TimeSlider";
// helpers
import { sortByDate } from "../../helpers/SortByDate";

const TimeSlider = ({
  layer,
  view,
  data,
  setShortResults,
  startOfDay,
  endOfDay,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishtDate] = useState("");
  const [dateSlider, setDateSlider] = useState("");

  let timeLayerView;

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // Create a time slider to update layerView filter
  useEffect(() => {
    if (layer && openModal && dateSlider === undefined) {
      var timeSlider = new TimeSliderModule({
        container: "dateSlider",
        mode: "time-window",
        layout: "compact",
        view: view,
      });
    }
    setDateSlider(timeSlider);
  }, [openModal]);

  useEffect(() => {
    dateSlider &&
      openModal &&
      layer.when(function () {
        // wait until the layer view is loaded
        view.whenLayerView(layer).then((layerView) => {
          timeLayerView = layerView;
          const fullTimeExtent = layer.timeInfo.fullTimeExtent;
          const date = new Date();
          fullTimeExtent.start = new Date(
            date.setMonth(date.getMonth() - 1)
          ).toISOString();

          // set up time slider properties based on layer timeInfo
          dateSlider.fullTimeExtent = fullTimeExtent;

          dateSlider.timeExtent = {
            start: startOfDay,
            end: endOfDay,
          };
          dateSlider.stops = {
            interval: layer.timeInfo.interval,
          };
        });

        dateSlider.watch("timeExtent", function (value) {
          const start = new Date(value.start).getTime();
          const end = new Date(value.end).getTime();
          setStartDate(start);
          setFinishtDate(end);
          view.timeExtent = null;
          timeLayerView.filter = {
            where:
              "RENGINIO_PABAIGA >= " + start + " AND RENGINIO_PRADZIA <=" + end,
          };
        });
      });
  }, [dateSlider, startOfDay, endOfDay]);

  useEffect(() => {
    if (data && layer && openModal) {
      const filteredDate = data.features.filter((item) => {
        if (startDate && finishDate) {
          return (
            item.attributes.RENGINIO_PABAIGA >= startDate &&
            item.attributes.RENGINIO_PRADZIA <= finishDate
          );
        } else {
          return (
            item.attributes.RENGINIO_PABAIGA >= startDate ||
            item.attributes.RENGINIO_PABAIGA <= finishDate
          );
        }
      });

      setShortResults(sortByDate(filteredDate));
    }
  }, [startDate, finishDate]);

  return (
    <>
      <IconDiv>
        <Icon
          Icon
          src={TimelineIcon}
          alt="home-icon"
          onClick={handleOpenModal}
        />
      </IconDiv>
      {openModal && <SliderDiv id="dateSlider"></SliderDiv>}
    </>
  );
};

export default TimeSlider;
