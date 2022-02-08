import { useEffect, useState } from "react";
// styles
import { SliderDiv, IconDiv, Icon } from "./DateSlider.style";
// icon
import TimelineIcon from "../../assets/icons/timeline.png";
// esri modules
import TimeSliderModule from "@arcgis/core/widgets/TimeSlider";
// helpers
import { sortByDate } from "../../helpers/SortByDate";

const TimeSlider = ({ layer, view, data, setShortResults }) => {
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishtDate] = useState("");

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // Create a time slider to update layerView filter
  useEffect(() => {
    if (layer) {
      const timeSlider = new TimeSliderModule({
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
          setStartDate(new Date(value.start).getTime());
          setFinishtDate(new Date(value.end).getTime());

          timeLayerView.filter = {
            timeExtent: value,
          };
        });

        timeSlider.render();
      });
    }
  }, [openModal]);

  useEffect(() => {
    if (data && layer) {
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
